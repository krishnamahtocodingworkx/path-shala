import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import copy from "copy-to-clipboard";
import { toast } from "react-hot-toast";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import { addToCart } from "../../../slices/cartSlice";

const CourseDetailsCard = ({
  course,
  setConfirmationModal,
  handleBuyCourse,
}) => {
  const { user } = useSelector((state) => state.profile);

  const { token } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { thumbnail: ThumbnailImage, price: CurrentPrice } = course;

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an intructor you cant buy a course");
      return;
    }
    if (token) {
      dispatch(addToCart(course));
      return;
    }

    setConfirmationModal({
      text1: "You are not logged in",
      text2: "Please login to add to cart",
      btn1text: "Login",
      btn2text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  const handleShare = () => {
    copy(window.location.href);
    toast.success("Link copy to clipboard");
  };
  return (
    <div className="lg:h-[93vh] lg:w-[30vw] lg:absolute right-2 top-14 flex flex-col items-center justify-center bg-richblack-600 p-6 rounded-lg shadow-md">
      {/* Thumbnail Image */}
      <img
        src={ThumbnailImage}
        alt="Thumbnail Image"
        className="lg:max-h-[300px] lg:min-h-[180px] lg:w-[400px] rounded-xl shadow-lg"
      />

      {/* Price Section */}
      <div className="text-3xl font-bold text-yellow-50 mt-5 p-4 bg-richblack-700 rounded-lg shadow-md">
        Rs. {CurrentPrice}
      </div>

      {/* Purchase Buttons */}
      <div className="flex flex-col gap-y-4 mt-5 w-full items-center">
        <button
          onClick={
            user && course?.studentsEnrolled.includes(user?._id)
              ? () => navigate("/dashboard/enrolled-courses")
              : handleBuyCourse
          }
          className="bg-yellow-50 w-[80%] lg:w-[20vw] rounded-md text-richblue-900 h-[45px] font-semibold hover:bg-yellow-100 transition duration-300 shadow-md"
        >
          {user && course?.studentsEnrolled.includes(user?._id)
            ? "Go to Course"
            : "Buy Now"}
        </button>

        {!course?.studentsEnrolled.includes(user?._id) && (
          <button
            onClick={handleAddToCart}
            className="bg-yellow-50 w-[80%] lg:w-[20vw] rounded-md text-richblue-900 h-[45px] font-semibold hover:bg-yellow-100 transition duration-300 shadow-md"
          >
            Add to Cart
          </button>
        )}
      </div>

      {/* Course Info Section */}
      <div className="text-richblack-300 flex flex-col gap-y-3 items-center text-center mt-6 bg-richblack-700 p-4 rounded-lg shadow-md w-full">
        <p className="font-semibold">30-Day Money-Back Guarantee</p>
        <p className="text-lg font-medium">This Course Includes:</p>

        {/* Course Instructions */}
        <div className="flex flex-col gap-y-2 text-sm text-richblack-200">
          {course?.instructions?.map((item, index) => (
            <p className="flex gap-2 items-center" key={index}>
              <span>✔️ {item}</span>
            </p>
          ))}
        </div>
      </div>

      {/* Share Button */}
      <div className="mt-4">
        <button
          className="text-yellow-50 font-semibold hover:underline transition duration-200"
          onClick={handleShare}
        >
          Share
        </button>
      </div>
    </div>
  );
};

export default CourseDetailsCard;
