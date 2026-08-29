import React from "react"

const Stats = [
  { count: "5K", label: "Active Students" },
  { count: "10+", label: "Mentors" },
  { count: "200+", label: "Courses" },
  { count: "50+", label: "Awards" },
]

const StatsComponent = () => {
  return (
    <div className="bg-richblack-800">
      <div className="mx-auto grid w-11/12 max-w-maxContent grid-cols-2 text-center md:grid-cols-4">
        {Stats.map((data, index) => (
          <div className="flex flex-col gap-2 py-10" key={index}>
            <h3 className="text-3xl font-bold text-richblack-5">{data.count}</h3>
            <p className="text-sm font-semibold text-richblack-400 md:text-base">
              {data.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StatsComponent
