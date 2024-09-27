import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import  { useState } from 'react';
import OtpInput from 'react-otp-input';
import {useNavigate,useNavigation} from "react-router-dom"
import {Link} from "react-router-dom"
import {sendOtp} from "../services/operations/authAPI"
import {signUp} from "../services/operations/authAPI"



const VerifyEmail = () => {
    const { loading ,signupData} = useSelector((state) => state.auth);

    useEffect(()=>{
        if(!signupData){
            navigate("/signup");
        }
    },[])

    const [otp, setOtp] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOnSubmit =(e)=>{
        e.preventDefault();

        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        } = signupData;
        dispatch(signUp(accountType,firstName,lastName,email,password,confirmPassword,otp,navigate))
    }
    return (
        <div className="text-black">

            {
                loading ? (
                    <div>Loading..</div>
                ) : (
                    <div>
                        <h1 className="text-white">Verify Email</h1>
                        <p  className="text-white">A verification code has been sent to you Enter the code below</p>
                        <form onSubmit={handleOnSubmit}>
                            <OtpInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                renderInput={(props) => <input {...props} />}
                                renderSeparator={<span>-</span>}


                            >

                            </OtpInput>
                            <button
                            type="submit"
                                 className="text-white"
                            >
                                Verify Email
                            </button>
                        </form>

                        <div>
                            <div>
                                <Link to="/login">
                                    <p>Back to Login</p>
                                </Link>

                            </div>
                            <button
                            onClick={()=>dispatch(sendOtp(signupData.email))}
                            >
                                Resend it
                            </button>
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default VerifyEmail
