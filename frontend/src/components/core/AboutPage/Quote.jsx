import React from "react"

import HighlightText from "../Homepage/HighlightText"

const Quote = () => {
  return (
    <p className="mx-auto max-w-5xl text-center text-xl font-semibold leading-relaxed text-richblack-5 md:text-4xl md:leading-snug">
      We are passionate about revolutionizing the way we learn. Our innovative
      platform <HighlightText text="combines technology" />,{" "}
      <span className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text font-bold text-transparent">
        expertise
      </span>
      , and community to create an
      <span className="bg-gradient-to-b from-[#E65C00] to-[#F9D423] bg-clip-text font-bold text-transparent">
        {" "}
        unparalleled educational experience.
      </span>
    </p>
  )
}

export default Quote
