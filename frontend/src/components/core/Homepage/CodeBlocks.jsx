import React from "react"
import { FaArrowRight } from "react-icons/fa6"
import { TypeAnimation } from "react-type-animation"

import CTAButton from "./Button"

const CodeBlocks = ({ heading, position, content1, codingContent }) => {
  return (
    <div
      className={`my-16 flex flex-col items-center justify-between gap-10 lg:gap-12 ${position}`}
    >
      <div className="flex w-full flex-col gap-6 lg:w-[50%]">
        {heading}
        <p className="text-base font-medium leading-relaxed text-richblack-300">
          {content1}
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <CTAButton active={true} linkto="/signup">
            <div className="flex items-center gap-2">
              Try it yourself
              <FaArrowRight />
            </div>
          </CTAButton>
          <CTAButton active={false} linkto="/login">
            Learn more
          </CTAButton>
        </div>
      </div>

      <div className="code-border relative w-full rounded-lg bg-richblack-800 p-[2px] lg:w-[470px]">
        <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-blue-200 opacity-20 blur-2xl" />
        <div className="relative overflow-hidden rounded-lg bg-[#0E1A2B] p-4 font-mono text-sm leading-6 text-richblack-50">
          <div className="mb-3 flex gap-2">
            <span className="h-3 w-3 rounded-full bg-pink-200" />
            <span className="h-3 w-3 rounded-full bg-yellow-50" />
            <span className="h-3 w-3 rounded-full bg-caribbeangreen-100" />
          </div>
          <div className="flex gap-4">
            <div className="select-none text-center text-richblack-400">
              {Array.from({ length: 11 }, (_, i) => (
                <p key={i}>{i + 1}</p>
              ))}
            </div>
            <TypeAnimation
              sequence={[codingContent, 1200, " "]}
              cursor={true}
              omitDeletionAnimation={true}
              repeat={Infinity}
              style={{
                whiteSpace: "pre-line",
                display: "block",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CodeBlocks
