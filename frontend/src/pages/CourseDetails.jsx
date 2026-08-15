import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { BuyCourse } from "../services/operations/studentFeaturesAPI";
import ConfirmationModal from "../components/common/ConfirmationModal";

import RatingStars from "../components/common/RatingStars";

import Error from "./Error";

import GetAvgRating from "../utils/avgRating";
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";

import { formatDate } from "../services/formatDate";

import CourseDetailsCard from "../components/core/Course/CourseDetailsCard";
import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";

const CourseDetails = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { loading } = useSelector((state) => state.auth);
  const { paymentLoading } = useSelector((state) => state.course);

  const [confirmationModal, setConfirmationModal] = useState(null);

  const [courseData, setCourseData] = useState(null);
  useEffect(() => {
    console.log(courseId);

    const getCourseFullDetails = async () => {
      try {
        const result = await fetchCourseDetails(courseId);
        console.log("PRINTING COURSEDATA->", result);
        setCourseData(result);
      } catch (error) {
        console.log("Could not fetch course details");
      }
    };
    getCourseFullDetails();
  }, [courseId]);

  // avg review count
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(courseData?.data?.courseDetails.ratingAndReview);
    setAvgReviewCount(count);
  }, [courseData]);

  //lectures
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);

  useEffect(() => {
    let lectures = 0;
    courseData?.data?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec.subSection.length || 0;
    });
    setTotalNoOfLectures(lectures);
  }, [courseData]);

  //TODO:
  const handleBuyCourse = () => {
    if (token) {
      BuyCourse(token, [courseId], user, navigate, dispatch);
      return;
    }

    //koi jo login nhi h wo buy krne ki koshis kr rha hai
    setConfirmationModal({
      text1: "you are not Logged in",
      text2: "Please login to purchase this course",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  if (loading || !courseData) {
    return <div>Loading..</div>;
  }

  if (!courseData.success) {
    return (
      <div>
        <Error />
      </div>
    );
  }

  const {
    _id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    ratingAndReviews,
    instructor,
    studentsEnrolled,
    createdAt,
    courseContent,
  } = courseData?.data?.courseDetails;

  // const [isActive, setIsActive] = useState(Array(0));
  // const handleActive = (id) => {
  //     setIsActive(
  //         !isActive.includes(id)
  //          ? isActive.concat(id)
  //          : isActive.filter((e)=> e != id)

  //     )
  // }

  return (
    <div className="flex flex-col text-white bg-richblack-900 min-h-screen">
      {/* Course Intro Section */}
      <div className="relative flex flex-col justify-start p-8 bg-richblack-800 lg:h-[60vh] lg:p-[100px] lg:gap-y-6 rounded-b-2xl shadow-md">
        <h1 className="text-4xl font-bold text-yellow-50">{courseName}</h1>

        <p className="text-lg text-richblack-300 mt-2 md:w-[50vw]">
          This is course description: {courseDescription}
        </p>

        <div className="flex flex-col lg:flex-row lg:gap-x-3 gap-2 items-start lg:items-center text-richblack-200 mt-3">
          <RatingStars Review_Count={avgReviewCount} Start_Size={24} />
          <span>{`${ratingAndReviews.length} reviews`}</span>
          <span>{`${studentsEnrolled.length} students enrolled`}</span>
        </div>

        <p className="text-2xl font-semibold text-yellow-50 mt-4">
          Created By {`${instructor.firstName}`}
        </p>

        <div className="flex flex-row gap-x-5 text-richblack-300 mt-3">
          <p>Created at {formatDate(createdAt)}</p>
          <p>English</p>
        </div>
      </div>

      {/* Course Details Card */}
      <div className="mt-6 px-6">
        <CourseDetailsCard
          course={courseData?.data?.courseDetails}
          setConfirmationModal={setConfirmationModal}
          handleBuyCourse={handleBuyCourse}
        />
      </div>

      {/* What You Will Learn */}
      <div className="border-l-4 border-yellow-50 p-6 mx-6 mt-10 bg-richblack-800 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold text-yellow-50 mb-4">
          What You Will Learn
        </h2>
        <p className="text-lg text-richblack-200">{whatYouWillLearn}</p>
      </div>

      {/* Course Content */}
      <div className="mt-10 w-11/12 max-w-maxContent mx-auto px-6">
        <h2 className="text-4xl font-bold text-white mb-4">Course Content</h2>

        <div className="flex flex-col lg:flex-row lg:gap-x-6 text-richblack-300">
          <div className="flex flex-col gap-2">
            <span>{courseContent.length} section(s)</span>
            <span>{totalNoOfLectures} lectures</span>
            <span>{courseData?.data?.totalDuration} Duration</span>
          </div>

          <button className="text-yellow-50 font-semibold transition-transform hover:scale-105">
            Collapse all Sections
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}

      <div className="mt-10 px-6">
        <h2 className="text-4xl text-center font-bold text-white mb-6">
          Reviews from Other Learners
        </h2>
        <ReviewSlider />
      </div>

      <Footer />
    </div>
  );
};

export default CourseDetails;
