import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";
import Course_Cart from "./Course_Card";
const CourseSlider = ({ Courses }) => {
  return (
    <>
      {console.log(Courses)}

      {Courses?.length ? (
        <div className="w-11/12 max-w-maxContent mx-auto mt-6">
          <Swiper
            slidesPerView={1}
            spaceBetween={24}
            loop={true}
            freeMode={true}
            autoplay={{
              delay: 2500,
            }}
            modules={[FreeMode, Pagination, Autoplay]}
            breakpoints={{
              1024: { slidesPerView: 3 },
            }}
            className="pb-8"
          >
            {Courses.map((course, index) => (
              <SwiperSlide
                key={index}
                className="transition-transform hover:scale-105 duration-300"
              >
                <Course_Cart course={course} Height={"h-[250px]"} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <p className="text-center text-xl text-richblack-200 mt-10">
          No Courses Found
        </p>
      )}
    </>
  );
};

export default CourseSlider;
