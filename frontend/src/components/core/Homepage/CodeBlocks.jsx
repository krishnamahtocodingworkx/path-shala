import React from 'react'
import CTAButton from "./Button";
import HighlightText from "./HighlightText";
import { FaArrowRight } from "react-icons/fa6";
import { TypeAnimation } from 'react-type-animation';



const CodeBlocks = ({
  heading,
  position,
  content1,
  codingContent
}) => {
  return (
    <div className={`flex ${position} my-20 justify-between flex-col lg:gap-10 gap-10 
    lg:flex-row`}>
      {/* first section */}
      <div className="w-[100%] lg:w-[50%] flex flex-col gap-7 font-inter font-bold ">
        {heading}
        <p className="font-bold font-inter text-richblack-300">{content1}</p>
        <div className="flex flex-row gap-9">

          <CTAButton active={true} linkto={"/signup"}><div className="flex items-center gap-2">Try Yourself<FaArrowRight />
          </div></CTAButton>
          <CTAButton active={false} linkto={"/signup"}>Try it Yourself</CTAButton>
        </div>

      </div>

      {/* section2 */}
      <div className="flex flex-row gap-4 font-inter font-bold w-[100%] lg:w-[470px] ">
        <div className="w-[10%]">
          <p>0</p>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
        </div>

        <div className="w-[90%] flex flex-col">
          <TypeAnimation

            sequence={[codingContent, 1000, " "]}
            // speed={20}
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
  )
}

export default CodeBlocks