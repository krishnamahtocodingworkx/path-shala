import React from "react"

import HighlightText from "../components/core/Homepage/HighlightText"
import Quote from "../components/core/AboutPage/Quote"
import StatsComponent from "../components/core/AboutPage/StatsComponent"
import LearningGrid from "../components/core/AboutPage/LearningGrid"
import ContactFormSection from "../components/core/AboutPage/ContactFormSection"
import Footer from "../components/common/Footer"
import ReviewSlider from "../components/common/ReviewSlider"
import banner1 from "../assets/Images/aboutus1.webp"
import banner2 from "../assets/Images/aboutus2.webp"
import banner3 from "../assets/Images/aboutus3.webp"
import FoundingStory from "../assets/Images/FoundingStory.png"

const About = () => {
  return (
    <div className="bg-richblack-900 text-white">
      <section className="bg-richblack-800">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center gap-8 py-16 md:py-20">
          <header className="flex max-w-4xl flex-col items-center text-center">
            <h1 className="text-3xl font-semibold leading-tight md:text-5xl">
              Driving innovation in online education for a
              <HighlightText text="brighter future" />
            </h1>
            <p className="mt-5 text-base leading-relaxed text-richblack-300 md:text-lg">
              PathShala is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </p>
          </header>

          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
            <img
              src={banner1}
              alt="Students collaborating"
              className="h-52 w-full rounded-lg object-cover shadow-lg md:h-64"
            />
            <img
              src={banner2}
              alt="Online learning"
              className="h-52 w-full rounded-lg object-cover shadow-lg md:h-64"
            />
            <img
              src={banner3}
              alt="Classroom discussion"
              className="h-52 w-full rounded-lg object-cover shadow-lg md:h-64"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto w-11/12 max-w-maxContent border-b border-richblack-700 py-16 md:py-20">
        <Quote />
      </section>

      <section className="mx-auto flex w-11/12 max-w-maxContent flex-col gap-16 py-16 md:gap-24 md:py-20">
        <div className="flex flex-col items-center justify-between gap-10 lg:flex-row">
          <div className="flex flex-col gap-6 lg:w-[50%]">
            <h2 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-3xl font-semibold text-transparent md:text-4xl">
              Our founding story
            </h2>
            <p className="text-base font-medium leading-relaxed text-richblack-300">
              Our e-learning platform was born out of a shared vision and
              passion for transforming education. It all began with a group of
              educators, technologists, and lifelong learners who recognized the
              need for accessible, flexible, and high-quality learning
              opportunities in a rapidly evolving digital world.
            </p>
            <p className="text-base font-medium leading-relaxed text-richblack-300">
              As experienced educators ourselves, we witnessed firsthand the
              limitations and challenges of traditional education systems. We
              believed that education should not be confined to the walls of a
              classroom or restricted by geographical boundaries. We envisioned
              a platform that could bridge these gaps and empower individuals
              from all walks of life to unlock their full potential.
            </p>
          </div>
          <div className="lg:w-[45%]">
            <img
              src={FoundingStory}
              alt="PathShala founding story"
              className="w-full rounded-lg shadow-[0_0_30px_0] shadow-[#FC6767]/40"
            />
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-12 lg:flex-row">
          <div className="flex flex-col gap-6 lg:w-[45%]">
            <h2 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-3xl font-semibold text-transparent md:text-4xl">
              Our vision
            </h2>
            <p className="text-base font-medium leading-relaxed text-richblack-300">
              With this vision in mind, we set out on a journey to create an
              e-learning platform that would revolutionize the way people learn.
              Our team of dedicated experts worked tirelessly to develop a
              robust and intuitive platform that combines cutting-edge
              technology with engaging content, fostering a dynamic and
              interactive learning experience.
            </p>
          </div>
          <div className="flex flex-col gap-6 lg:w-[45%]">
            <h2 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-3xl font-semibold text-transparent md:text-4xl">
              Our mission
            </h2>
            <p className="text-base font-medium leading-relaxed text-richblack-300">
              Our mission goes beyond just delivering courses online. We wanted
              to create a vibrant community of learners, where individuals can
              connect, collaborate, and learn from one another. We believe that
              knowledge thrives in an environment of sharing and dialogue, and
              we foster this spirit of collaboration through forums, live
              sessions, and networking opportunities.
            </p>
          </div>
        </div>
      </section>

      <StatsComponent />

      <section className="mx-auto w-11/12 max-w-maxContent py-16 md:py-20">
        <LearningGrid />
        <ContactFormSection />
      </section>

      <section className="mx-auto w-11/12 max-w-maxContent pb-16">
        <ReviewSlider />
      </section>

      <Footer />
    </div>
  )
}

export default About
