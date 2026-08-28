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
const { ExceptionMessage, SuccessMessage } = require("../utils/constants");
require("dotenv").config();

exports.sendotp = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    if (!email) {
      return res.status(400).json({
        success: false,
        message: ExceptionMessage.ALL_FIELDS_REQUIRED,
      });
    }

    const checkUserPresent = await User.findOne({ email });
    if (checkUserPresent) {
      return res.status(409).json({
        success: false,
        message: ExceptionMessage.USER_ALREADY_EXIST,
      });
    }

    // Remove old OTPs for this email (avoid clutter)
    await OTP.deleteMany({ email });

    // Generate a unique 6-digit OTP
    let otp;
    let attempts = 0;
    do {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      attempts++;
      if (attempts > 5) {
        return res.status(500).json({
          success: false,
          message: ExceptionMessage.OTP_GENERATION_FAILED,
        });
      }
    } while (await OTP.findOne({ otp }));

    // Save OTP to DB
    await OTP.create({ email, otp });

    // Send email with OTP
    try {
      await mailSender(
        email,
        "Email verification from PathShala",
        otpTemplate(otp)
      );
    } catch (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({
        success: false,
        message: ExceptionMessage.EMAIL_SEND_FAILED,
        error: error.message,
      });
    }

    res.status(200).json({
      success: true,
      message: SuccessMessage.OTP_SENT,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      message: ExceptionMessage.OTP_SEND_FAILED,
    });
  }
};

//all three testing done
// exports.sendotp = async (req, res) => {
//   try {
//     //fetch email from request body
//     const { email } = req.body;

//     //check if user already exist or not
//     const checkUserPresent = await User.findOne({ email });

//     //if user already exists the return a response
//     if (checkUserPresent) {
//       return res.status(401).json({
//         success: false,
//         message: "User already exists",
//       });
//     }
//     // console.log("here we check user is present or not " ,checkUserPresent);

//     //generate otp
//     var otp = otpGenerator.generate(6, {
//       upperCaseAlphabets: false,
//       lowerCaseAlphabets: false,
//       specialChars: false,
//     });
//     // console.log("otp generated this is otp", otp);

//     //check unique otp or not
//     let result = await OTP.findOne({ otp: otp });
//     // console.log("otp ke model me ye otp mila ya nahi check", result);

//     while (result) {
//       otp = otpGenerator.generate(6, {
//         upperCaseAlphabets: false,
//         lowerCaseAlphabets: false,
//         specialChars: false,
//       });

//       result = await OTP.findOne({ otp: otp });
//     }

//     //otp ki entry databsase me kro taki baad me verify kr ske

//     const otpPayload = {
//       email,
//       otp,
//     };
//     console.log("ye hai opt ka payload", otpPayload);

//     //create and entry for otp
//     const otpBody = await OTP.create(otpPayload);

//     try {
//       const emailResponse = await mailSender(
//         email,
//         "Email verification from PathShala",
//         otpTemplate(otp)
//       );
//       console.log("Email sent successfully:", emailResponse.response);
//     } catch (error) {
//       // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
//       console.error("Error occurred while sending email:", error);
//       return res.status(500).json({
//         success: false,
//         message: "Error occurred while sending email",
//         error: error.message,
//       });
//     }

//     // console.log( "this is otpboyd",otpBody);

//     //return response successfully
//     res.status(200).json({
//       success: true,
//       message: "OTP sent successfully",
//       otp,
//     });
//   } catch (e) {
//     console.log(e);
//     return res.status(500).json({
//       success: false,
//       message: "Error while sending otp",
//     });
//   }
// };
//signUp ka handler

// exports.signup = async (req, res) => {
//   try {
//     //data fetchh from requiest body
//     const {
//       firstName,
//       lastName,
//       email,
//       password,
//       confirmPassword,
//       accountType,
//       // contactNumber,
//       otp,
//     } = req.body;
//     //validate kro

//     if (
//       !firstName ||
//       !lastName ||
//       !email ||
//       !password ||
//       !otp ||
//       !confirmPassword ||
//       !accountType
//     ) {
//       return res.status(403).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }
//     //2 password match kr lo password and confirm password KO
//     if (password !== confirmPassword) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Password and ConfirmPassword are not the same please try again",
//       });
//     }

