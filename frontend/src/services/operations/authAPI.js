import { toast } from "react-hot-toast";

import { setToken, setSignupData } from "../../slices/authSlice";
import { resetCart } from "../../slices/cartSlice";
import { setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiconnector";
import { endpoints } from "../apis";

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints;

function getApiErrorMessage(error) {
  return error?.response?.data?.message || error?.message;
}

export function sendOtp(email, navigate, signupData = null) {
  return async (dispatch) => {
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email: email.trim().toLowerCase(),
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      if (signupData) {
        dispatch(setSignupData(signupData));
      }

      toast.success(response.data.message);
      if (navigate) {
        navigate("/verify-email");
      }
    } catch (error) {
      console.log("SENDOTP API ERROR............", error);
      toast.error(getApiErrorMessage(error));
      throw error;
    }
  };
}

export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email: email.trim().toLowerCase(),
        password,
        confirmPassword,
        otp: String(otp).trim(),
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success(response.data.message);
      dispatch(setSignupData(null));
      navigate("/login");
    } catch (error) {
      console.log("SIGNUP API ERROR............", error);
      toast.error(getApiErrorMessage(error));
      throw error;
    }
  };
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email: email.trim().toLowerCase(),
        password,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success(response.data.message);
      dispatch(setToken(response.data.token));
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;
      dispatch(setUser({ ...response.data.user, image: userImage }));

      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/dashboard/my-profile");
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      toast.error(getApiErrorMessage(error));
      throw error;
    }
  };
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    dispatch(resetCart());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out");
    navigate("/");
  };
}

export function getPasswordResetToken(email, setEmailSent) {
  return async () => {
    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {
        email: email.trim().toLowerCase(),
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success(response.data.message);
      setEmailSent(true);
    } catch (error) {
      console.log("Reset password token error", error);
      toast.error(getApiErrorMessage(error));
      throw error;
    }
  };
}

export function resetPassword(password, confirmPassword, token, callback) {
  return async () => {
    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success(response.data.message);
      callback();
    } catch (error) {
      console.log("reset password error", error);
      toast.error(getApiErrorMessage(error));
      throw error;
    }
  };
}
