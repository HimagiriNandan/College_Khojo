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

  try {
    const info = await transporter.sendMail(mailOptions);

    console.log(`${type} email sent successfully:`, info.messageId);

    return true;
  } catch (error) {
    console.error(`Error sending ${type} email:`, error);

    return false;
  }
}

module.exports = sendEmail;