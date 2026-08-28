const { contactUsEmail } = require("../mail/templates/contactFormRes")
const mailSender = require("../utils/mailSender")
const { ExceptionMessage, SuccessMessage } = require("../utils/constants");

exports.contactUsController = async (req, res) => {
  const { email, firstname, lastname, message, phoneNo, countrycode } = req.body
  console.log(req.body)
  try {
    const emailRes = await mailSender(
      email,
      "Your Data send successfully",
      contactUsEmail(email, firstname, lastname, message, phoneNo, countrycode)
    )
    // console.log("Email Res ", emailRes)
    return res.json({
      success: true,
      message: SuccessMessage.EMAIL_SENT,
    })
  } catch (error) {
    console.log("Error", error)
    console.log("Error message :", error.message)
    return res.json({
      success: false,
      message: ExceptionMessage.SOMETHING_WENT_WRONG,
    })
  }
}