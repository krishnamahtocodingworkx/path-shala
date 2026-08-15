const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const crypto = require("crypto")
const mailSender = require("../utils/mailSender");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail")
const CourseProgress = require("../models/CourseProgress")
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const {mongoose} = require("mongoose");
const { response } = require("express");


//initiate the razorpay order
exports.capturePayment = async (req, res) => {
    const { courses } = req.body
    const userId = req.user.id
    if (courses.length === 0) {
      return res.json({ success: false, message: "Please Provide Course ID" })
    }
  
    let total_amount = 0
  
    for (const course_id of courses) {
      let course
      try {
        // Find the course by its ID
        course = await Course.findById(course_id)
  
        // If the course is not found, return an error
        if (!course) {
          return res
            .status(200)
            .json({ success: false, message: "Could not find the Course" })
        }
  
        // Check if the user is already enrolled in the course
        const uid = new mongoose.Types.ObjectId(userId)
        if (course.studentsEnrolled.includes(uid)) {
          return res
            .status(200)
            .json({ success: false, message: "Student is already Enrolled" })
        }
  
        // Add the price of the course to the total amount
        total_amount += course.price
      } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error.message })
      }
    }
  
    const options = {
      amount: total_amount * 100,
      currency: "INR",
      receipt: Math.random(Date.now()).toString(),
    }
  
    try {
      // Initiate the payment using Razorpay
      const paymentResponse = await instance.orders.create(options)
      console.log(paymentResponse)
      res.json({
        success: true,
        data: paymentResponse,
      })
    } catch (error) {
      console.log(error)
      res
        .status(500)
        .json({ success: false, message: "Could not initiate order." })
    }
  }

