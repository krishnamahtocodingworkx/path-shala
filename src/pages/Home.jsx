import React from 'react'
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom"
import HighlightText from "../components/core/Homepage/HighlightText";
import CTAButton from "../components/core/Homepage/Button";
import CodeBlocks from "../components/core/Homepage/CodeBlocks";
import LearningLanguageSection from "../components/core/Homepage/LearningLanguageSection";
import TimelineSection from "../components/core/Homepage/TimelineSection";
import Banner from "../assets/Images/banner.mp4"
import InstructorSection from "../components/core/Homepage/InstructorSection";
// import ExploreMore from "../components/core/Homepage/ExploreMore"
import Footer from "../components/common/Footer"
import ReviewSlider from "../components/common/ReviewSlider"


const Home = () => {
  return (
    <div>
      {/* section1 */}
      <div className="max-w-maxContent relative flex flex-col w-11/12 items-center text-white justify-between mx-auto">
        <Link to={"/signup"}>
          <div className=" group mx-auto rounded-full bg-richblack-800 text-richblack-200 font-bold transition-all duration-200 hover:scale-95 w-fit">
            <div className="flex flex-row items-center rounded-full gap-2 px-10 py-[5px] group-hover:bg-richblack-900">
              <p>Become an instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="text-center font-bold mt-7 text-4xl">
          Empower Your Feture with
          <HighlightText text={"Coding Skill"} />
        </div>

        <div className="mt-6 w-[80%] text-center text-richblue-200 text-lg">
          With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
        </div>

        <div className="flex flex-row gap-4 mt-8">
          <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
          <CTAButton active={false} linkto={"/login"}>Book a Demo</CTAButton>
        </div>

        <div className="my-12 mx-3 ">
          <video
            loop
            muted
            autoPlay
          >
            <source src={Banner} type="video/mp4"></source>

          </video>
        </div>

        {/* code section1 */}
        <div>
          <CodeBlocks
            position={"flex-row"}
            heading={
              <div className="text-4xl font-inter font-bold">
                Unlock Your <HighlightText text={"coding potential"}></HighlightText> with our online courses
              </div>
            }
            text={"coding potential"}
            content1={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}

            codingContent={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
          >
          </CodeBlocks>
        </div>
        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-inter font-bold">
                Start <HighlightText text={"coding in seconds"}></HighlightText> 
              </div>
            }
            text={"coding potential"}
            content1={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}

            codingContent={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
          >
          </CodeBlocks>
        </div>

        {/* <ExploreMore/> */}


      </div>


      {/* section2*/}

      <div className="bg-pure-greys-5 text-richblack-700">
        <div className="homepage-bg h-[310px]">

          <div className="w-11/12 max-w-maxContent flex items-center gap-5 mx-auto justify-between flex-col">
            <div className="h-[150px]"></div>

            {/* //maxwidth-1260px */}

            <div className="flex flex-row gap-7 text-white">
              <CTAButton active={true} linkto="{/signup">
                <div className="flex items-center">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>

              <CTAButton active={false} linkto={"/signup"}>
                <div>
                  Learn More
                </div>

              </CTAButton>
            </div>

          </div>
        </div>

        <div className="w-11/12 max-w-maxContent flex items-center gap-5 mx-auto justify-between flex-col">
          <div className="lg:flex lg:flex-row lg:gap-5 lg:mt-[90px] flex flex-col items-center justify-center gap-y-5">

            <div className="text-4xl font-semibold w-[45%]">
              Get the Skills you need for about
              <HighlightText text={"Job that is in demand"}></HighlightText>
            </div>
            <div className="flex flex-col gap-10 w-[40%] items-start">
              <p>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
              <CTAButton active={true} linkto={"/signup"}>
                <div>
                  Learn More
                </div>
              </CTAButton>

            </div>
          </div>
          <TimelineSection />
          <LearningLanguageSection />
        </div>
      </div>
      {/* section3 */}

      <div className="w-11/12 mx-auto max-w-maxContent flex flex-col justify-between gap-7 bg-richblack-900 text-white">

      <InstructorSection/>

      <h2 className="text-center text-4xl font-semibold">Reviews from others Learners</h2>
      <ReviewSlider/>
        
      </div>
      {/* footer */}
      <Footer/>
    </div>
  )
}

export default Home