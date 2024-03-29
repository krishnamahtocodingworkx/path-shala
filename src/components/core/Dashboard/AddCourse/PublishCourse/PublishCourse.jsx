import React from 'react';
import {useForm} from 'react-hook-form'
import { useSelector,useDispatch } from 'react-redux';

import {useState,useEffect} from 'react'
import IconBtn from "../../../../common/IconBtn"
import { resetCourseState, setStep } from '../../../../../slices/courseSlice';
import { COURSE_STATUS } from "../../../../../utils/constants"

import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI';
import { useNavigate } from 'react-router-dom';

export default function PublishCourse(){

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
    } = useForm();

    const {course} = useSelector((state)=>state.course);
    const dispatch = useDispatch();
    const {token} = useSelector((state)=>state.auth)
    const navigate = useNavigate();

    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        if(course?.status === COURSE_STATUS.PUBLISHED){
            setValue("public",true);
        }
    },[])



    const handleCoursePublish =  async()=>{

        if(((course?.status === COURSE_STATUS.PUBLISHED) && (getValues("public") === true)) || 
        ((course.status === COURSE_STATUS.DRAFT) && (getValues("public") === false))){
            //no updation in form
            //no need to make api call
            goToCourses();
            return;
        }

        //if form is updated
        const formData = new FormData();
        formData.append("courseId",course._id);
        const courseStatus = getValues("public")?COURSE_STATUS.PUBLISHED:COURSE_STATUS.DRAFT

        formData.append("status",courseStatus);
        setLoading(true);
        const result = await editCourseDetails(formData,token);
        if(result){
            goToCourses();
        }
        setLoading(false);
    }

    const onSubmit = ()=>{
        handleCoursePublish();

    }

  
    
      const goToCourses = () => {
        dispatch(resetCourseState())
        navigate("/dashboard/my-courses")
      }

    const goBack = ()=>{

        dispatch(setStep(2))

    }
    return ( 
        <div className="rounded-md border-[10px] bg:richblack-800">

        <h1>Publish Course</h1>
        <form onSubmit={handleSubmit(onSubmit)}>

        <div>
            <label >
            <input
                type="checkbox"
                id="public"
                {...register("public")}
            />
            <span>Make this course publish</span>
            </label>

        </div>

        <div>
        <button  
            disabled={loading}
            type="button"
            onClick={goBack}
        >

        Back
        </button>
        <IconBtn disabled={loading} text="save changes"></IconBtn>
        </div>

        </form>


        </div>
    )
}