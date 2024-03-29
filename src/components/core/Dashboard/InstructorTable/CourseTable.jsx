
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RiDeleteBin6Line } from "react-icons/ri"

import { useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

import { COURSE_STATUS } from "../../../../utils/constants"
import { useNavigate } from 'react-router-dom';
import {
    deleteCourse,
    fetchInstructorCourses,
} from "../../../../services/operations/courseDetailsAPI"


import courseImg from "../../../../assets/Images/aboutus1.webp"

import ConfirmationModal from "../../../common/ConfirmationModal"
import { formatDate } from '../../../../services/formatDate';

const CourseTable = ({ courses, setCourses }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { token } = useSelector((state) => state.auth);

    const [loading, setLoading] = useState(false);

    const [confirmationMoadal, setConfirmationMoadal] = useState(false);


    const handleCourseDelete = async (courseId) => {
        setLoading(true)
        await deleteCourse({ courseId: courseId }, token)
        const result = await fetchInstructorCourses(token)
        if (result) {
            setCourses(result)
        }
        setConfirmationMoadal(null)
        setLoading(false)
    }
    return (
        <div className="w-11/12 max-w-maxContent mx-auto">
            <Table
                className='w-full text-center'
            >
                <Thead>
                    <Tr
                        className="flex flex-row justify-between   items-center"

                    >
                    
                        
                        <Th>Courses</Th>
                        <Th className="w-[150px] flex justify-end">Duration</Th>
                        <Th className="w-[400px] flex justify-end">Price </Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>

                <Tbody>
                    {
                        courses.length === 0 ? (
                            <Tr>
                                <Td>No courses found</Td>
                            </Tr>
                        ) : (
                            courses.map((course) => (
                                <Tr
                                    key={course._id}
                                    className="flex flex-row justify-between  gap-8 items-center text-center"
                                >
                                    <Td
                                        className="flex flex-co gap-5"
                                    >
                                        {
                                            console.log("coming")
                                        }
                                        <img
                                            src={course?.thumbnail}
                                            className="h-[150px] w-[250px] rounded-lg object-cover border-richblack-800"
                                            alt="course thumbnail"
                                        />

                                        <div className="flex flex-col gap-2 items-center justify-center w-[300px]">
                                            <p>{course.courseName}</p>
                                            <p>{course.courseDescription}</p>

                                            <p>Created:{formatDate(course.createdAt)}</p>
                                            {
                                                course.status === COURSE_STATUS.DRAFT ? (
                                                    <p>Drafted</p>
                                                ) : (
                                                    <p>Published</p>

                                                )
                                            }

                                        </div>
                                    </Td>

                                    <Td>2:00</Td>

                                    <Td>
                                        Rs.{course.price}
                                    </Td>

                                    <Td>
                                        <button
                                            disabled={loading}
                                            onClick={() => {
                                                navigate(`/dashboard/edit-course/${course._id}`)
                                            }}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            disabled={loading}
                                            onClick={() => {
                                                setConfirmationMoadal({
                                                    text1: "Do you want to delete this course?",
                                                    text2:
                                                        "All the data related to this course will be deleted",
                                                    btn1Text: !loading ? "Delete" : "Loading...  ",
                                                    btn2Text: "Cancel",
                                                    btn1Handler: !loading
                                                        ? () => handleCourseDelete(course._id)
                                                        : () => { },
                                                    btn2Handler: !loading
                                                        ? () => setConfirmationMoadal(null)
                                                        : () => { },
                                                })
                                            }}
                                            title="Delete"
                                            className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                                        >
                                            <RiDeleteBin6Line size={20} />
                                        </button>
                                    </Td>

                                </Tr>
                            ))
                        )
                    }
                </Tbody>

            </Table>

            {confirmationMoadal && <ConfirmationModal modalData={confirmationMoadal} />}
        </div>
    )
}

export default CourseTable