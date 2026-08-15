import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { resetPassword } from "../services/operations/authAPI";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const { password, confirmPassword } = formData;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleOnChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const token = location.pathname.split("/").at(-1);
    dispatch(
      resetPassword(password, confirmPassword, token, () => {
        navigate("/login");
      })
    );
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
            Choose a New Password
          </h1>

          <p className="text-gray-400 text-center mb-6">
            Almost done! Enter your new password and you're all set.
          </p>

          <form onSubmit={handleOnSubmit} className="space-y-4">
            {/* New Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                New Password
              </label>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter new password"
                className="w-full px-3 py-2 rounded-lg border border-gray-600 bg-gray-700 text-richblack-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-10 cursor-pointer text-gray-400 hover:text-white"
              >
                {showPassword ? (
                  <FaEyeSlash size={20} />
                ) : (
                  <FaRegEye size={20} />
                )}
              </span>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Confirm Password
              </label>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm password"
                className="w-full px-3 py-2 rounded-lg border border-gray-600 bg-gray-700 text-richblack-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-10 cursor-pointer text-gray-400 hover:text-white"
              >
                {showConfirmPassword ? (
                  <FaEyeSlash size={20} />
                ) : (
                  <FaRegEye size={20} />
                )}
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition duration-200"
            >
              Reset Password
            </button>
          </form>

          {/* Back to Login */}
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

export default UpdatePassword;
