import React from "react"
import copy from "copy-to-clipboard"
import { toast } from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FaShareFromSquare } from "react-icons/fa6"
import { HiOutlineCheckCircle } from "react-icons/hi"

import { ACCOUNT_TYPE } from "../../../utils/constants"
import { addToCart } from "../../../slices/cartSlice"

const CourseDetailsCard = ({
  course,
  setConfirmationModal,
  handleBuyCourse,
}) => {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { paymentLoading } = useSelector((state) => state.course)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const isEnrolled = course?.studentsEnrolled?.some(
    (student) => String(student) === String(user?._id)
  )

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("Instructors cannot buy a course")
      return
    }
    if (token) {
      dispatch(addToCart(course))
      return
    }

    setConfirmationModal({
      text1: "You are not logged in",
      text2: "Please login to add this course to your cart.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  const handleShare = () => {
    copy(window.location.href)
    toast.success("Link copied to clipboard")
  }

  return (
    <div className="overflow-hidden rounded-xl border border-richblack-600 bg-richblack-800 shadow-2xl">
      <img
        src={course?.thumbnail}
        alt={course?.courseName || "Course thumbnail"}
        className="h-48 w-full object-cover sm:h-56"
      />

      <div className="space-y-5 p-5">
        <p className="text-3xl font-bold text-yellow-50">₹ {course?.price ?? 0}</p>

        <div className="flex flex-col gap-3">
          <button
            type="button"
            disabled={paymentLoading}
            onClick={
              isEnrolled
                ? () => navigate("/dashboard/enrolled-courses")
                : handleBuyCourse
            }
            className="h-11 w-full rounded-md bg-yellow-50 font-semibold text-richblack-900 transition hover:bg-yellow-100 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {paymentLoading
              ? "Processing..."
              : isEnrolled
              ? "Go to course"
              : "Buy now"}
          </button>

          {!isEnrolled && (
            <button
              type="button"
              disabled={paymentLoading}
              onClick={handleAddToCart}
              className="h-11 w-full rounded-md border border-richblack-600 bg-richblack-700 font-semibold text-richblack-5 transition hover:bg-richblack-600 disabled:cursor-not-allowed disabled:opacity-70"
            >
              Add to cart
            </button>
          )}
        </div>

        <p className="text-center text-sm text-richblack-300">
          30-Day Money-Back Guarantee
        </p>

        <div>
          <p className="mb-3 font-semibold text-richblack-5">This course includes:</p>
          <div className="space-y-2">
            {(course?.instructions?.length
              ? course.instructions
              : ["Lifetime access", "Certificate of completion"]
            ).map((item, index) => (
              <p
                key={index}
                className="flex items-start gap-2 text-sm text-caribbeangreen-100"
              >
                <HiOutlineCheckCircle className="mt-0.5 shrink-0 text-base" />
                <span>{item}</span>
              </p>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={handleShare}
          className="mx-auto flex items-center gap-2 text-sm font-semibold text-yellow-50 transition hover:text-yellow-100"
        >
          <FaShareFromSquare />
          Share
        </button>
      </div>
    </div>
  )
}

export default CourseDetailsCard
