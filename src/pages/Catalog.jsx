import React from 'react'
import { apiConnector } from '../services/apiconnector';
import { useParams } from 'react-router-dom';
import { categories } from '../services/apis';
import { useState, useEffect } from "react"

import { getCatalogaPageData } from '../services/operations/pageAndComponentData';

import CourseSlider from '../components/core/Catalog/CourseSlider';

import Course_Card from '../components/core/Catalog/Course_Card';

import Footer from '../components/common/Footer';


const Catalog = () => {

    const { catalogName } = useParams();
    const [catalogPageData, setCatalogPageData] = useState(null);

    const [categoryId, setCategoryId] = useState("");

    //fetch all categories
    useEffect(() => {

        const getCategories = async () => {


            const res = await apiConnector("GET", categories.CATEGORIES_API);
            const category_id =
                res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
            console.log(category_id);

            setCategoryId(category_id);
        }
        getCategories();
    }, [catalogName]);

    useEffect(() => {
        const getCategoryDetails = async () => {
            try {
                const res = await getCatalogaPageData(categoryId);
                console.log('printing res', res);
                console.log(res?.data?.selectedCategory?.name)


                setCatalogPageData(res);
                console.log(catalogPageData?.data?.selectedCategory?.name)

            } catch (error) {
                console.log(error);
            }
        }

        if (categoryId) {

            getCategoryDetails();
        }

    }, [categoryId]);

    return (
        <div className='text-white'>

            <div className="bg-richblack-800">
                <div className="flex flex-col gap-5  w-11/12 bg-richblack-800 max-w-maxContent mx-auto h-[250px] justify-center">
                    <p className="font-inter text-richblack-200">{`Home  /  Catalog  /  `}
                        <span className="text-yellow-50 ">
                            {catalogPageData?.data?.selectedCategory?.name}
                        </span>
                    </p>
                    <p className="text-4xl" >{catalogPageData?.data?.selectedCategory?.name}</p>
                    <p className="text-richblack-200" >{catalogPageData?.data?.selectedCategory?.description}</p>
                </div>
            </div>


            <div>
                {/* section1 */}

                <div className="mt-7">
                <div className="w-11/12 mx-auto ">
                <div className="text-4xl font-semibold">Courses to get you started</div>
                    <div className='flex gap-x-3 mt-5'>
                        <p>Most Popular</p>
                        <p>New</p>
                    </div>

                    <div className="mt-2">
                        <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.courses} />

                    </div>

                </div>
                </div>

                {/* section2 */}
                <div>
                    <p>Top Courses in{catalogPageData?.data?.selectedCategory?.name}</p>
                    <div>
                        <CourseSlider Courses={catalogPageData?.data?.differentCategory?.courses} />
                    </div>

                </div>


                {/* section3 */}
                <div className="mt-5">
                <div className="w-11/12 max-w-maxContent mx-auto">
                    <div className="text-4xl">Frequently Bought</div>
                    <div className="py-8">
                        <div className="grid gird-cols-1 lg:grid-cols-2 gap-5">

                            {
                                catalogPageData?.data?.mostSellingCourses.slice(0, 4).map((course, index) => (
                                    <Course_Card course={course} key={index} Height={"h-[400px]"} />
                                ))
                            }
                        </div>

                    </div>
                </div>
                </div>


            </div>
            <Footer />
        </div>
    )
}

export default Catalog