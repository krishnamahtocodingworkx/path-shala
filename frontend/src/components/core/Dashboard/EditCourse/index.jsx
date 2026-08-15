import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RenderSteps from "../AddCourse/RenderSteps"
import { getFullDetailsOfCourse } from "../../../../services/operations/courseDetailsAPI"
import { setCourse, setEditCourse } from '../../../../slices/courseSlice';
import { useEffect } from 'react';

import { useParams } from 'react-router-dom';
const EditCourse = () => {
    const dispatch = useDispatch();
    const { courseId } = useParams();
    const { course } = useSelector((state) => state.course)

    const [loading, setLoading] = useState(false);
    const { token } = useSelector((state) => state.auth);

    if(loading){
        return(
            <div>
                Loading...
            </div>
        )
    }

    // useEffect(()=>{
    //     setLoading(true);
    //     const populateCourseDetails = async()=>{
    //         const result = await getFullDetailsOfCourse(courseId,token);

    //         if(result?.courseDetails){
    //             dispatch(setEditCourse(true))

    //             dispatch(setCourse(result?.courseDetails));
    //         }
    //         setLoading(false);
    //     }
    //     populateCourseDetails();
    // },[])

    // useEffect(() => {
    //     ;(async () => {
    //       setLoading(true)
    //       const result = await getFullDetailsOfCourse(courseId, token)
    //       if (result?.courseDetails) {
    //         dispatch(setEditCourse(true))
    //         dispatch(setCourse(result?.courseDetails))
    //       }
    //       setLoading(false)
    //     })()
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    //   }, [])

    return (
        <div>
            <h1>Edit course</h1>
            <div>
                {
                    course?(<RenderSteps/>):(<p>Course not found Sorry it's not working yet</p>)
                }
            </div>
        </div>
    )
}

export default EditCourse