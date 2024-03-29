import React from 'react'
import {Swiper,SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination"
import "swiper/css/free-mode";
import {Autoplay,FreeMode,Navigation,Pagination} from 'swiper/modules';
import Course_Cart from "./Course_Card"
const CourseSlider = ({Courses}) => {
  return (
    <>

    {
      console.log(Courses)
    }
      {
        Courses?.length?(
          <Swiper
        slidesPerView={1}
        spaceBetween={24}
        loop={true}
        freeMode={true}
        autoplay={{
            delay:2500,

        }}
        modules={[FreeMode,Pagination,Autoplay]}
          breakpoints={{
            1024:{slidesPerView:3,}
          }}
          >
          {
            Courses?.map((course,index)=>(
              <SwiperSlide key={index}>
              <Course_Cart course={course} Height={"h-[250px]"}/>
              yeas

              </SwiperSlide>
            ))
          }

          </Swiper>

        ):(
          <p>No Course Found</p>
        )
      }
    </>
  )
}

export default CourseSlider