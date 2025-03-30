import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";

import { useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

import { COURSE_STATUS } from "../../../../utils/constants";
import { useNavigate } from "react-router-dom";
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../services/operations/courseDetailsAPI";

import courseImg from "../../../../assets/Images/aboutus1.webp";

import ConfirmationModal from "../../../common/ConfirmationModal";
import { formatDate } from "../../../../services/formatDate";

const CourseTable = ({ courses, setCourses }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);

  const [confirmationMoadal, setConfirmationMoadal] = useState(false);

  const handleCourseDelete = async (courseId) => {
    setLoading(true);
    await deleteCourse({ courseId: courseId }, token);
    const result = await fetchInstructorCourses(token);
    if (result) {
      setCourses(result);
    }
    setConfirmationMoadal(null);
    setLoading(false);
  };
  return (
    <div className="w-11/12 max-w-maxContent mx-auto p-6 bg-richblack-800 rounded-lg shadow-md">
      <Table className="w-full text-center text-richblack-50 border border-richblack-600 rounded-lg">
        <Thead className="bg-richblack-700">
          <Tr className="flex justify-between items-center p-3">
            <Th className="text-left">Courses</Th>
            <Th className="w-[150px] text-right">Duration</Th>
            <Th className="w-[400px] text-right">Price</Th>
            <Th className="text-right">Actions</Th>
          </Tr>
        </Thead>

        <Tbody>
          {courses.length === 0 ? (
            <Tr>
              <Td className="py-4 text-gray-400">No courses found</Td>
            </Tr>
          ) : (
            courses.map((course) => (
              <Tr
                key={course._id}
                className="flex justify-between items-center gap-8 p-4 border-b border-richblack-600"
              >
                {/* Course Info */}
                <Td className="flex gap-5 items-center">
                  <img
                    src={course?.thumbnail}
                    className="h-[100px] w-[180px] rounded-lg object-cover border border-richblack-700"
                    alt="course thumbnail"
                  />
                  <div className="flex flex-col gap-2">
                    <p className="text-lg font-semibold">{course.courseName}</p>
                    <p className="text-sm text-gray-400">
                      {course.courseDescription}
                    </p>
                    <p className="text-sm text-gray-400">
                      Created: {formatDate(course.createdAt)}
                    </p>
                    <p
                      className={`text-sm font-medium ${
                        course.status === COURSE_STATUS.DRAFT
                          ? "text-yellow-500"
                          : "text-green-500"
                      }`}
                    >
                      {course.status === COURSE_STATUS.DRAFT
                        ? "Drafted"
                        : "Published"}
                    </p>
                  </div>
                </Td>

                {/* Duration */}
                <Td className="text-right text-gray-300">2:00</Td>

                {/* Price */}
                <Td className="text-right text-lg font-semibold text-yellow-500">
                  Rs. {course.price}
                </Td>

                {/* Actions */}
                <Td className="flex gap-3 items-center text-right">
                  <button
                    disabled={loading}
                    onClick={() =>
                      navigate(`/dashboard/edit-course/${course._id}`)
                    }
                    className="px-3 py-1 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200"
                  >
                    Edit
                  </button>

                  <button
                    disabled={loading}
                    onClick={() =>
                      setConfirmationMoadal({
                        text1: "Do you want to delete this course?",
                        text2:
                          "All data related to this course will be deleted.",
                        btn1Text: !loading ? "Delete" : "Loading...",
                        btn2Text: "Cancel",
                        btn1Handler: !loading
                          ? () => handleCourseDelete(course._id)
                          : () => {},
                        btn2Handler: !loading
                          ? () => setConfirmationMoadal(null)
                          : () => {},
                      })
                    }
                    className="px-3 py-1 text-red-500 rounded-md hover:text-red-700 transition duration-200"
                    title="Delete"
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>

      {/* Confirmation Modal */}
      {confirmationMoadal && (
        <ConfirmationModal modalData={confirmationMoadal} />
      )}
    </div>
  );
};

export default CourseTable;
