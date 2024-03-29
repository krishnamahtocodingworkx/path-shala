import React,{useState} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import {Link} from "react-router-dom"
import {getPasswordResetToken} from "../services/operations/authAPI"

const ForgotPassword = () => {

    const [emailSent,setEmailSent]= useState(false);

    const [email,setEmail] = useState(false);

    const {loading} = useSelector((state)=>state.auth);

    const dispatch = useDispatch();

    const handleOnSubmit = (event)=>{
        event.preventDefault();
        dispatch(getPasswordResetToken(email,setEmailSent))
    }
  return (
    <div className="text-white flex flex-col justify-center items-center">
    {
        loading?(
            <div></div>
        ):(
            <div>
            <h1>
                {
                    !emailSent?"Reset Your password":"Check your email"
                }
            </h1>

            <p>
                {
                    !emailSent?"some text":`some text ${email}`

                }
            </p>

            <form onSubmit={handleOnSubmit}>
                {
                    !emailSent  && (
                        <label>
                            <p>Email Address*</p>
                            <input
                                required
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                placeholder='Enter your email address'
                                className="text-black"
                            />


                        </label>
                    )
                   
                }

                <button>
                    {
                        !emailSent ? "Reset Password":"Resend Eamil"
                    }
                </button>
            </form>

            <div>
            <Link to="/login">
                <p>Back to Login</p>
            </Link>

            </div>

            </div>
        )
    }
         
    </div>
  )
}

export default ForgotPassword