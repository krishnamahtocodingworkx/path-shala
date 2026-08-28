import {createSlice} from "@reduxjs/toolkit"

const SIGNUP_DATA_KEY = "pathshala_signup_data"

const getStoredSignupData = () => {
  try {
    const data = sessionStorage.getItem(SIGNUP_DATA_KEY)
    return data ? JSON.parse(data) : null
  } catch {
    return null
  }
}

const initialState = {
    signupData: getStoredSignupData(),
    loading: false,
    token:localStorage.getItem("token")?JSON.parse(localStorage.getItem("token")):null
}

const authSlice = createSlice({
    name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, value) {
      state.signupData = value.payload;
      if (value.payload) {
        sessionStorage.setItem(SIGNUP_DATA_KEY, JSON.stringify(value.payload))
      } else {
        sessionStorage.removeItem(SIGNUP_DATA_KEY)
      }
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
    },
  },
})

export const { setSignupData, setLoading, setToken } = authSlice.actions;
export default authSlice.reducer