//     //check user already exist or not

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({
//         success: false,
//         message: "User is already registered",
//       });
//     }

//     //find most recent otp for the user
//     // Find the most recent OTP for the email
//     const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
//     console.log("otp response  ",response);

//     if (response.length === 0) {
//       // OTP not found for the email
//       return res.status(400).json({
//         success: false,
//         message: "The OTP is not valid",
//       });
//     } else if (otp !== response[0].otp) {
//       // Invalid OTP
//       return res.status(400).json({
//         success: false,
//         message: "The OTP is not valid",
//       });
//     }
//     //hash password
//     const hashPassword = await bcrypt.hash(password, 10);
//     console.log("hashPassword", hashPassword);
//     console.log("password is hash", hashPassword);

//     //create entry in db

//     const profileDetails = await Profile.create({
//       gender: null,
//       dateOfBirth: null,
//       about: null,
//       contactNumber: null,
//     });

//     //chal rha h yha tk
//     const user = await User.create({
//       firstName,
//       lastName,
//       email,
//       // contactNumber,
//       password: hashPassword,
//       accountType: accountType,
//       additionalDetails: profileDetails._id,
//       // image:"",
//       image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
//     });
//     // console.log("user is",user);
//     //return response
//     return res.status(200).json({
//       success: true,
//       message: "User is registered successfuly",
//     });
//   } catch (e) {
//     console.log(e);
//     return res.status(500).json({
//       success: false,
//       message: "user cannot be registerd try again",
//     });
//   }
// };

exports.signup = async (req, res) => {
  try {
    // Fetch data from request body
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      otp,
    } = req.body;

    // Validate required fields
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
        message: ExceptionMessage.ALL_FIELDS_REQUIRED,
      });
    }

    // Check password confirmation
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: ExceptionMessage.PASSWORD_MISMATCH,
      });
    }

    // Ensure password meets security standards
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: ExceptionMessage.PASSWORD_TOO_SHORT,
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedOtp = String(otp).trim();

    // Check if user already exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: ExceptionMessage.USER_ALREADY_REGISTERED,
      });
    }

    // Fetch the most recent OTP for this email
    const otpRecords = await OTP.find({ email: normalizedEmail })
      .sort({ createdAt: -1 })
      .limit(1);

    const otpRecord = otpRecords[0];

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: ExceptionMessage.OTP_EXPIRED,
      });
    }

    const otpAgeMs = Date.now() - new Date(otpRecord.createdAt).getTime();
    if (otpAgeMs > 5 * 60 * 1000) {
      await OTP.deleteOne({ _id: otpRecord._id });
      return res.status(400).json({
        success: false,
        message: ExceptionMessage.OTP_EXPIRED,
      });
    }

    if (normalizedOtp !== String(otpRecord.otp).trim()) {
      return res.status(400).json({
        success: false,
        message: ExceptionMessage.INVALID_OTP,
      });
    }

    // Delete OTP after use (prevents reuse)
    await OTP.deleteOne({ _id: otpRecord._id });

    // Hash password securely
    const hashPassword = await bcrypt.hash(password, 10);

    // Create user profile details
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });

    // Create user entry in database
    await User.create({
      firstName,
      lastName,
      email: normalizedEmail,
      password: hashPassword,
      accountType,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    return res.status(200).json({
      success: true,
      message: SuccessMessage.SIGNED_UP,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      message: ExceptionMessage.USER_REGISTRATION_FAILED,
    });
  }
};

//Login ka handler

exports.login = async (req, res) => {
  try {
    //get data from request body
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: ExceptionMessage.ALL_FIELDS_REQUIRED,
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({ email: normalizedEmail }).populate("additionalDetails");
    // console.log("user hai ye",user);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: ExceptionMessage.USER_NOT_REGISTERED,
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
        message: SuccessMessage.LOGGED_IN,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: ExceptionMessage.LOGIN_FAILED,
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: ExceptionMessage.LOGIN_FAILED,
    });
  }
};

//changePassword handler
//ye testing me check nhi hua hai
exports.changePassword = async (req, res) => {
  try {
    const userDetails = await User.findById(req.user.id);
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: ExceptionMessage.ALL_FIELDS_REQUIRED,
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: ExceptionMessage.PASSWORD_MISMATCH,
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: ExceptionMessage.PASSWORD_TOO_SHORT,
      });
    }

    if (oldPassword === newPassword) {
      return res.status(400).json({
        success: false,
        message: ExceptionMessage.OLD_NEW_PASSWORD_SAME,
      });
    }

    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    );
    if (!isPasswordMatch) {
      // If old password does not match, return a 401 (Unauthorized) error
      return res
        .status(401)
        .json({ success: false, message: ExceptionMessage.INVALID_PASSWORD });
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
        message: ExceptionMessage.EMAIL_SEND_FAILED,
        error: error.message,
      });
    }

    // Return success response
    return res
      .status(200)
      .json({ success: true, message: SuccessMessage.CHANGE_PASSWORD_SUCCESS });
  } catch (error) {
    // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
    console.error("Error occurred while updating password:", error);
    return res.status(500).json({
      success: false,
      message: ExceptionMessage.SOMETHING_WENT_WRONG,
      error: error.message,
    });
  }
};
