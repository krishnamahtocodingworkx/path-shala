import React from "react";
import RatingStars from "../../common/RatingStars";
import { Link } from "react-router-dom";
import GetAvgRating from "../../../utils/avgRating";
import { useState, useEffect } from "react";
const Course_Card = ({ course, Height }) => {
  const [avgRaviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(course.ratingAndReview);
    setAvgReviewCount(count);
  }, [course]);
  return (
    <div className="transition-transform duration-300 hover:scale-105">
      <Link to={`/courses/${course._id}`} className="block">
        <div className="flex flex-col gap-3 bg-richblack-800 p-4 rounded-xl shadow-lg">
          {/* Course Image */}
          <div className="relative w-full overflow-hidden rounded-xl">
            <img
              src={course?.thumbnail}
              alt="Course Thumbnail"
              className={`w-full rounded-xl object-cover ${Height}`}
            />
          </div>

          {/* Course Details */}
          <div className="flex flex-col gap-2 text-white">
            <p className="text-lg font-semibold">{course?.courseName}</p>

            <p className="text-sm text-richblack-200">
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>

            {/* Ratings & Reviews */}
            <div className="flex items-center gap-2">
              <span className="text-yellow-50 font-bold">
                {avgRaviewCount || 0}
              </span>
              <RatingStars Review_Count={avgRaviewCount} />
              <span className="text-richblack-200 text-sm">
                {course?.ratingAndReview?.length} Ratings
              </span>
            </div>

            {/* Price */}
            <p className="text-lg font-semibold text-yellow-50">
              ${course?.price}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Course_Card;
