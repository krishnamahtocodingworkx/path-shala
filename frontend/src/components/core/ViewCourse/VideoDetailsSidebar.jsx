import { useEffect, useState } from "react"
import { BsChevronDown } from "react-icons/bs"
import { IoIosArrowBack } from "react-icons/io"
import { useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"

export default function VideoDetailsSidebar({ setReviewModal }) {
  const [activeStatus, setActiveStatus] = useState("")
  const [videoBarActive, setVideoBarActive] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const { sectionId, subSectionId } = useParams()
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse)

  useEffect(() => {
    if (!courseSectionData.length) return
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )
    const currentSubSectionIndx = courseSectionData?.[
      currentSectionIndx
    ]?.subSection?.findIndex((data) => data._id === subSectionId)
    const activeSubSectionId =
      courseSectionData[currentSectionIndx]?.subSection?.[currentSubSectionIndx]
        ?._id
    setActiveStatus(courseSectionData?.[currentSectionIndx]?._id)
    setVideoBarActive(activeSubSectionId)
  }, [courseSectionData, courseEntireData, location.pathname, sectionId, subSectionId])

  const completedCount = completedLectures?.length || 0
  const progress = totalNoOfLectures
    ? Math.round((completedCount / totalNoOfLectures) * 100)
    : 0

  return (
    <aside className="flex w-full flex-col border-b border-richblack-700 bg-richblack-800 lg:h-[calc(100vh-3.5rem)] lg:w-[320px] lg:max-w-[350px] lg:border-b-0 lg:border-r">
      <div className="flex flex-col gap-4 border-b border-richblack-700 px-5 py-5">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => navigate("/dashboard/enrolled-courses")}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-richblack-100 text-richblack-700 transition hover:scale-95"
            title="Back to enrolled courses"
          >
            <IoIosArrowBack size={20} />
          </button>
          <button
            type="button"
            onClick={() => setReviewModal(true)}
            className="rounded-md bg-yellow-50 px-4 py-2 text-sm font-semibold text-richblack-900 transition hover:bg-yellow-100"
          >
            Add review
          </button>
        </div>
        <div>
          <p className="text-lg font-semibold text-richblack-5">
            {courseEntireData?.courseName}
          </p>
          <p className="mt-1 text-sm text-richblack-400">
            {completedCount} / {totalNoOfLectures} lectures completed
          </p>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-richblack-700">
            <div
              className="h-full rounded-full bg-yellow-50 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="max-h-64 overflow-y-auto lg:max-h-none lg:flex-1">
        {courseSectionData.map((course) => (
          <div key={course._id} className="text-sm text-richblack-5">
            <button
              type="button"
              className="flex w-full items-center justify-between bg-richblack-700 px-5 py-4 text-left"
              onClick={() =>
                setActiveStatus((prev) => (prev === course._id ? "" : course._id))
              }
            >
              <span className="w-[75%] font-semibold">{course?.sectionName}</span>
              <span className="flex items-center gap-2 text-richblack-300">
                <span className="text-xs">
                  {course?.subSection?.length || 0}
                </span>
                <BsChevronDown
                  className={`transition-transform duration-300 ${
                    activeStatus === course._id ? "rotate-180" : ""
                  }`}
                />
              </span>
            </button>

            {activeStatus === course._id && (
              <div className="bg-richblack-800">
                {course.subSection?.map((topic) => {
                  const isActive = videoBarActive === topic._id
                  const isCompleted = completedLectures?.includes(topic._id)
                  return (
                    <button
                      type="button"
                      key={topic._id}
                      className={`flex w-full items-start gap-3 px-5 py-3 text-left transition ${
                        isActive
                          ? "bg-yellow-50 font-semibold text-richblack-900"
                          : "text-richblack-100 hover:bg-richblack-900"
                      }`}
                      onClick={() => {
                        navigate(
                          `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                        )
                        setVideoBarActive(topic._id)
                      }}
                    >
                      <span
                        className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border ${
                          isActive
                            ? "border-richblack-900 bg-richblack-900 text-yellow-50"
                            : isCompleted
                            ? "border-caribbeangreen-100 bg-caribbeangreen-100 text-richblack-900"
                            : "border-richblack-400"
                        }`}
                      >
                        {(isCompleted || isActive) && (
                          <span className="text-[10px] leading-none">✓</span>
                        )}
                      </span>
                      <span>{topic.title}</span>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  )
}
