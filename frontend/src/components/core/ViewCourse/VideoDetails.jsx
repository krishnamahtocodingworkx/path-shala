import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { BigPlayButton, Player } from "video-react"
import "video-react/dist/video-react.css"

import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI"
import { updateCompletedLectures } from "../../../slices/viewCourseSlice"

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const playerRef = useRef(null)
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse)

  const [videoData, setVideoData] = useState(null)
  const [previewSource, setPreviewSource] = useState("")
  const [videoEnded, setVideoEnded] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!courseSectionData.length) return
    if (!courseId || !sectionId || !subSectionId) {
      navigate("/dashboard/enrolled-courses")
      return
    }

    const filteredData = courseSectionData.filter(
      (section) => section._id === sectionId
    )
    const filteredVideoData = filteredData?.[0]?.subSection?.filter(
      (subSection) => subSection._id === subSectionId
    )
    setVideoData(filteredVideoData?.[0] || null)
    setPreviewSource(courseEntireData?.thumbnail || "")
    setVideoEnded(false)
  }, [courseSectionData, courseEntireData, location.pathname, courseId, sectionId, subSectionId, navigate])

  const isFirstVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )
    if (currentSectionIndx < 0) return true
    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].subSection.findIndex((data) => data._id === subSectionId)
    return currentSectionIndx === 0 && currentSubSectionIndx === 0
  }

  const isLastVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )
    if (currentSectionIndx < 0) return true
    const noOfSubsections =
      courseSectionData[currentSectionIndx].subSection.length
    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].subSection.findIndex((data) => data._id === subSectionId)
    return (
      currentSectionIndx === courseSectionData.length - 1 &&
      currentSubSectionIndx === noOfSubsections - 1
    )
  }

  const goToNextVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )
    const noOfSubsections =
      courseSectionData[currentSectionIndx].subSection.length
    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].subSection.findIndex((data) => data._id === subSectionId)

    if (currentSubSectionIndx !== noOfSubsections - 1) {
      const nextSubSectionId =
        courseSectionData[currentSectionIndx].subSection[currentSubSectionIndx + 1]
          ._id
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      )
    } else {
      const nextSectionId = courseSectionData[currentSectionIndx + 1]._id
      const nextSubSectionId =
        courseSectionData[currentSectionIndx + 1].subSection[0]._id
      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
      )
    }
  }

  const goToPrevVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )
    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].subSection.findIndex((data) => data._id === subSectionId)

    if (currentSubSectionIndx !== 0) {
      const prevSubSectionId =
        courseSectionData[currentSectionIndx].subSection[currentSubSectionIndx - 1]
          ._id
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      )
    } else {
      const prevSectionId = courseSectionData[currentSectionIndx - 1]._id
      const prevSubSectionLength =
        courseSectionData[currentSectionIndx - 1].subSection.length
      const prevSubSectionId =
        courseSectionData[currentSectionIndx - 1].subSection[
          prevSubSectionLength - 1
        ]._id
      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
      )
    }
  }

  const handleLectureCompletion = async () => {
    setLoading(true)
    const res = await markLectureAsComplete(
      { courseId: courseId, subsectionId: subSectionId },
      token
    )
    if (res) {
      dispatch(updateCompletedLectures(subSectionId))
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-col gap-5 text-white">
      {!videoData ? (
        previewSource ? (
          <img
            src={previewSource}
            alt="Lecture preview"
            className="aspect-video w-full rounded-xl object-cover"
          />
        ) : (
          <div className="shimmer aspect-video w-full rounded-xl" />
        )
      ) : (
        <div className="relative overflow-hidden rounded-xl border border-richblack-700">
          <Player
            ref={playerRef}
            aspectRatio="16:9"
            playsInline
            onEnded={() => setVideoEnded(true)}
            src={videoData?.videoUrl}
          >
            <BigPlayButton position="center" />
            {videoEnded && (
              <div className="absolute inset-0 z-[100] grid place-content-center bg-gradient-to-t from-black via-black/70 to-black/20 px-4 font-inter">
                <div className="flex flex-col items-center gap-3">
                  {!completedLectures?.includes(subSectionId) && (
                    <button
                      type="button"
                      disabled={loading}
                      onClick={handleLectureCompletion}
                      className="rounded-md bg-yellow-50 px-5 py-2.5 text-sm font-semibold text-richblack-900 transition hover:bg-yellow-100 disabled:cursor-not-allowed disabled:opacity-70 md:text-base"
                    >
                      {loading ? "Saving..." : "Mark as completed"}
                    </button>
                  )}
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => {
                      if (playerRef?.current) {
                        playerRef.current.seek(0)
                        setVideoEnded(false)
                      }
                    }}
                    className="rounded-md bg-richblack-800 px-5 py-2.5 text-sm font-semibold text-richblack-5 transition hover:bg-richblack-700 disabled:cursor-not-allowed disabled:opacity-70 md:text-base"
                  >
                    Rewatch
                  </button>
                  <div className="mt-4 flex min-w-[220px] justify-center gap-3">
                    {!isFirstVideo() && (
                      <button
                        type="button"
                        disabled={loading}
                        onClick={goToPrevVideo}
                        className="rounded-md bg-richblack-700 px-5 py-2 text-sm font-semibold text-white transition hover:bg-richblack-600"
                      >
                        Previous
                      </button>
                    )}
                    {!isLastVideo() && (
                      <button
                        type="button"
                        disabled={loading}
                        onClick={goToNextVideo}
                        className="rounded-md bg-yellow-50 px-5 py-2 text-sm font-semibold text-richblack-900 transition hover:bg-yellow-100"
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </Player>
        </div>
      )}

      <div>
        <h1 className="text-2xl font-semibold text-richblack-5 md:text-3xl">
          {videoData?.title || "Lecture"}
        </h1>
        <p className="mt-3 pb-8 text-richblack-200">
          {videoData?.description || "No description for this lecture."}
        </p>
      </div>
    </div>
  )
}

export default VideoDetails
