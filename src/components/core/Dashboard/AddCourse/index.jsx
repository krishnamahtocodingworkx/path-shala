import RenderSteps from "./RenderSteps";
import React from "react";

export default function AddCourse() {
  return (
    <>
      <div className="text-white w-11/12 max-w-4xl mx-auto py-10">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-yellow-50">
            Upload Your Course
          </h1>
          <p className="text-richblack-300 mt-2">
            Follow the steps to create and upload your course efficiently.
          </p>
        </div>

        {/* Stepper Component */}
        <div className="mb-10">
          <RenderSteps />
        </div>

        {/* Course Upload Tips */}
        <div className="bg-richblack-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-yellow-50 mb-3">
            Course Upload Guidelines
          </h2>
          <p className="text-richblack-300">
            Ensure your course meets the following quality standards before
            submission:
          </p>

          <ul className="mt-4 space-y-3 text-richblack-200 list-disc pl-5">
            <li>
              📌{" "}
              <span className="font-semibold">Clear & Structured Content:</span>{" "}
              Organize your lessons into sections and provide a well-defined
              learning path.
            </li>
            <li>
              🎤{" "}
              <span className="font-semibold">High-Quality Audio & Video:</span>{" "}
              Ensure good resolution (1080p) and clear audio without background
              noise.
            </li>
            <li>
              📜{" "}
              <span className="font-semibold">Provide Course Materials:</span>{" "}
              Upload relevant PDFs, slides, or additional resources to support
              learners.
            </li>
            <li>
              ✅{" "}
              <span className="font-semibold">
                Add a Detailed Course Description:
              </span>{" "}
              A well-written description helps students understand the course
              content and learning outcomes.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
