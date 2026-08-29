import React from "react"

import CTAButton from "../Homepage/Button"
import HighlightText from "../Homepage/HighlightText"

const LearningGridArray = [
  {
    order: -1,
    heading: "World-class learning for",
    highlightText: "anyone, anywhere",
    description:
      "PathShala partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum based on industry needs",
    description:
      "Save time and money. Our curriculum is easier to understand and aligned with what the industry actually needs.",
  },
  {
    order: 2,
    heading: "Our learning methods",
    description:
      "Learn by doing with projects, quizzes, and personalized feedback from instructors around the world.",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "Earn certificates that help you showcase your skills and stand out to employers.",
  },
  {
    order: 4,
    heading: "Auto-grading",
    description:
      "Get instant, useful feedback so you can improve faster with every assignment.",
  },
  {
    order: 5,
    heading: "Ready to work",
    description:
      "Build job-ready skills through practical courses designed for real-world roles.",
  },
]

const LearningGrid = () => {
  return (
    <div className="mb-16 grid grid-cols-1 lg:grid-cols-4">
      {LearningGridArray.map((card, index) => (
        <div
          key={index}
          className={`${index === 0 && "lg:col-span-2 lg:h-[294px]"} ${
            card.order < 0
              ? "bg-transparent"
              : card.order % 2 === 1
              ? "bg-richblack-700"
              : "bg-richblack-800"
          } ${card.order === 3 && "lg:col-start-2"} p-8`}
        >
          {card.order < 0 ? (
            <div className="flex h-full flex-col gap-5 lg:w-[90%]">
              <h2 className="text-3xl font-semibold md:text-4xl">
                {card.heading}
                <HighlightText text={card.highlightText} />
              </h2>
              <p className="text-base font-medium text-richblack-300">
                {card.description}
              </p>
              <div className="w-fit">
                <CTAButton active={true} linkto={card.BtnLink}>
                  {card.BtnText}
                </CTAButton>
              </div>
            </div>
          ) : (
            <div className="flex h-full min-h-[220px] flex-col gap-4 lg:min-h-[294px]">
              <h3 className="text-lg font-semibold text-richblack-5">
                {card.heading}
              </h3>
              <p className="text-sm leading-relaxed text-richblack-300">
                {card.description}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default LearningGrid
