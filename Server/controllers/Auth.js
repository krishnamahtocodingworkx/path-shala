//sendOTP handler
const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
const Profile = require("../models/Profile");
const otpTemplate = require("../mail/templates/emailVerificationTemplate");
require("dotenv").config();

//all three testing done
exports.sendotp = async (req, res) => {
  try {
    //fetch email from request body
    const { email } = req.body;

    //check if user already exist or not
    const checkUserPresent = await User.findOne({ email });

    //if user already exists the return a response
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User already exists",
      });
    }
    // console.log("here we check user is present or not " ,checkUserPresent);

    //generate otp
    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    // console.log("otp generated this is otp", otp);

    //check unique otp or not
    let result = await OTP.findOne({ otp: otp });
    // console.log("otp ke model me ye otp mila ya nahi check", result);

    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });

      result = await OTP.findOne({ otp: otp });
    }

    //otp ki entry databsase me kro taki baad me verify kr ske

    const otpPayload = {
      email,
      otp,
    };
    console.log("ye hai opt ka payload", otpPayload);

    //create and entry for otp
    const otpBody = await OTP.create(otpPayload);

    try {
      const emailResponse = await mailSender(
        email,
        "Email verification from PathShala",
        otpTemplate(otp)
      );
      console.log("Email sent successfully:", emailResponse.response);
    } catch (error) {
      // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
      console.error("Error occurred while sending email:", error);
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending email",
        error: error.message,
      });
    }

    // console.log( "this is otpboyd",otpBody);

    //return response successfully
    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otp,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Error while sending otp",
    });
  }
};
//signUp ka handler

exports.signup = async (req, res) => {
  try {
    //data fetchh from requiest body
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      // contactNumber,
      otp,
    } = req.body;
    //validate kro

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !otp ||
      !confirmPassword ||
      !accountType
    ) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }
    //2 password match kr lo password and confirm password KO
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Password and ConfirmPassword are not the same please try again",
      });
    }

    //check user already exist or not

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User is already registered",
      });
    }

    //find most recent otp for the user
    // Find the most recent OTP for the email
    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    console.log(response);
    if (response.length === 0) {
      // OTP not found for the email
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    } else if (otp !== response[0].otp) {
      // Invalid OTP
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    }
    //hash password
    const hashPassword = await bcrypt.hash(password, 10);
    console.log("hashPassword", hashPassword);
    console.log("password is hash", hashPassword);

    //create entry in db

    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });

    //chal rha h yha tk
    const user = await User.create({
      firstName,
      lastName,
      email,
      // contactNumber,
      password: hashPassword,
      accountType: accountType,
      additionalDetails: profileDetails._id,
      // image:"",
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });
    // console.log("user is",user);
    //return response
    return res.status(200).json({
      success: true,
      message: "User is registered successfuly",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "user cannot be registerd try again",
    });
  }
};

//Login ka handler

exports.login = async (req, res) => {
  try {
    //get data from request body
    const { email, password } = req.body;
    //validationn of data
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "All fields are required please try again",
      });
    }

    //user check exist or not
    const user = await User.findOne({ email }).populate("additionalDetails");
    // console.log("user hai ye",user);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered please sign up first",
      });
    }

    //generate jwt token,after matching password

    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      user.token = token;
      // user = user.toObject();
      // user.token = token;
      user.password = undefined;

      //create  and send response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Login successful",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "password is incoreect",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Login failed please try again",
    });
  }
};

//changePassword handler
//ye testing me check nhi hua hai
exports.changePassword = async (req, res) => {
  try {
    // Get user data from req.user
    const userDetails = await User.findById(req.user.id);

    // Get old password, new password, and confirm new password from req.body
    const { oldPassword, newPassword } = req.body;

    // Validate old password
    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    );
    if (!isPasswordMatch) {
      // If old password does not match, return a 401 (Unauthorized) error
      return res
        .status(401)
        .json({ success: false, message: "The password is incorrect" });
    }

    // Update password
    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true }
    );

    // Send notification email
    try {
      const emailResponse = await mailSender(
        updatedUserDetails.email,
        "Password for your account has been updated",
        passwordUpdated(
          updatedUserDetails.email,
          `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
        )
      );
      console.log("Email sent successfully:", emailResponse.response);
    } catch (error) {
      // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
      console.error("Error occurred while sending email:", error);
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending email",
        error: error.message,
      });
    }

    // Return success response
    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
    console.error("Error occurred while updating password:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
    });
  }
};
