const nodemailer = require("nodemailer");
require("dotenv").config();

const templates = require("../utils");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER,
    pass: process.env.KEY,
  },
});

const emailTemplates = {
  otp: (data) => templates.otpTemplate(data.otp),
  feedback: (data) => templates.feedbackTemplate(data),
};

async function sendEmail({ type, to, data, replyTo }) {
  const createTemplate = emailTemplates[type];

  if (!createTemplate) {
    return {
      success: false,
      message: `Unsupported email type: ${type}`,
    };
  }

  try {
    const template = createTemplate(data);

    const mailOptions = {
      from: "khojocollege05@gmail.com",
      to,
      subject: template.subject,
      text: template.text,
      html: template.html,
    };

    if (replyTo) {
      mailOptions.replyTo = replyTo;
    }

    await transporter.sendMail(mailOptions);

    return {
      success: true,
      message: `${type} email sent successfully.`,
    };
  } catch (error) {
    return {
      success: false,
      message: `Unable to send ${type} email: ${error.message}`,
    };
  }
}

module.exports = sendEmail;