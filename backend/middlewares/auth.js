const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");
const { USER_ROLE, ExceptionMessage } = require("../utils/constants");

//auth ka middleware
exports.auth = async (req, res, next) => {
  try {
    //extract token
    const authHeader = req.header("Authorization") || req.header("Authorisation");
    const token =
      req.cookies.token ||
      req.body.token ||
      (authHeader ? authHeader.replace("Bearer ", "") : null);

    //if token missing, then return response
    if (!token) {
      return res.status(401).json({
        success: false,
        message: ExceptionMessage.TOKEN_MISSING,
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
        .json({ success: false, message: ExceptionMessage.TOKEN_INVALID });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: ExceptionMessage.AUTH_INVALID_TOKEN,
    });
  }
};
//isStudent ka middleware

exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType !== USER_ROLE.STUDENT) {
      return res.status(401).json({
        success: false,
        message: ExceptionMessage.STUDENT_ONLY_ROUTE,
      });
    }
    next();
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: ExceptionMessage.USER_ROLE_VERIFICATION_FAILED,
    });
  }
};

//isInstructor
exports.isInstructor = async (req, res, next) => {
  try {
    if (req.user.accountType !== USER_ROLE.INSTRUCTOR) {
      return res.status(401).json({
        success: false,
        message: ExceptionMessage.INSTRUCTOR_ONLY_ROUTE,
      });
    }
    next();
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: ExceptionMessage.INSTRUCTOR_ROLE_VERIFICATION_FAILED,
    });
  }
};

//isAdmin ka middlware
exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.accountType !== USER_ROLE.ADMIN) {
      return res.status(401).json({
        success: false,
        message: ExceptionMessage.ADMIN_ONLY_ROUTE,
      });
    }
    next();
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: ExceptionMessage.ADMIN_ROLE_VERIFICATION_FAILED,
    });
  }
};
