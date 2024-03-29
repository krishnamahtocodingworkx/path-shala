import React from 'react'

import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"

import timelineImage from "../../../assets/Images/TimelineImage.png"
const timeline = [
    {
        Logo: Logo1,
        heading: "Leadership",
        description: "Fully commited to the success Company",
    },
    {
        Logo: Logo2,
        heading: "Leadership",
        description: "Fully commited to the success Company",
    },
    {
        Logo: Logo3,
        heading: "Leadership",
        description: "Fully commited to the success Company",
    },
    {
        Logo: Logo4,
        heading: "Leadership",
        description: "Fully commited to the success Company",
    }
]

const TimelineSection = () => {
    return (
        <div>
            <div className="lg:flex lg:flex-row lg:gap-12 lg:items-center flex flex-col items-center gap-5">
                <div className="flex flex-col w-[45%] gap-5">

                    {
                        timeline.map((item, index) => (

                            <div className="flex flex-row gap-5" key={index}>

                                <div className="w-[50px] h-[50px] bg-white flex items-center">
                                    <img src={item.Logo} />
                                </div>
                                <div>
                                    <h2 className="font-inter font-bold text-[18px]">{item.heading}</h2>
                                    <p className="text-base">{item.description}</p>
                                </div>

                            </div>

                        ))
                    }

                </div>

                <div className="relative shadow-blue-200">
                    <img src={timelineImage} alt="time line image"
                    />

                    <div className="absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-5 
                        left-[11%] translate-y-[-50%]">
                    {/* 10year wala dabba */}
                        <div className="flex flex-row items-center gap-5 border-r border-caribbeangreen-25 px-7">
                            <p>10</p>
                            <p className="text-caribbeangreen-25 text-sm" >Yeas of Experiece</p>
                        </div>
                        {/* 250 years wala dabba */}
                        <div className="flex flex-row items-center gap-5 px-7">
                            <p>250</p>
                            <p className="text-caribbeangreen-25 text-sm" >Types of Courses</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default TimelineSection