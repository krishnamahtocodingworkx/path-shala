import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../services/operations/authAPI";
import AuthPageLayout from "../components/core/Auth/AuthPageLayout";
import AuthSubmitButton from "../components/core/Auth/AuthSubmitButton";

const inputStyle = {
  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
};

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      await dispatch(getPasswordResetToken(email, setEmailSent));
    } catch (error) {
      // Error toast is handled in authAPI
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthPageLayout
      title={emailSent ? "Check your email" : "Reset your password"}
      description={
        emailSent
          ? `We've sent a password reset link to ${email}. Please check your inbox.`
          : "Enter your email address and we'll send you a link to reset your password."
      }
    >
      <form onSubmit={handleOnSubmit} className="flex flex-col gap-y-4">
        {!emailSent && (
          <label className="w-full">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Email Address <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              disabled={isSubmitting}
              style={inputStyle}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 disabled:opacity-70"
            />
          </label>
        )}

        <AuthSubmitButton isSubmitting={isSubmitting}>
          {emailSent ? "Resend Email" : "Reset Password"}
        </AuthSubmitButton>
      </form>

      <div className="mt-4 text-center">
        <Link to="/login" className="text-sm text-blue-100 hover:underline">
          Back to Login
        </Link>
      </div>
    </AuthPageLayout>
  );
};

export default ForgotPassword;
