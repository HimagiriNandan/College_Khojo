const nodemailer = require("nodemailer");
require("dotenv").config();

const otpEmailTemplate = require("../templates/otpEmail");
const feedbackEmailTemplate = require("../templates/feedbackEmail");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER,
    pass: process.env.KEY,
  },
});


// Send OTP email
async function sendEmail(email, otp) {
  const template = otpEmailTemplate(otp);

  const mailOptions = {
    from: "khojocollege05@gmail.com",
    to: email,
    subject: template.subject,
    text: template.text,
    html: template.html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);

    console.log(
      "OTP email sent successfully:",
      info.messageId
    );
  } catch (error) {
    console.error("Error sending OTP email:", error);
  }
}


// Send feedback email to admin
async function sendFeedbackEmail({
  name,
  email,
  message,
  rating,
}) {
  const template = feedbackEmailTemplate({
    name,
    email,
    message,
    rating,
  });

  const mailOptions = {
    from: "khojocollege05@gmail.com",
    to: "khojocollege05@gmail.com",
    replyTo: email,
    subject: template.subject,
    text: template.text,
    html: template.html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);

    console.log(
      "Feedback email sent successfully:",
      info.messageId
    );

    return true;
  } catch (error) {
    console.error(
      "Error sending feedback email:",
      error
    );

    return false;
  }
}


module.exports = {
  sendEmail,
  sendFeedbackEmail,
};