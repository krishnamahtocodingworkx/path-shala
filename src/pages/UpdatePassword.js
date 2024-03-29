import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { useLocation } from "react-router-dom"
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";

import {resetPassword} from "../services/operations/authAPI"
import {Link} from "react-router-dom"



const UpdatePassword = () => {

    const dispatch = useDispatch();
    const location = useLocation();

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: ""
    })

    const {password, confirmPassword} = formData;

    const handleOnChange = (event) => {
        setFormData((prevData) => (
            {
                ...prevData,
                [event.target.name]: event.target.value,

            }
        ))
    }

    const handleOnSubmit = (event) => {

        //resetpassword backend ko call krta hai
        event.preventDefault();
        const token = location.pathname.split('/').at(-1)
        dispatch(resetPassword(password,confirmPassword , token))
    }
    const { loading } = useSelector((state) => state.auth);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setshowConfirmPassword] = useState(false);
    return (
        <div>
            {
                loading ? (
                    <div>
                        Loading...
                    </div>
                ) : (
                    <div>
                        <h1>Choose new Passowrd</h1>
                        <p>Almost done. Enter Your new password and youre all set.</p>

                        <form onSubmit={handleOnSubmit}>
                            <label>
                                <p>New Password</p>
                                <input
                                    required
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={password}
                                    onChange={handleOnChange}
                                />
                                <span
                                    onClick={(prev) => setShowPassword(!prev)}
                                >
                                    {
                                        showPassword ? <FaEyeSlash fontSize={24} /> : <FaRegEye fontSize={24} />
                                    }
                                </span>
                            </label>

                            <label>
                                <p>Confirm assword</p>
                                <input
                                    required
                                    type={showPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={handleOnChange}
                                    placeholder='ConfimPassword'
                                />
                                <span
                                    onClick={(prev) => setShowPassword(!prev)}
                                >
                                    {
                                        showPassword ? <FaEyeSlash fontSize={24} /> : <FaRegEye fontSize={24} />
                                    }
                                </span>
                            </label>

                            <button type="submit"
                            className="text-white">
                                Reset Password
                                "

                            </button>
                            <div>
                                <Link to="/login">
                                    <p>Back to Login</p>
                                </Link>

                            </div>
                        </form>
                    </div>
                )
            }
        </div>
    )
}

export default UpdatePassword