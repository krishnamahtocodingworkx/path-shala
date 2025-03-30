import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import IconBtn from "../../../../common/IconBtn";
import { MdAddCircleOutline } from "react-icons/md";
import { BiAddToQueue } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { BiRightArrow } from "react-icons/bi";
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../slices/courseSlice";
import { toast } from "react-hot-toast";
import {
  createSection,
  updateSection,
} from "../../../../../services/operations/courseDetailsAPI";
import NestedView from "./NestedView";

const CourseBuilderForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [editSectionName, setEditSectionName] = useState(null);
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("UPDATED");
  }, [course]);

  const onSubmit = async (data) => {
    setLoading(true);
    let result;

    if (editSectionName) {
      //we are editing the secgtion name
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        },
        token
      );
    } else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token
      );
    }

    //update values
    if (result) {
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }

    //loading false
    setLoading(false);
  };

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  };

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };

  const goToNext = () => {
    if (course?.courseContent?.length === 0) {
      toast.error("Please add atleast one Section");
      return;
    }
    if (
      course.courseContent.some((section) => section.subSection.length === 0)
    ) {
      toast.error("Please add atleast one lecture in each section");
      return;
    }
    //if everything is good
    dispatch(setStep(3));
  };

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit();
      return;
    }

    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  };

  return (
    <div className="text-white p-6 bg-richblack-800 rounded-lg shadow-lg">
      <p className="text-2xl font-semibold mb-4">Course Builder</p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="text-richblack-900 space-y-6"
      >
        {/* Section Name Input */}
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="sectionName"
            className="text-sm font-medium text-richblack-5"
          >
            Section Name <sup className="text-pink-200">*</sup>
          </label>
          <input
            id="sectionName"
            placeholder="Add section name"
            {...register("sectionName", { required: true })}
            className="w-full p-3 rounded-md border border-richblack-700 bg-richblack-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          {errors.sectionName && (
            <span className="text-xs text-pink-200">
              Section Name is required
            </span>
          )}
        </div>

        {/* Submit & Cancel Buttons */}
        <div className="mt-6 flex w-full gap-x-3 items-center">
          <IconBtn
            type="submit"
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
            customClasses="text-white bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-md"
          >
            <MdAddCircleOutline className="text-white" size={20} />
          </IconBtn>
          {editSectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm text-richblack-300 underline ml-4 hover:text-yellow-500 transition"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* Nested Course Content View */}
      {course?.courseContent?.length > 0 && (
        <div className="mt-8 border-t border-richblack-700 pt-6">
          <NestedView
            handleChangeEditSectionName={handleChangeEditSectionName}
          />
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-end gap-x-3 mt-10">
        <button
          onClick={goBack}
          className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition flex items-center"
        >
          Back
        </button>
        <IconBtn
          text="Next"
          onClick={goToNext}
          customClasses="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-md"
        >
          <BiRightArrow className="text-white" />
        </IconBtn>
      </div>
    </div>
  );
};

export default CourseBuilderForm;