//Verify the payment
exports.verifyPayment = async(req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    if(!razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature || !courses || !userId) {
            return res.status(200).json({success:false, message:"Payment Failed"});
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

        if(expectedSignature === razorpay_signature) {
            //enroll karwao student ko
            await enrollStudents(courses, userId, res);
            //return res
            return res.status(200).json({success:true, message:"Payment Verified"});
        }
        return res.status(200).json({success:"false", message:"Payment Failed"});

}


const enrollStudents = async(courses, userId, res) => {

    if(!courses || !userId) {
        return res.status(400).json({success:false,message:"Please Provide data for Courses or UserId"});
    }

    for(const courseId of courses) {
        try{
            //find the course and enroll the student in it
        const enrolledCourse = await Course.findOneAndUpdate(
            {_id:courseId},
            {$push:{studentsEnrolled:userId}},
            {new:true},
        )

        if(!enrolledCourse) {
            return res.status(500).json({success:false,message:"Course not Found"});
        }


        const courseProgress = await CourseProgress.create({
          courseID: courseId,
          userId: userId,
          completedVideos: [],
        })

        //find the student and add the course to their list of enrolledCOurses
        const enrolledStudent = await User.findByIdAndUpdate(userId,
            {$push:{
                courses: courseId,
                courseProgress: courseProgress._id,
            }},{new:true})
            
        ///bachhe ko mail send kardo
        const emailResponse = await mailSender(
            enrollStudents.email,
            `Successfully Enrolled into ${enrolledCourse.courseName}`,
            courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName}`)
        )    
        //console.log("Email Sent Successfully", emailResponse.response);
        }
        catch(error) {
            console.log(error);
            return res.status(500).json({success:false, message:error.message});
        }
    }

}
exports.sendPaymentSuccessEmail = async(req, res) => {
    const {orderId, paymentId, amount} = req.body;

    const userId = req.user.id;

    if(!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({success:false, message:"Please provide all the fields"});
    }

    try{
        //student ko dhundo
        const enrolledStudent = await User.findById(userId);
        await mailSender(
            enrolledStudent.email,
            `Payment Recieved`,
             paymentSuccessEmail(`${enrolledStudent.firstName}`,
             amount/100,orderId, paymentId)
        )
    }
    catch(error) {
        console.log("error in sending mail", error)
        return res.status(500).json({success:false, message:"Could not send email"})
    }
}


// //testing
// // capturePayment, verifySignature
// //baki hai krna 
// const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");

// const {mongoose} = require("mongoose");


// exports.capturePayment = async (req, res) => {
//     try {
//         //get courseId and userId
//         const { course_id } = req.body;
//         const userId = req.user.id;

//         //validation
//     //    ######
//         if (!course_id) {
//             return res.json({
//                 success: false,
//                 message: "required valid course id",
//             })
//         }
//         //valid course id hai ya nhi 
//         let course;
//         try {
//             course = await Course.findById(course_id);
//             if (!course) {
//                 return res.json({
//                     success: false,
//                     message: "Could not find the course",
//                 })
//             }
//             //check user already pay for this course or not

//             //convert user id(string) into object id
//             const uid = new mongoose.Types.ObjectId(userId);

//             if (course.studentsEnrolled.includes(uid)) {
//                 return res.status(200).json({
//                     success: false,
//                     message: "Student is already enrolled"
//                 })

//             }

//             //order create
//             // #''
//             const amount = course.price;
//             const currency = "INR";

//             const options = {
//                 amount: amount * 100,
//                 currency,
//                 receipt: Math.random(Date.now()).toString(),
//                 notes: {
//                     courseId: course_id,
//                     userId,
//                 }
//             }

//             try {
//                 //initiate the payment using razorpay
//                 const paymentResponse = await instance.orders.create(options);
//                 console.log(paymentResponse)
//                 return res.status(200).json({
//                     success: true,
//                     courseName: course.courseName,
//                     courseDescription: course.courseDescription,
//                     thumbnail: course.thumbnail,
//                     orderId: paymentResponse.id,
//                     currency: paymentResponse.currency,
//                     amount: paymentResponse.amount,
//                 })
//             } catch (err) {
//                 console.log(err);
//                 res.json({
//                     success: false,
//                     message: "Could not initiate order",
//                 })
//             }
//         } catch (error) {
//             console.log(error);
//             return res.status(500).json({
//                 success: false,
//                 message: error.message,

//             })

//         }
//         //valid courseDetail hai ya nhi
//         //user already pay for the same course
//         //order create
//         //return response

//     } catch (e) {

//     }
// }

// //verify signature
// exports.verifySignature = async (req, res) => {
//     try {
//         const webhookSecret = "12345678";

//         const signature = req.headers["x-razorpay-signature"];

//         //sha ->secure hasing algorithm
//         //(i/p->123 - o/p->f)this is called hashing
//         // or
//         //Hmac->hashed based masseage authentication code(hash algorithm + secretkey use krta h ye):hw:what is checksome
//         const shasum = crypto.createHmac("sha256", webhookSecret);

//         //shasum ek object mil gya h 
//         //ab isko string format me convert kro
//         shasum.update(JSON.stringify(req.body));

//         const digest = shasum.digest("hex");


//         //ab webhook or digest ko match krao
//         if (signature === digest) {
//             console.log("Payment is authorized");

//             //course id and user id nikalo notes me se
//             const { courseId, userId } = req.body.payload.payment.entity.notes;

//             try {
//                 //fulfill the action

//                 //find the course and enroll the student in it
//                 const enrolledCourse = await course.findOneAndUpdate({ _id: courseId },
//                     { $push: { studentsEnroolled: userId } }, { new: true });

//                 if (!enrolledCourse) {
//                     return res.status(500).json({
//                         success: false,
//                         message: "Course not found",
//                     })
//                 }

//                 //find the student and add the course to their list enrolled coursed me
//                 const enrolledStudent = await User.findOneAndUpdate({_id:userId},
//                 {$push:{courses:courseId}},
//                 {new:true},
//                 );

//                 console.log(enrolledStudent);

//                 //mail send krdo
//                 const emailResponse = await mailSender(enrolledStudent.email,
//                 "Congratulations from codehelp",
//                 "Congratualtions you are onboarded into new codehelp course")

//                 console.log(emailResponse);

//                 return res.status(200).json({
//                     success:true,
//                     message:"Signature verified successfuly",
//                 })

//             } catch (err) {
//                 console.log(err);
//                 return res.status(500).json({
//                     success:false,
//                     message:err.message,
//                 })
//             }
//         }else{
//             return res.status(400).json({
//                 success:false,
//                 message:"Invalid request",
//             })
//         }


//     } catch (error) {

//     }
// }