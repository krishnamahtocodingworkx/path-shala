const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");

//testing
// createRating,
// getAverageRating,
// getAllRating,

//ye mai khud kr lunga aasan hai


//create rating and review
exports.createRating = async (req, res) => {
    try {

        //fetch data
        const { rating, review, courseId } = req.body;
        //verify is it correct or nor
        if (!rating || !review) {
            return res.status(401).json({
                success: false,
                message: "All fields are required",
            })
        }
        console.log("course id is", courseId);

        //check user is exit in userdase and course database or not
        //fetch the user
        const userId = req.user.id;


        //check user is course me enroll hai ya nahi

        const courseDetails = await Course.findOne({
            _id: courseId,
            studentsEnrolled: { $elemMatch: { $eq: userId } },
        })

        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: "Student is not enrolled in this course",
            })
        }

        //check user is already review a course or not
        const alreadyReviewed = await RatingAndReview.findOne({
            user: userId,
            course: courseId,
        });

        if (alreadyReviewed) {
            return res.status(403).json({
                success: false,
                message: 'Course is already reviewed by the user',
            });
        }
        //create rating and review
        const ratingReview = await RatingAndReview.create({
            rating, review,
            course: courseId,
            user: userId,
        });

        //update course with this rating/review
        const updatedCourseDetails = await Course.findByIdAndUpdate({ _id: courseId },
            {
                $push: {
                    ratingAndReviews: ratingReview._id,
                }
            },
            { new: true });
        console.log(updatedCourseDetails);
        //return response
        return res.status(200).json({
            success: true,
            message: "Rating and Review created Successfully",
            ratingReview,
        })




    } catch (error) {

        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })


    }
}
//get averagerating
//getAverageRating
exports.getAverageRating = async (req, res) => {
    try {
        //get course ID
        const courseId = req.body.courseId;
        //calculate avg rating

        const result = await RatingAndReview.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" },
                }
            }
        ])

        //return rating
        if (result.length > 0) {

            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating,
            })

        }

        //if no rating/Review exist
        return res.status(200).json({
            success: true,
            message: 'Average Rating is 0, no ratings given till now',
            averageRating: 0,
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

//getAllRatingAndReviews

exports.getAllRating = async (req, res) => {
    try {
        const allReviews = await RatingAndReview.find({})
            .sort({ rating: "desc" })
            .populate({
                path: "user",
                select: "firstName lastName email image",
            })
            .populate({
                path: "course",
                select: "courseName",
            })
            .exec();
        return res.status(200).json({
            success: true,
            message: "All reviews fetched successfully",
            data: allReviews,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}