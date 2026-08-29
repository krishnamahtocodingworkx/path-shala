import React, { useEffect, useMemo, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { HiOutlineHome } from "react-icons/hi"
import { MdOutlineArrowForwardIos } from "react-icons/md"

import Footer from "../components/common/Footer"
import CourseCard from "../components/core/Catalog/Course_Card"
import CourseSlider from "../components/core/Catalog/CourseSlider"
import { apiConnector } from "../services/apiconnector"
import { categories } from "../services/apis"
import { getCatalogaPageData } from "../services/operations/pageAndComponentData"
import { toCatalogSlug } from "../utils/catalogSlug"

const TABS = [
  { id: "popular", label: "Most Popular" },
  { id: "new", label: "New" },
]

const Catalog = () => {
  const { catalogName } = useParams()
  const [allCategories, setAllCategories] = useState([])
  const [catalogPageData, setCatalogPageData] = useState(null)
  const [categoryId, setCategoryId] = useState("")
  const [activeTab, setActiveTab] = useState("popular")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true)
      setError("")
      setCatalogPageData(null)
      setCategoryId("")
      setActiveTab("popular")

      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        const categoryList = res?.data?.data || []
        setAllCategories(categoryList)

        const matchedCategory = categoryList.find(
          (ct) => toCatalogSlug(ct.name) === catalogName
        )

        if (!matchedCategory) {
          setError("This category could not be found.")
          setLoading(false)
          return
        }

        setCategoryId(matchedCategory._id)
      } catch (err) {
        console.log(err)
        setError("Unable to load categories. Please try again.")
        setLoading(false)
      }
    }

    getCategories()
  }, [catalogName])

  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const res = await getCatalogaPageData(categoryId)
        if (!res?.success) {
          setError(res?.message || "Unable to load catalog data.")
          setCatalogPageData(null)
        } else {
          setCatalogPageData(res)
        }
      } catch (err) {
        console.log(err)
        setError("Unable to load catalog data. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    if (categoryId) {
      getCategoryDetails()
    }
  }, [categoryId])

  const selectedCategory = catalogPageData?.data?.selectedCategory
  const differentCategory = catalogPageData?.data?.differentCategory
  const mostSellingCourses = catalogPageData?.data?.mostSellingCourses || []

  const displayedCourses = useMemo(() => {
    const courses = [...(selectedCategory?.courses || [])]
    if (activeTab === "new") {
      return courses.sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      )
    }
    return courses.sort(
      (a, b) =>
        (b.studentsEnrolled?.length || 0) - (a.studentsEnrolled?.length || 0)
    )
  }, [selectedCategory, activeTab])

  const otherCategories = allCategories.filter(
    (category) => category._id !== selectedCategory?._id
  )

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col text-white">
      <div className="bg-richblack-800">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col gap-4 py-10 md:py-14">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-richblack-300">
            <Link
              to="/"
              className="inline-flex items-center gap-1 transition hover:text-yellow-50"
            >
              <HiOutlineHome className="text-base" />
              Home
            </Link>
            <MdOutlineArrowForwardIos className="text-xs text-richblack-500" />
            <span>Catalog</span>
            <MdOutlineArrowForwardIos className="text-xs text-richblack-500" />
            <span className="font-medium text-yellow-50">
              {selectedCategory?.name || catalogName?.replace(/-/g, " ")}
            </span>
          </nav>

          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl space-y-3">
              <h1 className="text-3xl font-bold capitalize md:text-4xl">
                {selectedCategory?.name || catalogName?.replace(/-/g, " ")}
              </h1>
              <p className="text-base leading-relaxed text-richblack-200 md:text-lg">
                {selectedCategory?.description ||
                  "Explore published courses in this category."}
              </p>
            </div>
            {!loading && selectedCategory && (
              <div className="w-fit rounded-full border border-richblack-600 bg-richblack-700 px-4 py-2 text-sm text-richblack-100">
                {selectedCategory?.courses?.length || 0}{" "}
                {(selectedCategory?.courses?.length || 0) === 1 ? "course" : "courses"}
              </div>
            )}
          </div>

          {otherCategories.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {otherCategories.slice(0, 8).map((category) => (
                <Link
                  key={category._id}
                  to={`/catalog/${toCatalogSlug(category.name)}`}
                  className="rounded-full border border-richblack-600 bg-richblack-900 px-3 py-1.5 text-xs text-richblack-200 transition hover:border-yellow-50 hover:text-yellow-50 md:text-sm"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex-1">
        {loading ? (
          <CatalogSkeleton />
        ) : error ? (
          <div className="mx-auto w-11/12 max-w-maxContent py-20 text-center">
            <h2 className="text-2xl font-semibold">Catalog unavailable</h2>
            <p className="mt-3 text-richblack-200">{error}</p>
            <Link
              to="/"
              className="mt-6 inline-block rounded-md bg-yellow-50 px-5 py-2.5 font-semibold text-richblack-900 transition hover:bg-yellow-100"
            >
              Back to Home
            </Link>
          </div>
        ) : (
          <>
            <section className="mx-auto mt-10 w-11/12 max-w-maxContent md:mt-14">
              <h2 className="text-2xl font-semibold md:text-3xl">
                Courses to get you started
              </h2>
              <div className="mt-4 flex gap-6 border-b border-richblack-700 text-richblack-200">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-3 text-sm font-medium transition md:text-base ${
                      activeTab === tab.id
                        ? "border-b-2 border-yellow-50 text-yellow-50"
                        : "hover:text-richblack-5"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="mt-8">
                <CourseSlider Courses={displayedCourses} />
              </div>
            </section>

            {differentCategory?.courses?.length > 0 && (
              <section className="mx-auto mt-14 w-11/12 max-w-maxContent">
                <h2 className="text-2xl font-semibold md:text-3xl">
                  Top courses in{" "}
                  <span className="text-yellow-50">{differentCategory.name}</span>
                </h2>
                <div className="mt-8">
                  <CourseSlider Courses={differentCategory.courses} />
                </div>
              </section>
            )}

            <section className="mx-auto mt-14 w-11/12 max-w-maxContent pb-8">
              <h2 className="text-2xl font-semibold md:text-3xl">
                Frequently bought
              </h2>
              {mostSellingCourses.length ? (
                <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {mostSellingCourses.slice(0, 4).map((course) => (
                    <CourseCard
                      course={course}
                      key={course._id}
                      Height="h-[220px] md:h-[260px]"
                    />
                  ))}
                </div>
              ) : (
                <p className="mt-8 text-center text-lg text-richblack-200">
                  No popular courses yet. Check back soon.
                </p>
              )}
            </section>
          </>
        )}
      </div>

      <Footer />
    </div>
  )
}

const CatalogSkeleton = () => (
  <div className="mx-auto w-11/12 max-w-maxContent animate-pulse py-14">
    <div className="h-8 w-64 rounded bg-richblack-700" />
    <div className="mt-6 h-4 w-40 rounded bg-richblack-700" />
    <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
      {[1, 2, 3].map((item) => (
        <div key={item} className="h-64 rounded-xl bg-richblack-800" />
      ))}
    </div>
  </div>
)

export default Catalog
