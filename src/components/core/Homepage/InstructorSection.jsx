import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png"
import HighlighText from './HighlightText'
import { FaArrowRight } from 'react-icons/fa6'

import CTAButton from "./Button"

const InstructorSection = () => {
    return (
        <div className='mt-[10%]'>
            <div className=" lg:flex lg:flex-row gap-12 items-center flex flex-col">

                {/* leftWata dabba */}
                <div className="w-[50%]">
                    <img src={Instructor} />
                </div>

                {/* right wala dabba */}
                <div className="flex flex-col gpa-10 w-[50%] gap-8">
                    <div className="text-4xl font-inter font-semibold
                    w-[50%]">

                        Become an<HighlighText text={"Instructor"} />
                    </div>
                    <p className="font-medium text-[16px] w-[80%] text-richblack-300"> Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>

                    <div className='w-fit'>
                    <CTAButton active={true} linkto={"/signup"}>
                        <div className='flex items-center text-center gap-4 font-semibold'>
                            Start Learning Today
                            <FaArrowRight/>
                        </div>
                    </CTAButton>
                    </div>


                </div>

            </div>
        </div>
    )
}

export default InstructorSection