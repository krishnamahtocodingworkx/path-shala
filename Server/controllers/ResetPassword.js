const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
//resetPasswordToken


//both tested successfully
exports.resetPasswordToken = async (req,res)=>{


    try{
            //get email from req body
    const email = req.body.email;
    //check user for this email
    const user = await User.findOne({email:email});
    if(!user){
        return res.status(401).json({
            success:false,
            message:"your email is not registred with us",
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

    const url = `http://localhost:3000/update-password/${token}`

    //send mail containing the url
    await mailSender(email,"Password reset link",`Password Reset Link ${url}`);
    //return response
    return res.status(200).json({
        success:true,
        message:"message sent successfully,please check your email",
    })

    }catch(e){
        console.log(e);
        return res.status(500).json({
            success:false,
            message:"Something went wrong,while reset password",
        })
    }
}

//resetPassword

exports.resetPassword = async(req,res)=>{
    try{

        //fetch data
        const {password,confirmPassword,token} = req.body;
        //validation

        if(password !== confirmPassword){
            return res.status(401).json({
                success:false,
                message:"Password and confirm password is not matched"
            })
        }

        //get userdetails from db using token
        const userDetails = await User.findOne({token:token});
        //if no entry - invalid token
        if(!userDetails){
            console.log(userDetails);
            return res.json({
                success:false,
                message:"Token is Invalid",
            })
        }
        //token time check
        if(userDetails.resetPasswordExpires <Date.now() ){
            return res.json({
                succes:false,
                message:"Time is gone to change password"
            })
        }
        //hash password
        const hashedPassword = await bcrypt.hash(password,10);
        //update password
        await User.findOneAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true},
        )
        //return response
        return res.status(200).json({
            success:true,
            message:"Password reset successfully"
        })
    }catch(e){
        console.log(e);
        return res.status(500).json({
            success:false,
            message:"Error occurred while reset the password"
        })
    }
}