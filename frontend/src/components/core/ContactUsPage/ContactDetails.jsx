import React from "react"
import * as Icon1 from "react-icons/bi"
import * as Icon3 from "react-icons/hi2"
import * as Icon2 from "react-icons/io5"

const contactDetails = [
  {
    icon: "HiChatBubbleLeftRight",
    heading: "Chat on us",
    description: "Our friendly team is here to help.",
    details: "info@pathshala.com",
  },
  {
    icon: "BiWorld",
    heading: "Visit us",
    description: "Come and say hello at our office HQ.",
    details:
      "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
  },
  {
    icon: "IoCall",
    heading: "Call us",
    description: "Mon - Fri from 8am to 5pm",
    details: "+123 456 7869",
  },
]

const ContactDetails = () => {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-richblack-700 bg-richblack-800 p-6 lg:p-8">
      {contactDetails.map((ele, i) => {
        const Icon = Icon1[ele.icon] || Icon2[ele.icon] || Icon3[ele.icon]
        return (
          <div className="flex gap-4 rounded-lg p-3" key={i}>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-richblack-700 text-yellow-50">
              {Icon && <Icon size={20} />}
            </div>
            <div className="space-y-1 text-sm text-richblack-200">
              <h2 className="text-lg font-semibold text-richblack-5">
                {ele.heading}
              </h2>
              <p>{ele.description}</p>
              <p className="font-semibold text-richblack-5">{ele.details}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ContactDetails
