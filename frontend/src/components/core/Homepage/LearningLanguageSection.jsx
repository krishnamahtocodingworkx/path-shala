import React from "react"

import HighlightText from "./HighlightText"
import CTAButton from "./Button"
import know_your_progress from "../../../assets/Images/Know_your_progress.png"
import plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png"
import compare_with_others from "../../../assets/Images/Compare_with_others.png"

const LearningLanguageSection = () => {
  return (
    <div className="mb-8 mt-10 w-full">
      <div className="flex flex-col items-center gap-5">
        <h2 className="text-center text-3xl font-semibold md:text-4xl">
          Your Swiss Knife for
          <HighlightText text="learning any language" />
        </h2>
        <p className="mx-auto w-[90%] text-center text-base text-richblack-600 md:w-[70%]">
          Using spin making learning multiple languages easy. With 20+
          languages, realistic voice-over, progress tracking, custom schedule
          and more.
        </p>

        <div className="mt-6 flex flex-col items-center justify-center lg:flex-row">
          <img
            src={know_your_progress}
            alt="Know your progress"
            className="object-contain lg:-mr-32"
          />
          <img
            src={compare_with_others}
            alt="Compare with others"
            className="object-contain"
          />
          <img
            src={plan_your_lessons}
            alt="Plan your lessons"
            className="object-contain lg:-ml-32"
          />
        </div>

        <div className="mt-8 w-fit">
          <CTAButton active={true} linkto="/signup">
            Learn more
          </CTAButton>
        </div>
      </div>
    </div>
  )
}

export default LearningLanguageSection
