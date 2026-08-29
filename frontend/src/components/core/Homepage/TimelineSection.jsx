import React from "react"

import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelineImage from "../../../assets/Images/TimelineImage.png"

const timeline = [
  {
    Logo: Logo1,
    heading: "Leadership",
    description: "Fully committed to the success of our company",
  },
  {
    Logo: Logo2,
    heading: "Responsibility",
    description: "Students will always be our top priority",
  },
  {
    Logo: Logo3,
    heading: "Flexibility",
    description: "The ability to switch is an important skill",
  },
  {
    Logo: Logo4,
    heading: "Solve the problem",
    description: "Code your way to a solution",
  },
]

const TimelineSection = () => {
  return (
    <div className="flex w-full flex-col items-center gap-12 lg:flex-row lg:gap-16">
      <div className="flex w-full flex-col gap-6 lg:w-[45%]">
        {timeline.map((item, index) => (
          <div className="flex items-start gap-4" key={index}>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white shadow-md">
              <img src={item.Logo} alt="" className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-richblack-800">
                {item.heading}
              </h3>
              <p className="text-sm text-richblack-500">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="relative w-full lg:w-[55%]">
        <div className="absolute left-8 right-8 top-8 h-full rounded-lg bg-blue-200 opacity-40 blur-2xl" />
        <img
          src={timelineImage}
          alt="PathShala learning timeline"
          className="relative z-[1] w-full rounded-lg object-cover shadow-lg"
        />
        <div className="absolute bottom-0 left-1/2 z-[2] flex w-[90%] -translate-x-1/2 translate-y-1/2 flex-col gap-4 rounded-lg bg-caribbeangreen-700 py-4 text-white sm:w-auto sm:flex-row sm:gap-0">
          <div className="flex items-center gap-4 border-caribbeangreen-300 px-8 sm:border-r">
            <p className="text-3xl font-bold">10</p>
            <p className="text-sm uppercase leading-5 text-caribbeangreen-50">
              Years of
              <br />
              experience
            </p>
          </div>
          <div className="flex items-center gap-4 px-8">
            <p className="text-3xl font-bold">250</p>
            <p className="text-sm uppercase leading-5 text-caribbeangreen-50">
              Types of
              <br />
              courses
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimelineSection
