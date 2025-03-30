import React from "react";
import { useSelector } from "react-redux";
import CourseInformationForm from "./CourseInformationForm/CourseInformationForm";

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
  ];
  return (
    <div className="flex flex-col items-center text-white w-full">
      {/* Steps Progress */}
      <div className="flex items-center justify-evenly w-10/12 relative">
        {steps.map((item, index) => (
          <div key={index} className="relative flex items-center">
            {/* Step Circle */}
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-lg
          ${
            step === item.id
              ? "bg-yellow-500 text-black"
              : "bg-richblack-800 text-richblack-300"
          } 
          ${
            step > item.id
              ? "border-2 border-yellow-500"
              : "border-2 border-gray-500"
          }`}
            >
              {step > item.id ? <FaCheck className="text-black" /> : item.id}
            </div>

            {/* Dashes between steps */}
            {index !== steps.length - 1 && (
              <div className="w-16 border-t-2 border-gray-500 mx-2"></div>
            )}
          </div>
        ))}
      </div>

      {/* Step Titles */}
      <div className="flex justify-between w-10/12 mt-4">
        {steps.map((item, index) => (
          <p key={index} className="text-center text-sm font-medium">
            {item.title}
          </p>
        ))}
      </div>

      {/* Form Components */}
      <div className="w-full mt-6">
        {step === 1 && <CourseInformationForm />}
        {step === 2 && <CourseBuilderForm />}
        {step === 3 && <PublishCourse />}
      </div>
    </div>
  );
};

export default RenderSteps;
