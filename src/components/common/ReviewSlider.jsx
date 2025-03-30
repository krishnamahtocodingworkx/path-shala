import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";
// import ReactStars from 'react-stars';
import ReactStars from "react-rating-stars-component";

import { ratingsEndpoints } from "../../services/apis";
import { apiConnector } from "../../services/apiconnector";
import { FaStar } from "react-icons/fa6";

const ReviewSlider = () => {
  const [reviews, setReviews] = useState([]);
  const truncateWords = 15;

  //fetch the reviews
  useEffect(() => {
    const fetchAllReviews = async () => {
      const response = await apiConnector(
        "GET",
        ratingsEndpoints.REVIEWS_DETAILS_API
      );
      const { data } = response;
      if (data?.success) {
        setReviews(data?.data);
      }
    };
    fetchAllReviews();
  }, []);
  return (
    <div className="text-white mt-5">
      <div className="h-[220px] max-w-5xl mx-auto transition-all ease-linear duration-200">
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          freeMode={true}
          autoplay={{ delay: 2500 }}
          modules={[FreeMode, Pagination, Autoplay]}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {reviews.map((review, index) => (
            <SwiperSlide
              key={index}
              className="bg-gray-800 border border-gray-700 p-4 rounded-lg shadow-md transition-all ease-in-out duration-300 hover:scale-105"
            >
              {/* Profile */}
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={
                    review?.user?.image
                      ? review?.user?.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                  }
                  alt="Profile pic"
                  className="h-12 w-12 object-cover rounded-full border-2 border-yellow-500"
                />
                <div>
                  <p className="font-semibold text-lg">
                    {review?.user?.firstName} {review?.user?.lastName}
                  </p>
                  <p className="text-sm text-gray-400">
                    {review?.course?.courseName}
                  </p>
                </div>
              </div>

              {/* Review */}
              <p className="text-gray-300 text-sm mb-2 line-clamp-2">
                {review?.review}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <p className="text-yellow-400 font-bold">
                  {review?.rating.toFixed(1)}
                </p>
                <ReactStars
                  count={5}
                  value={review?.rating}
                  size={20}
                  activeColor="#ffd700"
                  emptyIcon={<FaStar />}
                  fullIcon={<FaStar />}
                  edit={false}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ReviewSlider;
