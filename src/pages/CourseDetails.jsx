import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { BuyCourse } from '../services/operations/studentFeaturesAPI';
import ConfirmationModal from "../components/common/ConfirmationModal"

import RatingStars from "../components/common/RatingStars"

import Error from "./Error"

import GetAvgRating from "../utils/avgRating";
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI';

import { formatDate } from '../services/formatDate';

import CourseDetailsCard from "../components/core/Course/CourseDetailsCard"
import Footer from '../components/common/Footer';
import ReviewSlider from '../components/common/ReviewSlider'

const CourseDetails = () => {

    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { courseId } = useParams();
    const { loading } = useSelector((state) => state.auth)
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
        }
        getCourseFullDetails();
    }, [courseId])


    // avg review count
    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(() => {
        const count = GetAvgRating(courseData?.data?.courseDetails.ratingAndReview);
        setAvgReviewCount(count);

    }, [courseData])


    //lectures
    const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);

    useEffect(() => {
        let lectures = 0;
        courseData?.data?.courseDetails?.courseContent?.forEach((sec) => {
            lectures += sec.subSection.length || 0
        })
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
            btn2Handler: () => setConfirmationModal(null)
        })
    }


    if (loading || !courseData) {
        return (
            <div>
                Loading..
            </div>
        )
    }

    if (!courseData.success) {
        return (

            <div>
                <Error />
            </div>
        )
    }

    console.log("this is main", courseData);
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
        courseContent

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
        <div className='flex  text-white flex-col'>


            <div className="relative flex justify-start flex-col p-8 ">

            <div className="bg-richblack-800 lg:h-[60vh] lg:p-[100px] flex flex-col lg:gap-y-5">
            <p className="text-4xl">{courseName}</p>
                <p className="text-richblack-300">this is course description {courseDescription}</p>
                <div className="flex lg:flex-row lg:gap-x-2 flex-col">
                    {/* <span>{avgReviewCount}</span> */}
                    <RatingStars Review_Count={avgReviewCount} Start_Size={24} />
                    <span>{`${ratingAndReviews.length} reviews`}</span>
                    <span>{`${studentsEnrolled.length} student enrolled`}</span>
                </div>

                <div>
                    <p className="text-2xl">Created By {`${instructor.firstName}`}</p>
                </div>

                <div className="flex flex-row gap-x-5">
                    <p>
                        Created at {formatDate(createdAt)}
                    </p>

                    {" "} English
                </div>
            </div>



                <div>
                    <CourseDetailsCard
                        course={courseData?.data?.courseDetails}
                        setConfirmationModal={setConfirmationModal}
                        handleBuyCourse={handleBuyCourse}
                    />
                </div>


            </div>


            <div className="border-5 m-9" >
                <p className="text-4xl">What you will learn</p>
                <div>
                    {whatYouWillLearn}
                </div>
            </div>


            <div>
                <div>
                    <p>Course Content</p>

                </div>

                <div className='flex lg:gap-x-5 lg:flex-row flex-col'>

                    <div>

                        <span>{courseContent.length} sections(s)</span>
                        <span>{totalNoOfLectures}lectures</span>
                        <span>{courseData?.data?.totalDuration} Durations</span>

                    </div>

                    <div>
                        <button
                        // onClick={()=>setIsActive([])}
                        className='text-yellow-50'
                        >
                            Collapse all Sections
                        </button>
                    </div>

                </div>


            </div>




            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
            <div className="mt-5">

            <p className='w-full text-center text-4xl'>Reviews from others learners</p>

            <ReviewSlider/>
            </div>
            <Footer/>
        </div>
    )
}

export default CourseDetails
