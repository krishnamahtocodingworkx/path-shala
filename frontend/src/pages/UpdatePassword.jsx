import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { resetPassword } from "../services/operations/authAPI";
import AuthPageLayout from "../components/core/Auth/AuthPageLayout";
import AuthSubmitButton from "../components/core/Auth/AuthSubmitButton";

const inputStyle = {
  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
};

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { password, confirmPassword } = formData;

  const handleOnChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password and confirm password do not match.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    const token = location.pathname.split("/").at(-1);
    setIsSubmitting(true);
    try {
      await dispatch(
        resetPassword(password, confirmPassword, token, () => {
          navigate("/login");
        })
      );
    } catch (error) {
      // Error toast is handled in authAPI
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthPageLayout
      title="Choose a new password"
      description="Almost done. Enter your new password below to complete the reset."
    >
      <form onSubmit={handleOnSubmit} className="flex flex-col gap-y-4">
        <label className="relative w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            New Password <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={handleOnChange}
            placeholder="Enter new password"
            disabled={isSubmitting}
            style={inputStyle}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5 disabled:opacity-70"
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-[38px] z-10 cursor-pointer"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
            ) : (
              <AiOutlineEye fontSize={24} fill="#AFB2BF" />
            )}
          </span>
        </label>

        <label className="relative w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Confirm Password <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleOnChange}
            placeholder="Confirm password"
            disabled={isSubmitting}
            style={inputStyle}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5 disabled:opacity-70"
          />
          <span
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-3 top-[38px] z-10 cursor-pointer"
          >
            {showConfirmPassword ? (
              <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
            ) : (
              <AiOutlineEye fontSize={24} fill="#AFB2BF" />
            )}
          </span>
        </label>

        <AuthSubmitButton isSubmitting={isSubmitting}>
          Reset Password
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

export default UpdatePassword;
