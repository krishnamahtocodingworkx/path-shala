import React from "react"
import { FaArrowRight } from "react-icons/fa6"

import Instructor from "../../../assets/Images/Instructor.png"
import HighlightText from "./HighlightText"
import CTAButton from "./Button"

const InstructorSection = () => {
  return (
    <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-16">
      <div className="lg:w-1/2">
        <img
          src={Instructor}
          alt="Become an instructor"
          className="w-full rounded-lg shadow-[-20px_-20px_0_0_#fff]"
        />
      </div>

      <div className="flex flex-col gap-8 lg:w-1/2">
        <h2 className="text-3xl font-semibold md:w-1/2 md:text-4xl">
          Become an
          <HighlightText text="Instructor" />
        </h2>
        <p className="w-[90%] text-base font-medium leading-relaxed text-richblack-300">
          Instructors from around the world teach millions of students on
          PathShala. We provide the tools and skills to teach what you love.
        </p>
        <div className="w-fit">
          <CTAButton active={true} linkto="/signup">
            <div className="flex items-center gap-3 font-semibold">
              Start teaching today
              <FaArrowRight />
            </div>
          </CTAButton>
        </div>
      </div>
    </div>
  )
}

export default InstructorSection
