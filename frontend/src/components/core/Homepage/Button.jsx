import React from "react"
import { Link } from "react-router-dom"

const Button = ({ children, active, linkto }) => {
  return (
    <Link to={linkto}>
      <div
        className={`rounded-md px-6 py-3 text-center text-sm font-bold transition duration-200 hover:scale-95 ${
          active
            ? "bg-yellow-50 text-richblack-900 shadow-sm hover:shadow-yellow-50/20"
            : "bg-richblack-800 text-richblack-5 hover:bg-richblack-700"
        }`}
      >
        {children}
      </div>
    </Link>
  )
}

export default Button
