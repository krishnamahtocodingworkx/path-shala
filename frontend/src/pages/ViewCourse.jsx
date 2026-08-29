import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useParams } from "react-router-dom"

import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal"
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar"
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI"
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice"

export default function ViewCourse() {
  const { courseId } = useParams()
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [reviewModal, setReviewModal] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const courseData = await getFullDetailsOfCourse(courseId, token)
        dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent || []))
        dispatch(setEntireCourseData(courseData?.courseDetails || {}))
        dispatch(setCompletedLectures(courseData?.completedVideos || []))
        let lectures = 0
        courseData?.courseDetails?.courseContent?.forEach((sec) => {
          lectures += sec.subSection?.length || 0
        })
        dispatch(setTotalNoOfLectures(lectures))
      } catch (error) {
        console.log("Could not load course", error)
      } finally {
        setLoading(false)
      }
    })()
  }, [courseId, dispatch, token])

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-3.5rem)] flex-col bg-richblack-900 lg:flex-row">
        <div className="shimmer h-64 w-full lg:h-auto lg:w-[320px]" />
        <div className="flex-1 space-y-4 p-6">
          <div className="shimmer aspect-video w-full rounded-xl" />
          <div className="shimmer h-8 w-2/3 rounded" />
          <div className="shimmer h-4 w-full rounded" />
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="flex min-h-[calc(100vh-3.5rem)] flex-col bg-richblack-900 lg:flex-row">
        <VideoDetailsSidebar setReviewModal={setReviewModal} />
        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
          <div className="mx-auto w-11/12 max-w-5xl py-6">
            <Outlet />
          </div>
        </div>
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  )
}
