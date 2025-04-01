import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import OtpInput from "react-otp-input";
import { useNavigate, useNavigation } from "react-router-dom";
import { Link } from "react-router-dom";
import { sendOtp } from "../services/operations/authAPI";
import { signUp } from "../services/operations/authAPI";

const VerifyEmail = () => {
  const { loading, signupData } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, []);

  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;
    dispatch(
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
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      {loading ? (
        <div className="text-white text-lg">Loading...</div>
      ) : (
        <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-2">Verify Email</h1>
          <p className="text-center text-gray-300 mb-4">
            A verification code has been sent to you. Enter the code below.
          </p>

          <form
            onSubmit={otp.length === 6 ? handleOnSubmit : () => {}}
            className="flex flex-col gap-4"
          >
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span className="mx-1">-</span>}
              renderInput={(props) => (
                <input
                  {...props}
                  className="text-center text-black border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ height: "40px", width: "40px" }}
                />
              )}
            />

            <button
              disabled={otp.length !== 6}
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Verify Email
            </button>
          </form>

          <div className="text-center mt-4">
            <Link to="/login" className="text-blue-400 hover:underline">
              Back to Login
            </Link>
          </div>

          <div className="text-center mt-2">
            <button
              onClick={() => dispatch(sendOtp(signupData.email))}
              className="text-sm text-gray-400 hover:text-white transition"
            >
              Resend it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
