import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"

import CountryCode from "../../../data/countrycode.json"
import { apiConnector } from "../../../services/apiconnector"
import { contactusEndpoint } from "../../../services/apis"

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm()

  const submitContactForm = async (data) => {
    try {
      setLoading(true)
      await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data)
      toast.success("Message sent successfully")
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
      toast.error("Could not send message. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      })
    }
  }, [reset, isSubmitSuccessful])

  const fieldClass =
    "w-full rounded-lg border border-richblack-600 bg-richblack-700 p-3 text-richblack-5 outline-none placeholder:text-richblack-400 focus:border-yellow-50"

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(submitContactForm)}>
      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="flex flex-col gap-2 lg:w-1/2">
          <label htmlFor="firstname" className="text-sm text-richblack-5">
            First Name
          </label>
          <input
            type="text"
            id="firstname"
            placeholder="Enter first name"
            className={fieldClass}
            {...register("firstname", { required: true })}
          />
          {errors.firstname && (
            <span className="text-xs text-yellow-50">Please enter your name.</span>
          )}
        </div>
        <div className="flex flex-col gap-2 lg:w-1/2">
          <label htmlFor="lastname" className="text-sm text-richblack-5">
            Last Name
          </label>
          <input
            type="text"
            id="lastname"
            placeholder="Enter last name"
            className={fieldClass}
            {...register("lastname")}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm text-richblack-5">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter email address"
          className={fieldClass}
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="text-xs text-yellow-50">
            Please enter your email address.
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="phonenumber" className="text-sm text-richblack-5">
          Phone Number
        </label>
        <div className="flex gap-3">
          <select
            id="countrycode"
            className={`${fieldClass} w-[90px] shrink-0`}
            {...register("countrycode", { required: true })}
          >
            {CountryCode.map((ele, i) => (
              <option key={i} value={ele.code}>
                {ele.code}
              </option>
            ))}
          </select>
          <input
            type="tel"
            id="phonenumber"
            placeholder="12345 67890"
            className={fieldClass}
            {...register("phoneNo", {
              required: {
                value: true,
                message: "Please enter your phone number.",
              },
              maxLength: { value: 12, message: "Invalid phone number" },
              minLength: { value: 10, message: "Invalid phone number" },
            })}
          />
        </div>
        {errors.phoneNo && (
          <span className="text-xs text-yellow-50">{errors.phoneNo.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm text-richblack-5">
          Message
        </label>
        <textarea
          id="message"
          rows="6"
          placeholder="Enter your message here"
          className={`${fieldClass} resize-none`}
          {...register("message", { required: true })}
        />
        {errors.message && (
          <span className="text-xs text-yellow-50">Please enter your message.</span>
        )}
      </div>

      <button
        disabled={loading}
        type="submit"
        className="rounded-md bg-yellow-50 px-6 py-3 text-center text-sm font-bold text-richblack-900 transition hover:scale-95 disabled:cursor-not-allowed disabled:bg-richblack-500 sm:text-base"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  )
}

export default ContactUsForm
