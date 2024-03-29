import React from 'react'
import RatingStars from "../../common/RatingStars"
import {Link} from "react-router-dom"
import GetAvgRating from "../../../utils/avgRating"
import {useState,useEffect} from 'react'
const Course_Card = ({course,Height}) => {

    const [avgRaviewCount,setAvgReviewCount] = useState(0);

    useEffect(()=>{
        const count = GetAvgRating(course.ratingAndReview);
        setAvgReviewCount(count);
    },[course]) 
  return (
    <div >
        <Link to={`/courses/${course._id}`}>
            <div className="flex flex-col justify-center">
                <div>
                    <img
                        src={course?.thumbnail}
                        alt="CourseThumbnail"
                        className={`${Height} w-full  rounded-xl object-cover `}
                    />
                </div>
                <div>
                    <p>{course?.courseName}</p>
                    <p>{course?.instructor?.firstName}{course?.instructor?.lastName}</p>
                    <div>
                        <span>{avgRaviewCount || 0}</span>
                        <RatingStars Review_Count={avgRaviewCount}

                        />
                        <span>{course?.ratingAndReview?.length}Rating</span>
                        <p>{course?.price}</p>
                    </div>
                    <p></p>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default Course_Card