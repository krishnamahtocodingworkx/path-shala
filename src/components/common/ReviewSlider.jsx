import React,{useState,useEffect} from 'react'
import {Swiper,SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination"
import "swiper/css/free-mode";
import {Autoplay,FreeMode,Navigation,Pagination} from 'swiper/modules';
// import ReactStars from 'react-stars';
import ReactStars from "react-rating-stars-component"


 import {ratingsEndpoints} from "../../services/apis";
import { apiConnector } from '../../services/apiconnector';
import { FaStar } from 'react-icons/fa6';

const ReviewSlider = () => {

    const [reviews,setReviews] = useState([]);
    const truncateWords = 15;

    //fetch the reviews
    useEffect(()=>{
        const fetchAllReviews = async()=>{
            const response = await apiConnector("GET",ratingsEndpoints.REVIEWS_DETAILS_API);
            const {data} = response;
            if(data?.success){
                setReviews(data?.data);
            }
        }
        fetchAllReviews();
    },[])
  return (
    <div className='text-white'>

    <div className='h-[190px] max-w-maxContent transition-all ease-linear duration-100'>
        <Swiper
        slidesPerView={1}
        spaceBetween={24}
        // loop={true}
        freeMode={true}
        autoplay={{
            delay:2500,
        }}
        modules={[FreeMode,Pagination,Autoplay]}
        breakpoints={{
            1024:{slidesPerView:3}
          }}

        >

        {
            reviews.map((review,index)=>(
                <SwiperSlide key={index}
                className="border-1 ring-richblack-700 bg-richblack-700 transition-all ease-linear"
                >
                <img
                    src={review?.user?.image?review?.user?.image:`https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`}
                    alt="Profil pic"
                    className="h-9 w-9 object-cover rounded-full"
                />

                <p className="lg:w-[50px]">{review?.course?.courseName}</p>
                <p className="flex">{review?.user?.firstName} {review?.user?.lastName}</p>

                <p>
                    {review?.review}
                </p>

                <p>{review?.rating.toFixed(1)}</p>

                <ReactStars
                    count={5}
                    value={review?.rating}
                    size={20}
                    activeColor="#ffd700"
                    emptyIcon={<FaStar/>}
                    fullIcon={<FaStar/>}
                    edit={false}
                />
                </SwiperSlide>
            ))
        }



        </Swiper>
    </div>
    </div>
  )
}

export default ReviewSlider