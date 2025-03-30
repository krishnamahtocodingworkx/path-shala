import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI";

import CourseTable from "./InstructorTable/CourseTable";
import { useEffect, useState } from "react";

import IconBtn from "../../common/IconBtn";
import { MdAddCircleOutline } from "react-icons/md";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);

  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token);
      if (result) {
        setCourses(result);
      }
    };
    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="bg-richblack-800 p-6 rounded-md shadow-lg border border-richblack-600">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-yellow-50">My Courses</h1>

        <IconBtn
          text="Add Course"
          onClick={() => navigate("/dashboard/add-course")}
          className="bg-yellow-50 text-richblack-900 px-4 py-2 rounded-md font-semibold hover:bg-yellow-100 transition duration-200"
        >
          <MdAddCircleOutline className="text-lg" />
        </IconBtn>
      </div>

      {/* Course Table */}
      {courses && <CourseTable courses={courses} setCourses={setCourses} />}
    </div>
  );
};

export default MyCourses;
