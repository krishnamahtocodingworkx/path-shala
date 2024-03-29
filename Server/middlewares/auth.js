const jwt  = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

//auth ka middleware
exports.auth = async (req, res, next) => {
    try{
        // console.log("auth middleware ke andar aa chuke ahi")

        // console.log("BEFORE ToKEN EXTRACTION");
        //extract token
        const token = req.cookies.token 
                        || req.body.token 
                        || req.header("Authorisation").replace("Bearer ", "");
        // console.log("AFTER ToKEN EXTRACTION");

        //if token missing, then return response
        if(!token) {
            // console.log("Token missing hai ")
            return res.status(401).json({
                success:false,
                message:'TOken is missing',
            });
        }

        // console.log("yha tk shi hai ok")
        //verify the token
		try {
			// Verifying the JWT using the secret key stored in environment variables
			const decode = await jwt.verify(token, process.env.JWT_SECRET);
			console.log(decode);
			// Storing the decoded JWT payload in the request object for further use
			req.user = decode;
		} catch (error) {
			// If JWT verification fails, return 401 Unauthorized response
			return res
				.status(401)
				.json({ success: false, message: "token is invalid" });
		}
        // console.log("auth middleware se nikal chuke hai")
        next();
    }
    catch(error) {  
        return res.status(401).json({
            success:false,
            message:'Something went wrong while validating the token',
        });
    }
}
//isStudent ka middleware

exports.isStudent = async (req,res,next)=>{
    // console.log('Student ke andar aa gye hai')
    try{
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for Student only",
            })
        }
        next();

    }catch(e){
        console.log(e);
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified",
        })
    }
}


//isInstructor
exports.isInstructor = async (req,res,next)=>{
    try{
        // console.log("instructor me phoch chuke hai")

        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for Instructor only",
            })
        }
        next();

    }catch(e){
        console.log(e);
        return res.status(500).json({
            success:false,
            message:"Instructor role cannot be verified,please try again"
        })
    }
}


//isAdmin ka middlware
exports.isAdmin = async (req,res,next)=>{
    try{
        // console.log("accountType is ->",req.user.accountType);

        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for Admin only",
            })
        }
        next();

    }catch(e){
        console.log(e);
        return res.status(500).json({
            success:false,
            message:"Admin role cannot be verified,please try again"
        })
    }
}