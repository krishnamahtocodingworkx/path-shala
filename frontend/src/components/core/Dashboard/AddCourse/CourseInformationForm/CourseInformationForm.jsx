import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"

import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../../services/operations/courseDetailsAPI"
import { setCourse, setStep } from "../../../../../slices/courseSlice"
import { COURSE_STATUS } from "../../../../../utils/constants"
import IconBtn from "../../../../common/IconBtn"
import Upload from "../Upload"
// import ChipInput from "./ChipInput"
import RequirementsField from "./RequirementField"

export default function CourseInformationForm() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { course, editCourse } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)
  const [courseCategories, setCourseCategories] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true)
      const categories = await fetchCourseCategories()
      if (categories.length > 0) {
        // console.log("categories", categories)
        setCourseCategories(categories)
      }
      setLoading(false)
    }
    // if form is in edit mode
    if (editCourse) {
      // console.log("data populated", editCourse)
      setValue("courseTitle", course.courseName)
      setValue("courseShortDesc", course.courseDescription)
      setValue("coursePrice", course.price)
      setValue("courseTags", course.tag)
      setValue("courseBenefits", course.whatYouWillLearn)
      setValue("courseCategory", course.category)
      setValue("courseRequirements", course.instructions)
      setValue("courseImage", course.thumbnail)
    }
    getCategories()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isFormUpdated = () => {
    const currentValues = getValues()
    // console.log("changes after editing form values:", currentValues)
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseRequirements.toString() !==
        course.instructions.toString() ||
      currentValues.courseImage !== course.thumbnail
    ) {
      return true
    }
    return false
  }

  //   handle next button click
  const onSubmit = async (data) => {
    // console.log(data)

    if (editCourse) {
      // const currentValues = getValues()
      // console.log("changes after editing form values:", currentValues)
      // console.log("now course:", course)
      // console.log("Has Form Changed:", isFormUpdated())
      if (isFormUpdated()) {
        const currentValues = getValues()
        const formData = new FormData()
        // console.log(data)
        formData.append("courseId", course._id)
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle)
        }
        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc)
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice)
        }
        if (currentValues.courseTags.toString() !== course.tag.toString()) {
          formData.append("tag", JSON.stringify(data.courseTags))
        }
        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits)
        }
        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory)
        }
        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          )
        }
        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnailImage", data.courseImage)
        }
        // console.log("Edit Form data: ", formData)
        setLoading(true)
        const result = await editCourseDetails(formData, token)
        setLoading(false)
        if (result) {
          dispatch(setStep(2))
          dispatch(setCourse(result))
        }
      } else {
        toast.error("No changes made to the form")
      }
      return
    }

    const formData = new FormData()
    formData.append("courseName", data.courseTitle)
    formData.append("courseDescription", data.courseShortDesc)
    formData.append("price", data.coursePrice)
    formData.append("tag", JSON.stringify(data.courseTags))
    formData.append("whatYouWillLearn", data.courseBenefits)
    formData.append("category", data.courseCategory)
    formData.append("status", COURSE_STATUS.DRAFT)
    formData.append("instructions", JSON.stringify(data.courseRequirements))
    formData.append("thumbnailImage", data.courseImage)
    setLoading(true)
    const result = await addCourseDetails(formData, token)
    if (result) {
      dispatch(setStep(2))
      dispatch(setCourse(result))
    }
    setLoading(false)
  }

  return (
    <form
  onSubmit={handleSubmit(onSubmit)}
  className="space-y-6 rounded-lg border border-gray-700 bg-gray-900 p-8 text-white shadow-lg"
>
  {/* Course Title */}
  <div className="flex flex-col space-y-2">
    <label className="text-sm font-medium" htmlFor="courseTitle">
      Course Title <sup className="text-red-400">*</sup>
    </label>
    <input
      id="courseTitle"
      placeholder="Enter Course Title"
      {...register("courseTitle", { required: true })}
      className="w-full rounded-md border border-gray-600 bg-gray-800 p-3 text-black focus:border-yellow-400 focus:outline-none"
    />
    {errors.courseTitle && (
      <span className="text-xs text-red-400">Course title is required</span>
    )}
  </div>

  {/* Course Short Description */}
  <div className="flex flex-col space-y-2">
    <label className="text-sm font-medium" htmlFor="courseShortDesc">
      Course Short Description <sup className="text-red-400">*</sup>
    </label>
    <textarea
      id="courseShortDesc"
      placeholder="Enter Description"
      {...register("courseShortDesc", { required: true })}
      className="w-full min-h-[120px] rounded-md border border-gray-600 bg-gray-800 p-3 text-black focus:border-yellow-400 focus:outline-none"
    />
    {errors.courseShortDesc && (
      <span className="text-xs text-red-400">
        Course Description is required
      </span>
    )}
  </div>

  {/* Course Price */}
  <div className="flex flex-col space-y-2">
    <label className="text-sm font-medium" htmlFor="coursePrice">
      Course Price <sup className="text-red-400">*</sup>
    </label>
    <div className="relative">
      <input
        id="coursePrice"
        placeholder="Enter Course Price"
        {...register("coursePrice", {
          required: true,
          valueAsNumber: true,
          pattern: { value: /^(0|[1-9]\d*)(\.\d+)?$/ },
        })}
        className="w-full rounded-md border border-gray-600 bg-gray-800 p-3 pl-10 text-black focus:border-yellow-400 focus:outline-none"
      />
      <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-400" />
    </div>
    {errors.coursePrice && (
      <span className="text-xs text-red-400">Course Price is required</span>
    )}
  </div>

  {/* Course Category */}
  <div className="flex flex-col space-y-2">
    <label className="text-sm font-medium" htmlFor="courseCategory">
      Course Category <sup className="text-red-400">*</sup>
    </label>
    <select
      {...register("courseCategory", { required: true })}
      defaultValue=""
      id="courseCategory"
      className="w-full rounded-md border border-gray-600 bg-gray-800 p-3 text-black focus:border-yellow-400 focus:outline-none"
    >
      <option value="" disabled>
        Choose a Category
      </option>
      {!loading &&
        courseCategories?.map((category, index) => (
          <option key={index} value={category?._id}>
            {category?.name}
          </option>
        ))}
    </select>
    {errors.courseCategory && (
      <span className="text-xs text-red-400">
        Course Category is required
      </span>
    )}
  </div>

  {/* Course Thumbnail Image */}
  <Upload
    name="courseImage"
    label="Course Thumbnail"
    register={register}
    setValue={setValue}
    errors={errors}
    editData={editCourse ? course?.thumbnail : null}
  />

  {/* Benefits of the course */}
  <div className="flex flex-col space-y-2">
    <label className="text-sm font-medium" htmlFor="courseBenefits">
      Benefits of the Course <sup className="text-red-400">*</sup>
    </label>
    <textarea
      id="courseBenefits"
      placeholder="Enter benefits of the course"
      {...register("courseBenefits", { required: true })}
      className="w-full min-h-[120px] rounded-md border border-gray-600 bg-gray-800 p-3 text-black focus:border-yellow-400 focus:outline-none"
    />
    {errors.courseBenefits && (
      <span className="text-xs text-red-400">
        Benefits of the course is required
      </span>
    )}
  </div>

  {/* Requirements/Instructions */}
  <RequirementsField
    name="courseRequirements"
    label="Requirements/Instructions"
    register={register}
    setValue={setValue}
    errors={errors}
    getValues={getValues}
  />

  {/* Buttons */}
  <div className="flex justify-end gap-x-3">
    {editCourse && (
      <button
        onClick={() => dispatch(setStep(2))}
        disabled={loading}
        className="rounded-md bg-gray-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-gray-500"
      >
        Continue Without Saving
      </button>
    )}
    <button
      type="submit"
      disabled={loading}
      className="flex items-center gap-x-2 rounded-md bg-yellow-500 px-5 py-2 text-sm font-semibold text-black transition hover:bg-yellow-600"
    >
      {!editCourse ? "Next" : "Save Changes"}
      <MdNavigateNext />
    </button>
  </div>
</form>

  )
}