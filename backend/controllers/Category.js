const Category = require("../models/Category");
require("../models/RatingAndReview");
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
    const allCategory = await Category.find({}).populate({
      path: "courses",
      match: { status: "Published" },
      select: "_id",
    });
    return res.status(200).json({
      success: true,
      message: SuccessMessage.TAGS_FETCHED,
      data: allCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

const coursePopulate = [
  { path: "instructor", select: "firstName lastName email image" },
  { path: "ratingAndReviews" },
];

exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;

    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: coursePopulate,
      })
      .exec();

    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: ExceptionMessage.CATEGORY_NOT_FOUND,
      });
    }

    const otherCategories = await Category.find({
      _id: { $ne: categoryId },
    })
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: coursePopulate,
      })
      .exec();

    const differentCategory =
      otherCategories.find((category) => category.courses?.length > 0) ||
      otherCategories[0] ||
      null;

    const allCategories = await Category.find()
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: coursePopulate,
      })
      .exec();

    const allCourses = allCategories.flatMap((category) => category.courses || []);
    const mostSellingCourses = allCourses
      .sort(
        (a, b) =>
          (b.studentsEnrolled?.length || 0) - (a.studentsEnrolled?.length || 0)
      )
      .slice(0, 10);

    return res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategory,
        mostSellingCourses,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: ExceptionMessage.INTERNAL_SERVER_ERROR,
      error: error.message,
    });
  }
}