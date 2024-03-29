
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI';

import CourseTable from './InstructorTable/CourseTable';
import {useEffect,useState} from 'react'


import IconBtn from "../../common/IconBtn"


const MyCourses = ()=>{

    const [courses,setCourses] = useState([]);

    const navigate = useNavigate();

    const {token} = useSelector((state)=>state.auth);

    useEffect(() => {
        const fetchCourses = async () => {
          const result = await fetchInstructorCourses(token)
          if (result) {
            setCourses(result)
          }
        }
        fetchCourses()
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
    return(
        <div>
            <h1>My Courses</h1>
            <IconBtn
            text="Add courses"
            onClick={()=>navigate("/dashboard/add-course")}

            //todo:add icon
            >

            </IconBtn>

            {
                
                courses && <CourseTable courses={courses} setCourses = {setCourses}/>
            }
        </div>

    )
}

export default MyCourses;