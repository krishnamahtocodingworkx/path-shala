import React from "react";
import { apiConnector } from "../services/apiconnector";
import { useParams } from "react-router-dom";
import { categories } from "../services/apis";
import { useState, useEffect } from "react";

import { getCatalogaPageData } from "../services/operations/pageAndComponentData";

import CourseSlider from "../components/core/Catalog/CourseSlider";

import Course_Card from "../components/core/Catalog/Course_Card";

import Footer from "../components/common/Footer";

const Catalog = () => {
  const { catalogName } = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);

  const [categoryId, setCategoryId] = useState("");

  //fetch all categories
  useEffect(() => {
    const getCategories = async () => {
      const res = await apiConnector("GET", categories.CATEGORIES_API);
      const category_id = res?.data?.data?.filter(
        (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
      )[0]._id;
      console.log(category_id);

      setCategoryId(category_id);
    };
    getCategories();
  }, [catalogName]);

  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const res = await getCatalogaPageData(categoryId);
        console.log("printing res", res);
        console.log(res?.data?.selectedCategory?.name);

        setCatalogPageData(res);
        console.log(catalogPageData?.data?.selectedCategory?.name);
      } catch (error) {
        console.log(error);
      }
    };

    if (categoryId) {
      getCategoryDetails();
    }
  }, [categoryId]);

  return (
    <div className="text-white">
      {/* Hero Section */}
      <div className="bg-richblack-800 py-10">
        <div className="w-11/12 max-w-maxContent mx-auto flex flex-col gap-4 justify-center">
          <p className="font-inter text-richblack-200 text-sm">
            Home / Catalog /
            <span className="text-yellow-50 font-semibold">
              {catalogPageData?.data?.selectedCategory?.name}
            </span>
          </p>
          <h1 className="text-4xl font-bold text-white">
            {catalogPageData?.data?.selectedCategory?.name}
          </h1>
          <p className="text-richblack-200 text-lg">
            {catalogPageData?.data?.selectedCategory?.description}
          </p>
        </div>
      </div>

      {/* Courses to Get Started */}
      <div className="mt-10 w-11/12 max-w-maxContent mx-auto">
        <h2 className="text-4xl font-semibold">Courses to Get You Started</h2>
        <div className="flex gap-x-5 mt-4 text-lg text-richblack-200">
          <p className="cursor-pointer hover:text-yellow-50 transition-all">
            Most Popular
          </p>
          <p className="cursor-pointer hover:text-yellow-50 transition-all">
            New
          </p>
        </div>

        <div className="mt-6">
          <CourseSlider
            Courses={catalogPageData?.data?.selectedCategory?.courses}
          />
        </div>
      </div>

      {/* Top Courses in Category */}
      <div className="mt-14 w-11/12 max-w-maxContent mx-auto">
        <h2 className="text-4xl font-semibold">
          Top Courses in{" "}
          <span className="text-yellow-50">
            {catalogPageData?.data?.selectedCategory?.name}
          </span>
        </h2>
        <div className="mt-6">
          <CourseSlider
            Courses={catalogPageData?.data?.differentCategory?.courses}
          />
        </div>
      </div>

      {/* Frequently Bought */}
      <div className="mt-16 w-11/12 max-w-maxContent mx-auto">
        <h2 className="text-4xl font-semibold">Frequently Bought</h2>
        <div className="py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {catalogPageData?.data?.mostSellingCourses
              .slice(0, 4)
              .map((course, index) => (
                <Course_Card course={course} key={index} Height={"h-[400px]"} />
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Catalog;
