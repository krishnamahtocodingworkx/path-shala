const Category = require("../models/Category");
const { ExceptionMessage, SuccessMessage } = require("../utils/constants");

//create Tag ka handler function
// showAllCategories,
// createCategory,
// categoryPageDetails,
//testing done
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const trimmedName = name?.trim();

    if (!trimmedName) {
      return res.status(400).json({
        success: false,
        message: ExceptionMessage.CATEGORY_NAME_REQUIRED,
      });
    }

    const existingCategory = await Category.findOne({
      $expr: { $eq: [{ $toLower: "$name" }, trimmedName.toLowerCase()] },
    });

    if (existingCategory) {
      return res.status(409).json({
        success: false,
        message: ExceptionMessage.CATEGORY_ALREADY_EXISTS,
      });
    }

    const categoryDetails = await Category.create({
      name: trimmedName,
      description: description?.trim() || trimmedName,
    });

    return res.status(200).json({
      success: true,
      message: SuccessMessage.CATEGORY_CREATED,
      data: categoryDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

//get all tags
//testing done
exports.showAllCategories = async (req, res) => {
  try {

    const allCategory = await Category.find({});
    return res.status(200).json({
      success: true,
      message: SuccessMessage.TAGS_FETCHED,
      data: allCategory
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

///categoryPageDetails 

exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body
    console.log("PRINTING CATEGORY ID: ", categoryId);
             // Get courses for the specified category
    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "courses",
        match: { status: "Published" },
        //yha pr rating ki wjh se dikkt hai
        // populate: "ratingAndReviews",
      })
      .exec()

    console.log("SELECTED COURSE", selectedCategory)
            // Handle the case when the category is not found
    if (!selectedCategory) {
      console.log("Category not found.")
      return res
        .status(404)
        .json({ success: false, message: ExceptionMessage.CATEGORY_NOT_FOUND })
    }
            // Handle the case when there are no courses
    if (selectedCategory.courses.length === 0) {
      console.log("No courses found for the selected category.")
      return res.status(404).json({
        success: false,
        message: ExceptionMessage.NO_COURSES_IN_CATEGORY,
      })
    }

    // console.log("yha tk thik hai sb kuch");

          //  Get courses for other categories
    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
    })

    console.log("yha tk thik hai sb kuch 2");
    //differentCategory me dikkt hai._id tk me

    //something happen bad  there
    
    // let differentCategory = await Category.findOne(
    //   categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
    //     ._id
    // )
    //   .populate({
    //     path: "courses",
    //     match: { status: "Published" },
    //   })
    //   .exec()



    //   console.log("Different COURSE", differentCategory)
            // Get top-selling courses across all categories
    
    const allCategories = await Category.find()
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: {
          path: "instructor",
      },
      })
      .exec()
    const allCourses = allCategories.flatMap((category) => category.courses)
    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10)
              //  console.log("mostSellingCourses COURSE", mostSellingCourses)
    res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        // differentCategory,
        mostSellingCourses,
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: ExceptionMessage.INTERNAL_SERVER_ERROR,
      error: error.message,
    })
  }
}