const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { ExceptionMessage, SuccessMessage } = require("../utils/constants");
//resetPasswordToken


//both tested successfully
exports.resetPasswordToken = async (req,res)=>{


    try{
    const email = req.body.email;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: ExceptionMessage.ALL_FIELDS_REQUIRED,
      });
    }

    const user = await User.findOne({email:email});
    if(!user){
        return res.status(401).json({
            success:false,
            message: ExceptionMessage.EMAIL_NOT_EXISTS,
        })
    }

    //email validation
    //generate token
    const token = crypto.randomBytes(20).toString("hex");

    //update user by adding taken and expiration time

    const updatedDetails = await User.findOneAndUpdate(
        {email:email},
        {
            token:token,
            resetPasswordExpires:Date.now() + 5*60*1000,
        },
        {new:true});

        console.log("updatedDEtails is",updatedDetails)
    //create url

    const url = `${process.env.FRONTEND_URL || "http://localhost:3000"}/update-password/${token}`

    //send mail containing the url
    await mailSender(email,"Password reset link",`Password Reset Link ${url}`);
    //return response
    return res.status(200).json({
        success:true,
        message: SuccessMessage.PASSWORD_RESET_EMAIL_SENT,
    })

    }catch(e){
        console.log(e);
        return res.status(500).json({
            success:false,
            message: ExceptionMessage.SOMETHING_WENT_WRONG,
        })
    }
}

//resetPassword

exports.resetPassword = async(req,res)=>{
    try{

        const {password,confirmPassword,token} = req.body;

        if (!password || !confirmPassword || !token) {
            return res.status(400).json({
                success: false,
                message: ExceptionMessage.ALL_FIELDS_REQUIRED,
            });
        }

        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message: ExceptionMessage.PASSWORD_MISMATCH
            })
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: ExceptionMessage.PASSWORD_TOO_SHORT,
            });
        }

        const userDetails = await User.findOne({token:token});
        if(!userDetails){
            return res.status(400).json({
                success:false,
                message: ExceptionMessage.PASSWORD_RESET_TOKEN_INVALID,
            })
        }

        if(userDetails.resetPasswordExpires < Date.now()){
            return res.status(400).json({
                success:false,
                message: ExceptionMessage.PASSWORD_RESET_TOKEN_EXPIRED
            })
        }

        const hashedPassword = await bcrypt.hash(password,10);
        await User.findOneAndUpdate(
            {token:token},
            {
                password: hashedPassword,
                token: undefined,
                resetPasswordExpires: undefined,
            },
            {new:true},
        )

        return res.status(200).json({
            success:true,
            message: SuccessMessage.RESET_PASSWORD_SUCCESS
        })
    }catch(e){
        console.log(e);
        return res.status(500).json({
            success:false,
            message: ExceptionMessage.PASSWORD_RESET_FAILED
        })
    }
}