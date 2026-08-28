import React from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../../services/operations/authAPI";
import AuthSubmitButton from "./AuthSubmitButton";

import { useState } from "react";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await dispatch(login(email, password, navigate));
    } catch (error) {
      // Error toast is handled in authAPI
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="mt-6 flex w-full flex-col gap-y-4"
      onSubmit={handleOnSubmit}
    >
      <label className="w-full">
        <p>
          Email Address<sup>*</sup>
        </p>
        <input
          required
          type="email"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter email address"
          disabled={isSubmitting}
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 disabled:opacity-70"
        />
      </label>

      <label className="w-full relative">
        <p>
          Password <sup>*</sup>
        </p>
        <input
          name="password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={handleOnChange}
          placeholder="Enter Your Password"
          disabled={isSubmitting}
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
        />
        <span
          // onClick={(prev) => setShowPassword(!prev)}
           onClick={() => setShowPassword((prev) => !prev)}

          className="absolute right-3 top-[38px] cursor-pointer z-10"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
          )}
        </span>

        <Link to="/forgot-password">
          <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
            Forgot Password
          </p>
        </Link>
      </label>
      <AuthSubmitButton isSubmitting={isSubmitting}>Sign In</AuthSubmitButton>
    </form>
  );
};

export default LoginForm;
