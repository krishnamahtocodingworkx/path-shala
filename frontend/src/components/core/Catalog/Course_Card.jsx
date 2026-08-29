import React from "react"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

import RatingStars from "../../common/RatingStars"
import GetAvgRating from "../../../utils/avgRating"

const Course_Card = ({ course, Height }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0)

  useEffect(() => {
    const ratings = course?.ratingAndReviews || course?.ratingAndReview || []
    setAvgReviewCount(GetAvgRating(ratings))
  }, [course])

  if (!course?._id) return null

  const ratings = course?.ratingAndReviews || course?.ratingAndReview || []
  const instructorName = [course?.instructor?.firstName, course?.instructor?.lastName]
    .filter(Boolean)
    .join(" ")

  return (
    <Link to={`/courses/${course._id}`} className="block h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-xl border border-richblack-700 bg-richblack-800 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-yellow-50/40">
        <div className={`w-full overflow-hidden ${Height || "h-[200px]"}`}>
          <img
            src={course?.thumbnail}
            alt={course?.courseName || "Course thumbnail"}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col gap-2 p-4 text-white">
          <p className="max-h-14 overflow-hidden text-lg font-semibold">
            {course?.courseName}
          </p>
          <p className="text-sm text-richblack-300">
            {instructorName || "PathShala Instructor"}
          </p>

          <div className="mt-auto flex flex-wrap items-center gap-2">
            <span className="font-bold text-yellow-50">{avgReviewCount || 0}</span>
            <RatingStars Review_Count={avgReviewCount} Star_Size={18} />
            <span className="text-sm text-richblack-300">
              ({ratings.length} {ratings.length === 1 ? "rating" : "ratings"})
            </span>
          </div>

          <p className="text-lg font-semibold text-yellow-50">
            ₹ {course?.price ?? 0}
          </p>
        </div>
      </article>
    </Link>
  )
}

export default Course_Card
