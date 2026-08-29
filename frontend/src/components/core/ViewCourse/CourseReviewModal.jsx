import React, { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { useSelector } from "react-redux"
import { FaStar } from "react-icons/fa"
import { RxCross2 } from "react-icons/rx"

import { createRating } from "../../../services/operations/courseDetailsAPI"

const CourseReviewModal = ({ setReviewModal }) => {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { courseEntireData } = useSelector((state) => state.viewCourse)
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [review, setReview] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const textareaRef = useRef(null)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const timer = setTimeout(() => textareaRef.current?.focus(), 50)

    // video-react listens on document for Space (play/pause) and calls preventDefault.
    // Stop those keys on the field itself so they never reach the player.
    const stopPlayerShortcuts = (event) => event.stopPropagation()
    const field = textareaRef.current
    field?.addEventListener("keydown", stopPlayerShortcuts)
    field?.addEventListener("keyup", stopPlayerShortcuts)

    return () => {
      document.body.style.overflow = previousOverflow
      clearTimeout(timer)
      field?.removeEventListener("keydown", stopPlayerShortcuts)
      field?.removeEventListener("keyup", stopPlayerShortcuts)
    }
  }, [])

  const onSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = {}
    if (!rating) nextErrors.rating = "Please select a rating"
    if (!review.trim()) nextErrors.review = "Please add your experience"
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    setSubmitting(true)
    const success = await createRating(
      {
        courseId: courseEntireData._id,
        rating,
        review: review.trim(),
      },
      token
    )
    setSubmitting(false)
    if (success) setReviewModal(false)
  }

  const modal = (
    <div
      className="fixed inset-0 z-[10000] grid place-items-center overflow-auto bg-richblack-900/60 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setReviewModal(false)
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-modal-title"
        className="pointer-events-auto my-6 w-full max-w-[500px] rounded-xl border border-richblack-400 bg-richblack-800 p-6 shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-richblack-600 pb-4">
          <p id="review-modal-title" className="text-xl font-semibold text-richblack-5">
            Add a review
          </p>
          <button
            type="button"
            onClick={() => setReviewModal(false)}
            className="text-richblack-300 transition hover:text-pink-200"
            aria-label="Close review modal"
          >
            <RxCross2 size={22} />
          </button>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <img
            src={user?.image}
            alt={user?.firstName}
            className="h-12 w-12 rounded-full object-cover"
          />
          <div>
            <p className="font-medium text-richblack-5">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-richblack-300">Posting publicly</p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-5">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1" role="radiogroup" aria-label="Course rating">
              {[1, 2, 3, 4, 5].map((star) => {
                const active = (hoverRating || rating) >= star
                return (
                  <button
                    key={star}
                    type="button"
                    aria-label={`${star} star${star > 1 ? "s" : ""}`}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => {
                      setRating(star)
                      setErrors((prev) => ({ ...prev, rating: undefined }))
                    }}
                    className="p-1"
                  >
                    <FaStar
                      size={28}
                      className={active ? "text-yellow-50" : "text-richblack-400"}
                    />
                  </button>
                )
              })}
            </div>
            {errors.rating && (
              <span className="mt-1 text-xs text-pink-200">{errors.rating}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="courseExperience" className="text-sm text-richblack-5">
              Add your experience <sup className="text-pink-200">*</sup>
            </label>
            <textarea
              ref={textareaRef}
              id="courseExperience"
              name="courseExperience"
              rows={5}
              value={review}
              onChange={(event) => {
                setReview(event.target.value)
                setErrors((prev) => ({ ...prev, review: undefined }))
              }}
              onKeyDown={(event) => {
                event.stopPropagation()
                event.nativeEvent.stopImmediatePropagation()
              }}
              placeholder="Share what you liked, learned, or would improve..."
              className="resize-none rounded-lg border border-richblack-600 bg-richblack-700 p-3 text-richblack-5 outline-none placeholder:text-richblack-400 focus:border-yellow-50"
            />
            {errors.review && (
              <span className="text-xs text-pink-200">{errors.review}</span>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setReviewModal(false)}
              className="rounded-md bg-richblack-700 px-5 py-2 font-semibold text-richblack-5 transition hover:bg-richblack-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-md bg-yellow-50 px-5 py-2 font-semibold text-richblack-900 transition hover:bg-yellow-100 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )

  return createPortal(modal, document.body)
}

export default CourseReviewModal
