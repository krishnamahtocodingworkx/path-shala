import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiConnector } from "../../services/apiconnector";
import { contactusEndpoint } from "../../services/apis";
import CountryCode from "../../data/countrycode.json";

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactForm = async (data) => {
    //isme sara data hai
    console.log("Logging Data", data);
    try {
      setLoading(true);
      const response = await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        data
      );
      response = { status: "OK" };
      // console.log("Logging response", response);
      setLoading(false);
    } catch (error) {
      console.log("Error:", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <form
      onSubmit={handleSubmit(submitContactForm)}
      className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md"
    >
      <div className="flex flex-col gap-6">
        {/* First & Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="firstname" className="text-gray-700 font-medium">
              First Name
            </label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Enter first name"
              className="border border-gray-300 rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
              {...register("firstname", { required: true })}
            />
            {errors.firstname && (
              <span className="text-red-500 text-sm">
                Please enter your name
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="lastname" className="text-gray-700 font-medium">
              Last Name
            </label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Enter last name"
              className="border border-gray-300 rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
              {...register("lastname")}
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="text-gray-700 font-medium">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter email address"
            className="border border-gray-300 rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">
              Please enter your email address
            </span>
          )}
        </div>

        {/* Phone Number */}
        <div className="flex flex-col">
          <label htmlFor="phonenumber" className="text-gray-700 font-medium">
            Phone Number
          </label>
          <div className="flex gap-2">
            {/* Country Code Dropdown */}
            <select
              name="dropdown"
              id="dropdown"
              className="border border-gray-300 rounded-md p-2 bg-gray-50 w-24 text-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
              {...register("countrycode", { required: true })}
            >
              {CountryCode.map((element, index) => (
                <option key={index} value={element.code}>
                  {element.code} - {element.country}
                </option>
              ))}
            </select>

            {/* Phone Number Input */}
            <input
              type="number"
              name="phonenumber"
              id="phonenumber"
              placeholder="12345 67890"
              className="border border-gray-300 rounded-md p-2 w-full text-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
              {...register("phoneNo", {
                required: { value: true, message: "Please enter Phone Number" },
                maxLength: { value: 10, message: "Invalid Phone Number" },
                minLength: { value: 8, message: "Invalid Phone Number" },
              })}
            />
          </div>
          {errors.phoneNo && (
            <span className="text-red-500 text-sm">
              {errors.phoneNo.message}
            </span>
          )}
        </div>

        {/* Message */}
        <div className="flex flex-col">
          <label htmlFor="message" className="text-gray-700 font-medium">
            Message
          </label>
          <textarea
            name="message"
            id="message"
            rows="5"
            placeholder="Enter your message here"
            className="border border-gray-300 rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
            {...register("message", { required: true })}
          />
          {errors.message && (
            <span className="text-red-500 text-sm">
              Please enter your message.
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="rounded-md bg-yellow-500 text-center px-6 py-2 text-lg font-bold text-black hover:bg-yellow-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Send Message
        </button>
      </div>
    </form>
  );
};

export default ContactUsForm;
