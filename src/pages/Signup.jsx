import React from "react";
import Template from "../components/core/Auth/Template";
import image from "../assets/Images/signup.webp";

const Signup = () => {
  return (
    <Template
      heading="Join the millions learning to code with PathShala for free"
      description1="Build skills for today, tomorrow, and beyond.."
      description2="Education to future-proof your career."
      formType="signup"
      image={image}
    />
  );
};

export default Signup;
