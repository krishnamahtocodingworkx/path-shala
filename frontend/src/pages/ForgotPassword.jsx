import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../services/operations/authAPI";

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");

  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleOnSubmit = (event) => {
    event.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <span className="animate-spin w-8 h-8 border-4 border-t-transparent border-white rounded-full"></span>
        </div>
      ) : (
        <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold text-center mb-4">
            {emailSent ? "Check Your Email" : "Reset Your Password"}
          </h1>

          <p className="text-gray-400 text-center mb-6">
            {emailSent
              ? `We've sent a password reset link to ${email}. Check your inbox.`
              : "Enter your email address below to receive a password reset link."}
          </p>

          <form onSubmit={handleOnSubmit} className="space-y-4">
            {!emailSent && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Email Address *
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-3 py-2 rounded-lg border border-gray-600 bg-gray-700 text-richblack-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition duration-200"
            >
              {emailSent ? "Resend Email" : "Reset Password"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <Link to="/login" className="text-blue-400 hover:underline">
              Back to Login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
