import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import copy from 'copy-to-clipboard';
import {toast} from "react-hot-toast"
import {ACCOUNT_TYPE} from "../../../utils/constants"
import { addToCart } from '../../../slices/cartSlice';

const CourseDetailsCard = ({course,setConfirmationModal,handleBuyCourse}) => {

    const {user} = useSelector((state)=>state.profile);

    const {token} = useSelector((state)=>state.auth);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        thumbnail:ThumbnailImage,
        price:CurrentPrice,
    } = course;


    const handleAddToCart = ()=>{

        if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR){
            toast.error("You are an intructor you cant buy a course");
            return;
        }
        if(token){
            dispatch(addToCart(course));
            return;
        }

        setConfirmationModal({
            text1:"You are not logged in",
            text2:"Please login to add to cart",
            btn1text:"login",
            btn2text:"Cancel",
            btn1Handler:()=>navigate("/login"),
            btn2Handler:()=>setConfirmationModal(null)
        })



    }

    const handleShare = ()=>{
        copy(window.location.href);
        toast.success("Link copy to clipboard")


    }
  return (
    <div className="lg:h-full lg:w-[30vw] lg:absolute right-2 top-9  flex flex-col items-center justify-center lg:bg-richblack-500 ">
        <img
            src={ThumbnailImage}
            alt="Thumbnail Image"
            className='lg:max-h-[300px] lg:min-h-[180px] lg:w-[400px] rounded-xl'
        />

        <div className="text-3xl mt-5 p-5">
            Rs.{CurrentPrice}
        </div>

        <div className='flex flex-col gap-y-3 justify-start items-center'>
            <button
            onClick={user && 
                course?.studentsEnrolled.includes(user?._id)?
                ()=>navigate("/dashboard/enrolled-courses"):handleBuyCourse
                
            }
            className="bg-yellow-50 lg:w-[20vw] rounded-md  text-richblue-900 h-[5vh]"
            >
                {

                    user && course?.studentsEnrolled.includes(user?._id)?"Go to Course":"Buy Now"
                }
            </button>

            {
                (!course?.studentsEnrolled.includes(user?._id)) &&(
                    <button
                    onClick={handleAddToCart}
                    className="bg-yellow-50 lg:w-[20vw] rounded-md  text-richblue-900 h-[5vh]"
                    >
                        Add to Cart
                    </button>
                )
            }
        </div>

        <div className="text-richblack-300 flex flex-col gap-y-3 items-center">
            <p>30 Day money back guarentee</p>
            <p>This Course Includes:</p>
            <div className='flex flex-col gap-y-3'>
           { 
            course?.instructions?.map((item,index)=>(
                <p className='flex gap-2' key={index}>
                    <span>this is intructions{item}</span>
                </p>
            ))
        }

            </div>
        </div>

        <div>
            <button
            className="text-yellow-50  "
            onClick={handleShare}
            >
                Share
            </button>
        </div>

    </div>
  )
}

export default CourseDetailsCard