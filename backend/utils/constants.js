const USER_ROLE = {
  STUDENT: "Student",
  INSTRUCTOR: "Instructor",
  ADMIN: "Admin",
};

const ExceptionMessage = {
  // Auth
  USER_ALREADY_EXIST: "User already exists.",
  USER_ALREADY_REGISTERED: "User is already registered.",
  USER_NOT_REGISTERED: "User is not registered. Please sign up first.",
  USER_NOT_FOUND: "User not found.",
  USER_REGISTRATION_FAILED: "User registration failed. Please try again.",
  USER_DELETE_FAILED: "User could not be deleted successfully.",
  USER_DETAILS_FETCH_FAILED: "Error occurred while fetching user details.",
  LOGIN_FAILED: "Login failed. Please check your credentials.",
  INVALID_PASSWORD: "The current password you entered is incorrect. Please try again.",
  PASSWORD_MISMATCH: "Password and confirm password do not match.",
  PASSWORD_TOO_SHORT: "Password must be at least 6 characters long.",
  PASSWORD_RESET_TOKEN_INVALID: "Token is invalid.",
  PASSWORD_RESET_TOKEN_EXPIRED: "The time to change password has expired.",
  PASSWORD_RESET_FAILED: "Error occurred while resetting the password.",
  OLD_NEW_PASSWORD_SAME: "Old password and new password cannot be the same.",
  EMAIL_NOT_EXISTS: "The email address does not exist.",
  OTP_GENERATION_FAILED: "Failed to generate a unique OTP. Please try again.",
  OTP_SEND_FAILED: "Error while sending OTP.",
  OTP_EXPIRED: "Your OTP has expired. Please request a new one.",
  INVALID_OTP: "The OTP provided is invalid.",
  EMAIL_SEND_FAILED: "Error occurred while sending email.",
  TOKEN_MISSING: "You are not authorized. Token is missing.",
  TOKEN_INVALID: "Token is invalid.",
  AUTH_INVALID_TOKEN: "Invalid authentication token. Please log in again.",
  STUDENT_ONLY_ROUTE: "Students can only perform this action. This is a protected route for students only.",
  INSTRUCTOR_ONLY_ROUTE: "Instructors can only perform this action. This is a protected route for instructors only.",
  ADMIN_ONLY_ROUTE: "Admins can only perform this action. This is a protected route for admins only.",
  INSTRUCTOR_OR_ADMIN_ONLY_ROUTE: "Only instructors and admins can perform this action.",
  USER_ROLE_VERIFICATION_FAILED: "User role cannot be verified.",
  INSTRUCTOR_ROLE_VERIFICATION_FAILED: "Instructor role cannot be verified. Please try again.",
  ADMIN_ROLE_VERIFICATION_FAILED: "Admin role cannot be verified. Please try again.",

  // General
  ALL_FIELDS_REQUIRED: "All fields are required.",
  SOMETHING_WENT_WRONG: "Something went wrong. Please try again later.",
  INTERNAL_SERVER_ERROR: "Internal server error. Please try again later.",

  // Profile
  PROFILE_UPDATE_FAILED: "Error while updating profile.",

  // Category
  CATEGORY_NOT_FOUND: "Category not found.",
  CATEGORY_DETAILS_NOT_FOUND: "Category details not found.",
  CATEGORY_ALREADY_EXISTS: "A category with this name already exists.",
  CATEGORY_NAME_REQUIRED: "Category name is required.",
  NO_COURSES_IN_CATEGORY: "No courses found for the selected category.",

  // Course
  COURSE_ID_REQUIRED: "Please provide a course ID.",
  COURSE_NOT_FOUND: "Course not found.",
  COURSE_CREATE_FAILED: "Failed to create course.",
  COURSE_FETCH_FAILED: "Cannot fetch course data.",
  INSTRUCTOR_NOT_FOUND: "Instructor details not found.",
  INSTRUCTOR_COURSES_FETCH_FAILED: "Failed to retrieve instructor courses.",
  STUDENT_ALREADY_ENROLLED: "Student is already enrolled in this course.",
  STUDENT_NOT_ENROLLED: "Student is not enrolled in this course.",
  COURSE_ALREADY_REVIEWED: "Course has already been reviewed by the user.",

  // Section & SubSection
  SECTION_PROPERTIES_MISSING: "Missing required properties.",
  SECTION_NOT_FOUND: "Section not found.",
  SUBSECTION_NOT_FOUND: "SubSection not found.",
  SUBSECTION_UPDATE_FAILED: "An error occurred while updating the section.",
  SUBSECTION_DELETE_FAILED: "An error occurred while deleting the subSection.",
  INVALID_SUBSECTION: "Invalid subsection.",
  SUBSECTION_ALREADY_COMPLETED: "Subsection already completed.",

  // Course progress
  COURSE_PROGRESS_NOT_FOUND: "Course progress does not exist.",

  // Payments
  PAYMENT_INITIATION_FAILED: "Could not initiate order.",
  PAYMENT_FAILED: "Payment failed.",
  PAYMENT_DATA_REQUIRED: "Please provide data for courses or user ID.",
  ENROLLMENT_FIELDS_REQUIRED: "Please provide all the required fields.",
};

const SuccessMessage = {
  // Auth
  SIGNED_UP: "User has been signed up successfully!",
  LOGGED_IN: "User has been logged in successfully!",
  OTP_SENT: "OTP has been sent successfully!",
  RESET_PASSWORD_SUCCESS: "Password has been reset successfully!",
  CHANGE_PASSWORD_SUCCESS: "Password has been changed successfully!",
  PASSWORD_RESET_EMAIL_SENT: "Message sent successfully. Please check your email.",

  // Profile
  PROFILE_UPDATED: "Profile has been updated successfully!",
  ACCOUNT_DELETED: "Account has been deleted successfully!",
  USER_DETAILS: "User details have been fetched successfully!",
  IMAGE_UPDATED: "Image has been updated successfully!",

  // Category
  CATEGORY_CREATED: "Category has been created successfully!",
  TAGS_FETCHED: "Tags have been fetched successfully!",

  // Course
  COURSE_CREATED: "Course has been created successfully!",
  COURSE_UPDATED: "Course has been updated successfully!",
  COURSE_DELETED: "Course has been deleted successfully!",

  // Section & SubSection
  SECTION_CREATED: "Section has been created successfully!",
  SECTION_DELETED: "Section has been deleted successfully!",
  SUBSECTION_UPDATED: "SubSection has been updated successfully!",
  SUBSECTION_DELETED: "SubSection has been deleted successfully!",

  // Course progress
  COURSE_PROGRESS_UPDATED: "Course progress has been updated successfully!",

  // Payments
  PAYMENT_VERIFIED: "Payment has been verified successfully!",

  // Rating & Review
  RATING_REVIEW_CREATED: "Rating and review have been created successfully!",
  AVERAGE_RATING_ZERO: "Average rating is 0. No ratings given yet.",
  REVIEWS_FETCHED: "All reviews have been fetched successfully!",

  // Contact
  EMAIL_SENT: "Email has been sent successfully!",
};

module.exports = { USER_ROLE, ExceptionMessage, SuccessMessage };
