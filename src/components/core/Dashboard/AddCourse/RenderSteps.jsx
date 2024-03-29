import React from 'react'
import { useSelector } from 'react-redux';
import CourseInformationForm from "./CourseInformationForm/CourseInformationForm"

import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";

import PublishCourse from "./PublishCourse/PublishCourse";

import { FaCheck } from "react-icons/fa";

const RenderSteps = () => {

    const { step } = useSelector((state) => state.course);

    const steps = [
        {
            id: 1,
            title: "Course Information",
        },
        {
            id: 2,
            title: "Course builder",
        },
        {
            id: 3,
            title: "Publish",
        },

    ]
    return (
        <div>


            <div className="flex flex-row justify-evenly">
                {
                    steps.map((item, index) => (
                        <div key={index} >
                            <div >
                                <div className={`${step === item.id ? "bg-yellow-900} text-yellow-50" :
                                    "border-richblack-800 text-richblack-300"} `}>

                                    {
                                        step > item.id ? (<FaCheck />) : (item.id)
                                    }

                                    {/* 
                                add code for dashes between the labels
                                item.id !== steps.length
                                 */}
                                </div>
                            </div>
                        </div>

                    ))}
            </div>


            <div>
                {
                    steps.map((item, index) => (
                        <div key={index}>

                      
                            <div >
                                <p>{item.title}</p>
                            </div>
                            </div>
                    ))
                }
            </div>

            {
                step === 1 && <CourseInformationForm />
            }
            {step === 2 && <CourseBuilderForm />}
            {step === 3 && <PublishCourse />}
        </div>
    )
}

export default RenderSteps