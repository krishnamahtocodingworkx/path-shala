import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OtpInput from "react-otp-input";
import { useNavigate, Link } from "react-router-dom";
import { sendOtp, signUp } from "../services/operations/authAPI";
import AuthPageLayout from "../components/core/Auth/AuthPageLayout";
import AuthSubmitButton from "../components/core/Auth/AuthSubmitButton";

const inputStyle = {
  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
};

const VerifyEmail = () => {
  const { signupData } = useSelector((state) => state.auth);
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!signupData) {
      navigate("/login");
    }
  }, [signupData, navigate]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!signupData || otp.length !== 6) {
      return;
    }

    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;

    setIsSubmitting(true);
    try {
      await dispatch(
        signUp(
          accountType,
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          otp,
          navigate
        )
      );
    } catch (error) {
      // Error toast is handled in authAPI
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    if (!signupData?.email || isResending) {
      return;
    }

    setIsResending(true);
    setOtp("");
    try {
      await dispatch(sendOtp(signupData.email, null, signupData));
    } catch (error) {
      // Error toast is handled in authAPI
    } finally {
      setIsResending(false);
    }
  };

  if (!signupData) {
    return null;
  }

  return (
    <AuthPageLayout
      title="Verify your email"
      description={`Enter the 6-digit code sent to ${signupData.email}.`}
    >
      <form onSubmit={handleOnSubmit} className="flex flex-col gap-y-6">
        <div className="flex justify-center">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            shouldAutoFocus
            inputType="tel"
            renderInput={(props) => (
              <input
                {...props}
                className="mx-1 rounded-[0.5rem] bg-richblack-800 p-[12px] text-center text-[1.125rem] font-semibold text-richblack-5 outline-none focus:ring-2 focus:ring-yellow-50"
                style={{ ...inputStyle, height: "48px", width: "48px" }}
              />
            )}
          />
        </div>

        <AuthSubmitButton
          isSubmitting={isSubmitting}
          disabled={otp.length !== 6}
        >
          Verify Email
        </AuthSubmitButton>
      </form>

      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={handleResendOtp}
          disabled={isResending || isSubmitting}
          className="text-sm text-richblack-100 transition hover:text-richblack-5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isResending ? "Sending new code..." : "Didn't receive the code? Resend"}
        </button>
      </div>

      <div className="mt-4 text-center">
        <Link to="/login" className="text-sm text-blue-100 hover:underline">
          Back to Login
        </Link>
      </div>
    </AuthPageLayout>
  );
};

export default VerifyEmail;
