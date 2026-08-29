import React, { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { BsGlobe } from "react-icons/bs"
import { HiOutlineHome } from "react-icons/hi"
import { IoIosArrowDown } from "react-icons/io"
import { MdOutlineArrowForwardIos, MdOutlinePlayLesson } from "react-icons/md"
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineCheckCircle } from "react-icons/hi"

import ConfirmationModal from "../components/common/ConfirmationModal"
import Footer from "../components/common/Footer"
import RatingStars from "../components/common/RatingStars"
import ReviewSlider from "../components/common/ReviewSlider"
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard"
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI"
import { BuyCourse } from "../services/operations/studentFeaturesAPI"
import { formatDate } from "../services/formatDate"
import GetAvgRating from "../utils/avgRating"
import { toCatalogSlug } from "../utils/catalogSlug"
import Error from "./Error"

const CourseDetails = () => {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { courseId } = useParams()

  const [confirmationModal, setConfirmationModal] = useState(null)
  const [courseData, setCourseData] = useState(null)
  const [pageLoading, setPageLoading] = useState(true)
  const [avgReviewCount, setAvgReviewCount] = useState(0)
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0)
  const [isActive, setIsActive] = useState([])

  useEffect(() => {
    const getCourseFullDetails = async () => {
      setPageLoading(true)
      try {
        const result = await fetchCourseDetails(courseId)
        setCourseData(result)
      } catch (error) {
        console.log("Could not fetch course details")
        setCourseData({ success: false })
      } finally {
        setPageLoading(false)
      }
    }
    getCourseFullDetails()
  }, [courseId])

  useEffect(() => {
    const reviews =
      courseData?.data?.courseDetails?.ratingAndReviews ||
      courseData?.data?.courseDetails?.ratingAndReview ||
      []
    setAvgReviewCount(GetAvgRating(reviews))
  }, [courseData])

  useEffect(() => {
    let lectures = 0
    courseData?.data?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec.subSection?.length || 0
    })
    setTotalNoOfLectures(lectures)
  }, [courseData])

  const handleBuyCourse = () => {
    if (token) {
      BuyCourse(token, [courseId], user, navigate, dispatch)
      return
    }

    setConfirmationModal({
      text1: "You are not logged in",
      text2: "Please login to purchase this course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  const handleActive = (id) => {
    setIsActive((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const courseDetails = courseData?.data?.courseDetails
  const learningPoints = useMemo(() => {
    const text = courseDetails?.whatYouWillLearn || ""
    const points = text
      .split(/\n|•/)
      .map((item) => item.replace(/^[-*]\s*/, "").trim())
      .filter(Boolean)
    return points
  }, [courseDetails])

  if (pageLoading) {
    return (
      <div className="flex min-h-[calc(100vh-3.5rem)] flex-col bg-richblack-900">
        <CourseDetailsShimmer />
        <Footer />
      </div>
    )
  }

  if (!courseData?.success || !courseDetails) {
    return <Error />
  }

  const {
    courseName,
    courseDescription,
    ratingAndReviews = [],
    instructor,
    studentsEnrolled = [],
    createdAt,
    courseContent = [],
    category,
  } = courseDetails

  const instructorName = [instructor?.firstName, instructor?.lastName]
    .filter(Boolean)
    .join(" ")

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col bg-richblack-900 text-white">
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-[28rem] bg-richblack-800 md:h-[24rem]" />

        <div className="relative mx-auto w-11/12 max-w-maxContent py-8 md:py-10">
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-richblack-300">
            <Link
              to="/"
              className="inline-flex items-center gap-1 transition hover:text-yellow-50"
            >
              <HiOutlineHome className="text-base" />
              Home
            </Link>
            {category?.name && (
              <>
                <MdOutlineArrowForwardIos className="text-xs text-richblack-500" />
                <Link
                  to={`/catalog/${toCatalogSlug(category.name)}`}
                  className="transition hover:text-yellow-50"
                >
                  {category.name}
                </Link>
              </>
            )}
            <MdOutlineArrowForwardIos className="text-xs text-richblack-500" />
            <span className="max-w-[220px] truncate text-yellow-50 sm:max-w-md">
              {courseName}
            </span>
          </nav>

          <div className="flex flex-col items-start gap-8 lg:flex-row">
            <div className="min-w-0 flex-1 space-y-10">
              <div className="space-y-4 pb-4">
                <h1 className="text-3xl font-bold leading-tight text-richblack-5 md:text-4xl">
                  {courseName}
                </h1>
                <p className="max-w-3xl text-base leading-relaxed text-richblack-200 md:text-lg">
                  {courseDescription}
                </p>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-richblack-200 md:text-base">
                  <span className="font-semibold text-yellow-50">
                    {avgReviewCount || 0}
                  </span>
                  <RatingStars Review_Count={avgReviewCount} Star_Size={20} />
                  <span>({ratingAndReviews.length} reviews)</span>
                  <span className="hidden text-richblack-500 sm:inline">•</span>
                  <span>{studentsEnrolled.length} students enrolled</span>
                </div>

                <p className="text-base text-richblack-25">
                  Created by{" "}
                  <span className="font-medium text-yellow-50">
                    {instructorName}
                  </span>
                </p>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-richblack-300">
                  <span className="inline-flex items-center gap-1">
                    <BiInfoCircle />
                    Created {formatDate(createdAt)}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <BsGlobe />
                    English
                  </span>
                </div>
              </div>

              <section className="rounded-xl border border-richblack-700 bg-richblack-900 p-5 sm:p-6">
                <h2 className="text-2xl font-semibold text-richblack-5">
                  What you will learn
                </h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {learningPoints.length ? (
                    learningPoints.map((point, index) => (
                      <p
                        key={index}
                        className="flex items-start gap-2 text-richblack-100"
                      >
                        <HiOutlineCheckCircle className="mt-1 shrink-0 text-yellow-50" />
                        <span>{point}</span>
                      </p>
                    ))
                  ) : (
                    <p className="text-richblack-200">
                      Learning outcomes will be added soon.
                    </p>
                  )}
                </div>
              </section>

              <section>
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-richblack-5">
                      Course content
                    </h2>
                    <p className="mt-2 text-sm text-richblack-300">
                      {courseContent.length} section
                      {courseContent.length === 1 ? "" : "s"} • {totalNoOfLectures}{" "}
                      lecture{totalNoOfLectures === 1 ? "" : "s"} •{" "}
                      {courseData?.data?.totalDuration || "0s"} total length
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setIsActive(
                        isActive.length === courseContent.length
                          ? []
                          : courseContent.map((section) => section._id)
                      )
                    }
                    className="self-start text-sm font-semibold text-yellow-50 hover:text-yellow-100"
                  >
                    {isActive.length === courseContent.length
                      ? "Collapse all sections"
                      : "Expand all sections"}
                  </button>
                </div>

                <div className="overflow-hidden rounded-xl border border-richblack-700">
                  {courseContent.length ? (
                    courseContent.map((section) => (
                      <div
                        key={section._id}
                        className="border-b border-richblack-700 last:border-b-0"
                      >
                        <button
                          type="button"
                          onClick={() => handleActive(section._id)}
                          className="flex w-full items-center justify-between gap-4 bg-richblack-800 px-4 py-4 text-left"
                        >
                          <span className="inline-flex items-center gap-2 font-medium text-richblack-5">
                            <IoIosArrowDown
                              className={`shrink-0 transition-transform ${
                                isActive.includes(section._id) ? "rotate-180" : ""
                              }`}
                            />
                            {section.sectionName}
                          </span>
                          <span className="shrink-0 text-sm text-yellow-50">
                            {section.subSection?.length || 0} lecture
                            {(section.subSection?.length || 0) === 1 ? "" : "s"}
                          </span>
                        </button>

                        {isActive.includes(section._id) && (
                          <div className="space-y-1 bg-richblack-900 px-4 py-3">
                            {section.subSection?.map((lecture) => (
                              <div
                                key={lecture._id}
                                className="flex items-start justify-between gap-4 py-2 text-sm text-richblack-200"
                              >
                                <span className="inline-flex items-start gap-2">
                                  <MdOutlinePlayLesson className="mt-0.5 shrink-0" />
                                  {lecture.title}
                                </span>
                                <span className="shrink-0 text-richblack-400">
                                  {lecture.timeDuration
                                    ? `${lecture.timeDuration}s`
                                    : ""}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="px-4 py-8 text-center text-richblack-300">
                      No lectures have been added yet.
                    </p>
                  )}
                </div>
              </section>

              <section className="rounded-xl border border-richblack-700 p-5 sm:p-6">
                <h2 className="text-2xl font-semibold text-richblack-5">Author</h2>
                <div className="mt-5 flex items-center gap-4">
                  <img
                    src={
                      instructor?.image ||
                      `https://api.dicebear.com/5.x/initials/svg?seed=${instructorName}`
                    }
                    alt={instructorName}
                    className="h-14 w-14 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-lg font-medium text-richblack-5">
                      {instructorName}
                    </p>
                    <p className="text-sm text-richblack-300">
                      {instructor?.additionalDetails?.about ||
                        "Instructor at PathShala"}
                    </p>
                  </div>
                </div>
              </section>

              <section className="pb-6">
                <h2 className="mb-6 text-center text-2xl font-semibold text-richblack-5 md:text-3xl">
                  Reviews from other learners
                </h2>
                <ReviewSlider />
              </section>
            </div>

            <aside className="w-full shrink-0 lg:w-[380px]">
              <div className="lg:sticky lg:top-20">
                <CourseDetailsCard
                  course={courseDetails}
                  setConfirmationModal={setConfirmationModal}
                  handleBuyCourse={handleBuyCourse}
                />
              </div>
            </aside>
          </div>
        </div>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
      <Footer />
    </div>
  )
}

const CourseDetailsShimmer = () => (
  <div className="flex-1">
    <div className="bg-richblack-800">
      <div className="mx-auto w-11/12 max-w-maxContent py-10">
        <div className="shimmer mb-6 h-4 w-48 rounded" />
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex-1 space-y-4">
            <div className="shimmer h-10 w-4/5 rounded" />
            <div className="shimmer h-4 w-full rounded" />
            <div className="shimmer h-4 w-2/3 rounded" />
            <div className="shimmer h-5 w-56 rounded" />
          </div>
          <div className="shimmer h-96 w-full rounded-xl lg:w-[380px]" />
        </div>
      </div>
    </div>
    <div className="mx-auto w-11/12 max-w-maxContent space-y-6 py-10">
      <div className="shimmer h-40 w-full rounded-xl lg:w-[calc(100%-412px)]" />
      <div className="shimmer h-64 w-full rounded-xl lg:w-[calc(100%-412px)]" />
    </div>
  </div>
)

export default CourseDetails
