const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");
const { USER_ROLE } = require("../utils/constants");

//auth ka middleware
exports.auth = async (req, res, next) => {
  try {
    //extract token
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorisation").replace("Bearer ", "");

    //if token missing, then return response
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "You are not authorized, token is missing",
      });
    }

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
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "You are not authorized, token is invalid",
    });
  }
};
//isStudent ka middleware

exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType !== USER_ROLE.STUDENT) {
      return res.status(401).json({
        success: false,
        message:
          "Students can only perform this action, This is protected route for Students only",
      });
    }
    next();
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified",
    });
  }
};

//isInstructor
exports.isInstructor = async (req, res, next) => {
  try {
    if (req.user.accountType !== USER_ROLE.INSTRUCTOR) {
      return res.status(401).json({
        success: false,
        message:
          "Instructors can only perform this action, This is protected route for Instructors only",
      });
    }
    next();
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Instructor role cannot be verified,please try again",
    });
  }
};

//isAdmin ka middlware
exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.accountType !== USER_ROLE.ADMIN) {
      return res.status(401).json({
        success: false,
        message:
          "Admins can only perform this action, This is protected route for Admins only",
      });
    }
    next();
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Admin role cannot be verified,please try again",
    });
  }
};
