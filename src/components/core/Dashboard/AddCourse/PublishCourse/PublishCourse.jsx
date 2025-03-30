import React from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

import { useState, useEffect } from "react";
import IconBtn from "../../../../common/IconBtn";
import { resetCourseState, setStep } from "../../../../../slices/courseSlice";
import { COURSE_STATUS } from "../../../../../utils/constants";

import { editCourseDetails } from "../../../../../services/operations/courseDetailsAPI";
import { useNavigate } from "react-router-dom";

export default function PublishCourse() {
  const { register, handleSubmit, setValue, getValues } = useForm();

  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true);
    }
  }, []);

  const handleCoursePublish = async () => {
    if (
      (course?.status === COURSE_STATUS.PUBLISHED &&
        getValues("public") === true) ||
      (course.status === COURSE_STATUS.DRAFT && getValues("public") === false)
    ) {
      //no updation in form
      //no need to make api call
      goToCourses();
      return;
    }

    //if form is updated
    const formData = new FormData();
    formData.append("courseId", course._id);
    const courseStatus = getValues("public")
      ? COURSE_STATUS.PUBLISHED
      : COURSE_STATUS.DRAFT;

    formData.append("status", courseStatus);
    setLoading(true);
    const result = await editCourseDetails(formData, token);
    if (result) {
      goToCourses();
    }
    setLoading(false);
  };

  const onSubmit = () => {
    handleCoursePublish();
  };

  const goToCourses = () => {
    dispatch(resetCourseState());
    navigate("/dashboard/my-courses");
  };

  const goBack = () => {
    dispatch(setStep(2));
  };
  return (
    <div className="rounded-md border-2 border-richblack-600 bg-richblack-800 p-6 shadow-lg">
      <h1 className="text-xl font-semibold text-yellow-50 mb-4">
        Publish Course
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Checkbox */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="public"
            {...register("public")}
            className="h-5 w-5 cursor-pointer accent-yellow-50"
          />
          <label htmlFor="public" className="text-richblack-50 cursor-pointer">
            Make this course public
          </label>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-4 mt-6">
          <button
            disabled={loading}
            type="button"
            onClick={goBack}
            className="bg-transparent text-yellow-50 font-semibold px-4 py-2 rounded-md border border-yellow-50 hover:bg-yellow-50 hover:text-richblack-900 transition duration-200"
          >
            Back
          </button>
          <IconBtn disabled={loading} text="Save Changes" />
        </div>
      </form>
    </div>
  );
}
