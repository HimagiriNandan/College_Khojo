const nodemailer = require('nodemailer');
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,         
  secure: false,        
  auth: {
    user: process.env.USER,  // Your SMTP login (Email)
    pass: process.env.KEY,   // Your SMTP master password
  },
});

// Send email function
async function sendEmail(email, otp) {
  // Setting up the email options
  const mailOptions = {
    from: "khojocollege04@gmail.com", // Sender's email address
    to: email, // Recipient's email address
    subject: 'OTP Verification for Account Creation on Khojo College', // Email subject
    text: `Your OTP is: ${otp}`, // Plain-text body with OTP
    html: `
      <html>
        <body>
          <h1>Your OTP for account creation is: ${otp}</h1>
        </body>
      </html>`, // HTML content with OTP
  };

  try {
    // Sending the email using the transporter (await for async operation)
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response); // Log success message
  } catch (error) {
    console.error('Error sending email:', error); // Log the error if sending fails
  }
}

module.exports = sendEmail;
