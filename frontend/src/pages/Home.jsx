import React from "react"
import { FaArrowRight } from "react-icons/fa6"
import { Link } from "react-router-dom"
import { TbMessageChatbot } from "react-icons/tb"
import { IoMdClose } from "react-icons/io"
import Chatbot from "react-chatbot-kit"

import HighlightText from "../components/core/Homepage/HighlightText"
import CTAButton from "../components/core/Homepage/Button"
import CodeBlocks from "../components/core/Homepage/CodeBlocks"
import LearningLanguageSection from "../components/core/Homepage/LearningLanguageSection"
import TimelineSection from "../components/core/Homepage/TimelineSection"
import InstructorSection from "../components/core/Homepage/InstructorSection"
import Footer from "../components/common/Footer"
import ReviewSlider from "../components/common/ReviewSlider"
import Banner from "../assets/Images/banner.mp4"
import config from "../utils/config"
import MessageParser from "../utils/MessageParser"
import ActionProvider from "../utils/ActionProvider"

const Home = () => {
  const [showChat, setShowChat] = React.useState(false)

  return (
    <div className="relative overflow-x-hidden bg-richblack-900">
      <button
        type="button"
        className="fixed bottom-5 right-5 z-[1000] flex items-center gap-2 rounded-full bg-yellow-50 px-4 py-3 font-semibold text-richblack-900 shadow-lg shadow-yellow-50/10 transition hover:scale-105"
        onClick={() => setShowChat(!showChat)}
      >
        {showChat ? "Close" : "Chat Help"}
        {showChat ? <IoMdClose fontSize={20} /> : <TbMessageChatbot fontSize={20} />}
      </button>
      {showChat && (
        <Chatbot
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
        />
      )}

      <section className="relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center text-white">
        <Link to="/signup" className="mt-10">
          <div className="group mx-auto w-fit rounded-full bg-richblack-800 p-[1px] font-bold text-richblack-200 transition hover:scale-95">
            <div className="flex items-center gap-2 rounded-full px-8 py-2 transition group-hover:bg-richblack-900">
              Become an instructor
              <FaArrowRight className="text-sm" />
            </div>
          </div>
        </Link>

        <h1 className="mt-8 text-center text-3xl font-semibold leading-tight md:text-5xl">
          Empower Your Future with
          <HighlightText text="Coding Skills" />
        </h1>

        <p className="mt-5 w-[90%] text-center text-base text-richblack-300 md:w-4/5 md:text-lg">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <CTAButton active={true} linkto="/signup">
            Learn More
          </CTAButton>
          <CTAButton active={false} linkto="/login">
            Book a Demo
          </CTAButton>
        </div>

        <div className="my-12 w-full overflow-hidden rounded-xl shadow-[10px_-5px_50px_-5px] shadow-blue-200">
          <video
            className="aspect-video w-full object-cover"
            loop
            muted
            autoPlay
            playsInline
          >
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        <CodeBlocks
          position="lg:flex-row"
          heading={
            <div className="text-3xl font-bold md:text-4xl">
              Unlock your <HighlightText text="coding potential" /> with our
              online courses
            </div>
          }
          content1="Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
          codingContent={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
        />

        <CodeBlocks
          position="lg:flex-row-reverse"
          heading={
            <div className="text-3xl font-bold md:text-4xl">
              Start <HighlightText text="coding in seconds" />
            </div>
          }
          content1="Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
          codingContent={`import React from "react";\nfunction App() {\n  return (\n    <div className="App">\n      <h1>Hello PathShala</h1>\n      <p>Start coding today.</p>\n    </div>\n  );\n}\nexport default App;`}
        />
      </section>

      <section className="bg-pure-greys-5 text-richblack-700">
        <div className="homepage-bg h-[260px] bg-cover bg-center sm:h-[310px]">
          <div className="mx-auto flex h-full w-11/12 max-w-maxContent flex-col items-center justify-center">
            <div className="flex flex-col gap-4 text-white sm:flex-row sm:gap-7">
              <CTAButton active={true} linkto="/signup">
                <div className="flex items-center gap-2">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto="/signup">
                Learn More
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center gap-16 py-16">
          <div className="flex w-full flex-col items-center gap-8 lg:flex-row lg:justify-between">
            <h2 className="text-3xl font-semibold lg:w-[45%] md:text-4xl">
              Get the skills you need for a
              <HighlightText text="job that is in demand." />
            </h2>
            <div className="flex flex-col items-start gap-8 lg:w-[40%]">
              <p className="text-base leading-relaxed text-richblack-600">
                The modern PathShala dictates its own terms. Today, to be a
                competitive specialist requires more than professional skills.
              </p>
              <CTAButton active={true} linkto="/signup">
                Learn More
              </CTAButton>
            </div>
          </div>
          <TimelineSection />
          <LearningLanguageSection />
        </div>
      </section>

      <section className="mx-auto flex w-11/12 max-w-maxContent flex-col gap-14 bg-richblack-900 py-16 text-white">
        <InstructorSection />
        <div>
          <h2 className="mb-8 text-center text-3xl font-semibold md:text-4xl">
            Reviews from other learners
          </h2>
          <ReviewSlider />
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home
