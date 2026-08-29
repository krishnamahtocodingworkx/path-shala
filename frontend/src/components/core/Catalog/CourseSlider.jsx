import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/free-mode"
import { Autoplay, FreeMode, Pagination } from "swiper/modules"

import CourseCard from "./Course_Card"

const CourseSlider = ({ Courses }) => {
  const courses = Courses?.filter(Boolean) || []

  if (!courses.length) {
    return (
      <div className="rounded-xl border border-dashed border-richblack-600 bg-richblack-800 px-6 py-16 text-center">
        <p className="text-xl font-medium text-richblack-5">No courses found</p>
        <p className="mt-2 text-sm text-richblack-300">
          Published courses in this category will appear here.
        </p>
      </div>
    )
  }

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={24}
      loop={courses.length > 3}
      freeMode={true}
      pagination={{ clickable: true }}
      autoplay={
        courses.length > 1
          ? {
              delay: 2800,
              disableOnInteraction: false,
            }
          : false
      }
      modules={[FreeMode, Pagination, Autoplay]}
      breakpoints={{
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      className="pb-12"
    >
      {courses.map((course) => (
        <SwiperSlide key={course._id}>
          <CourseCard course={course} Height="h-[220px]" />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default CourseSlider
