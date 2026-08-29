import React, { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules"
import { FaQuoteLeft, FaStar } from "react-icons/fa6"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"

import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/navigation"
import "swiper/css/pagination"

import HighlightText from "../core/Homepage/HighlightText"
import { apiConnector } from "../../services/apiconnector"
import { ratingsEndpoints } from "../../services/apis"

const ReviewSlider = () => {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAllReviews = async () => {
      try {
        const response = await apiConnector(
          "GET",
          ratingsEndpoints.REVIEWS_DETAILS_API
        )
        if (response?.data?.success) {
          setReviews(response.data.data || [])
        }
      } catch (error) {
        console.log("Could not fetch reviews", error)
      } finally {
        setLoading(false)
      }
    }
    fetchAllReviews()
  }, [])

  return (
    <div className="w-full">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-yellow-50">
          Testimonials
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-richblack-5 md:text-4xl">
          What learners say about
          <HighlightText text="PathShala" />
        </h2>
        <p className="mt-3 text-base text-richblack-300">
          Honest ratings from students who learned with us.
        </p>
      </div>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="shimmer h-64 rounded-2xl" />
          ))}
        </div>
      ) : !reviews.length ? (
        <p className="rounded-2xl border border-richblack-700 bg-richblack-800 py-12 text-center text-richblack-300">
          No reviews yet. Be the first to share your experience.
        </p>
      ) : (
        <div className="review-swiper relative px-8 md:px-12">
          <Swiper
            slidesPerView={1}
            spaceBetween={24}
            loop={reviews.length > 3}
            grabCursor
            freeMode
            pagination={{ clickable: true }}
            navigation={{
              nextEl: ".review-next",
              prevEl: ".review-prev",
            }}
            autoplay={{
              delay: 3200,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            modules={[FreeMode, Pagination, Autoplay, Navigation]}
            breakpoints={{
              640: { slidesPerView: 1.15 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="!pb-14"
          >
            {reviews.map((review) => {
              const name = `${review?.user?.firstName || ""} ${
                review?.user?.lastName || ""
              }`.trim() || "Learner"
              const rating = Number(review?.rating) || 0

              return (
                <SwiperSlide key={review._id || name} className="h-auto">
                  <article className="relative flex h-full min-h-[250px] w-full flex-col overflow-hidden rounded-2xl border border-richblack-600 bg-richblack-800 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.28)] transition hover:border-yellow-50/40">
                    <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-yellow-50/5" />
                    <FaQuoteLeft className="mb-4 text-xl text-yellow-50/70" />

                    <p className="line-clamp-5 flex-1 text-[15px] leading-relaxed text-richblack-100">
                      {review?.review || "Great learning experience."}
                    </p>

                    <div className="mt-6 flex items-center justify-between gap-3 border-t border-richblack-600 pt-5">
                      <div className="flex min-w-0 items-center gap-3">
                        <img
                          src={
                            review?.user?.image ||
                            `https://api.dicebear.com/5.x/initials/svg?seed=${name}`
                          }
                          alt={name}
                          className="h-11 w-11 rounded-full object-cover ring-2 ring-yellow-50/80"
                        />
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-richblack-5">
                            {name}
                          </p>
                          <p className="truncate text-xs text-richblack-300">
                            {review?.course?.courseName || "PathShala course"}
                          </p>
                        </div>
                      </div>

                      <div className="flex shrink-0 flex-col items-end gap-1">
                        <p className="text-sm font-bold text-yellow-50">
                          {rating.toFixed(1)}
                        </p>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                              key={star}
                              className={`text-[11px] ${
                                star <= Math.round(rating)
                                  ? "text-yellow-50"
                                  : "text-richblack-500"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                </SwiperSlide>
              )
            })}
          </Swiper>

          <button
            type="button"
            className="review-prev absolute left-0 top-[42%] z-10 flex h-9 w-9 items-center justify-center rounded-full border border-richblack-600 bg-richblack-800 text-richblack-5 transition hover:border-yellow-50 hover:bg-yellow-50 hover:text-richblack-900"
            aria-label="Previous reviews"
          >
            <IoIosArrowBack size={18} />
          </button>
          <button
            type="button"
            className="review-next absolute right-0 top-[42%] z-10 flex h-9 w-9 items-center justify-center rounded-full border border-richblack-600 bg-richblack-800 text-richblack-5 transition hover:border-yellow-50 hover:bg-yellow-50 hover:text-richblack-900"
            aria-label="Next reviews"
          >
            <IoIosArrowForward size={18} />
          </button>
        </div>
      )}
    </div>
  )
}

export default ReviewSlider
