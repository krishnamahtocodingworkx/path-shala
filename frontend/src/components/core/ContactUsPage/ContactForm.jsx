import React from "react"

import ContactUsForm from "./ContactUsForm"

const ContactForm = () => {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-richblack-600 p-6 text-richblack-300 lg:p-10">
      <h2 className="text-2xl font-semibold leading-snug text-richblack-5 md:text-4xl">
        Got an idea? We&apos;ve got the skills. Let&apos;s team up
      </h2>
      <p className="text-richblack-300">
        Tell us more about yourself and what you&apos;ve got in mind.
      </p>
      <div className="mt-7">
        <ContactUsForm />
      </div>
    </div>
  )
}

export default ContactForm
