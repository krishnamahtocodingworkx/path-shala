import React from "react"

import Footer from "../components/common/Footer"
import ReviewSlider from "../components/common/ReviewSlider"
import ContactDetails from "../components/core/ContactUsPage/ContactDetails"
import ContactForm from "../components/core/ContactUsPage/ContactForm"

const Contact = () => {
  return (
    <div className="bg-richblack-900 text-white">
      <section className="bg-richblack-800">
        <div className="mx-auto w-11/12 max-w-maxContent py-12 md:py-16">
          <p className="text-sm font-medium text-yellow-50">Contact us</p>
          <h1 className="mt-2 text-3xl font-semibold md:text-5xl">
            We&apos;d love to hear from you
          </h1>
          <p className="mt-4 max-w-2xl text-base text-richblack-300 md:text-lg">
            Questions, feedback, or partnership ideas — send us a message and
            our team will get back to you.
          </p>
        </div>
      </section>

      <section className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 py-12 lg:flex-row lg:py-16">
        <div className="lg:w-[38%]">
          <ContactDetails />
        </div>
        <div className="lg:w-[58%]">
          <ContactForm />
        </div>
      </section>

      <section className="mx-auto w-11/12 max-w-maxContent pb-16">
        <h2 className="mb-8 text-center text-3xl font-semibold md:text-4xl">
          Reviews from other learners
        </h2>
        <ReviewSlider />
      </section>

      <Footer />
    </div>
  )
}

export default Contact
