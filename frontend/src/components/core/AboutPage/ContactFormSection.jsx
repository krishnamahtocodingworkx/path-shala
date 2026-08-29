import React from "react"

import ContactUsForm from "../ContactUsPage/ContactUsForm"

const ContactFormSection = () => {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-3xl font-semibold text-richblack-5 md:text-4xl">
        Get in touch
      </h2>
      <p className="mt-3 text-richblack-300">
        We&apos;d love to hear from you. Please fill out this form.
      </p>
      <div className="mt-10 text-left">
        <ContactUsForm />
      </div>
    </div>
  )
}

export default ContactFormSection
