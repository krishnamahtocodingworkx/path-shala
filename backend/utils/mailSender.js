const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      throw new Error("SMTP credentials are missing. Check your .env file.");
    }

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS, // Use an App Password if 2FA is enabled
      },
    });

    let info = await transporter.sendMail({
      from: "PathShala || ITS collage project ",
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    });
    console.log(info);
    return info;
  } catch (e) {
    console.log("mail send krne me error aa gya hai", e);
  }
};
console.log('smtp user', process.env.SMTP_USER);
if (process.env.NODE_ENV !== "production") {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS, // Use an App Password if 2FA is enabled
    },
  });
  transporter.verify((error, success) => {
    if (error) {
      console.error("SMTP Connection Error:", error);
    } else {
      console.log("✅ SMTP Server is ready");
    }
  });
}
module.exports = mailSender;
