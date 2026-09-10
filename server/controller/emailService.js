const nodemailer = require("nodemailer");
require("dotenv").config();

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
  const mailOptions = {
    from: "khojocollege05@gmail.com",
    to: email,
    subject: "OTP Verification for Khojo College",

    // Plain-text fallback
    text: `
Your OTP for Khojo College is: ${otp}

This OTP is required to verify your account.
Please do not share this OTP with anyone.

— The Khojo College Team
    `,

    // HTML email template
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>OTP Verification - Khojo College</title>
      </head>

      <body style="
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
        font-family: Arial, Helvetica, sans-serif;
      ">

        <div style="
          width: 100%;
          padding: 30px 0;
          background-color: #f4f4f4;
        ">

          <div style="
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 10px;
            overflow: hidden;
          ">

            <!-- Header -->
            <div style="
              background-color: #05B97D;
              padding: 30px 20px;
              text-align: center;
            ">

              <div style="
                color: #ffffff;
                font-size: 13px;
                font-weight: bold;
                letter-spacing: 0.5px;
                margin-bottom: 8px;
              ">
                WELCOME TO
              </div>

              <div style="
                color: #ffffff;
                font-size: 28px;
                font-weight: bold;
              ">
                Khojo College
              </div>

              <div style="
                color: #ffffff;
                font-size: 13px;
                margin-top: 8px;
              ">
                Learn • Grow • Succeed
              </div>

            </div>


            <!-- Main Content -->
            <div style="
              padding: 30px;
              color: #202124;
            ">

              <h2 style="
                margin: 0 0 10px;
                font-size: 22px;
                color: #202124;
              ">
                Verify your email 🔐
              </h2>

              <p style="
                margin: 0 0 25px;
                color: #5f6368;
                font-size: 14px;
                line-height: 1.6;
              ">
                Thanks for joining Khojo College! Use the OTP below to
                verify your email address and continue with your account.
              </p>


              <!-- OTP Box -->
              <div style="
                border-top: 1px solid #eeeeee;
                border-bottom: 1px solid #eeeeee;
                padding: 25px 0;
                text-align: center;
              ">

                <p style="
                  margin: 0 0 12px;
                  font-size: 13px;
                  color: #5f6368;
                ">
                  Your verification code
                </p>

                <div style="
                  display: inline-block;
                  background-color: #f8fffc;
                  border: 2px solid #05B97D;
                  border-radius: 8px;
                  padding: 15px 30px;
                  color: #05B97D;
                  font-size: 30px;
                  font-weight: bold;
                  letter-spacing: 6px;
                ">
                  ${otp}
                </div>

              </div>


              <!-- Security Information -->
              <div style="
                margin-top: 25px;
                background-color: #f8fffc;
                border-left: 4px solid #05B97D;
                padding: 15px;
                border-radius: 4px;
              ">

                <p style="
                  margin: 0;
                  color: #5f6368;
                  font-size: 13px;
                  line-height: 1.6;
                ">
                  Please do not share this OTP with anyone.
                  If you did not request this code, you can safely ignore
                  this email.
                </p>

              </div>


              <!-- Quote -->
              <div style="
                margin-top: 30px;
                border: 1px solid #05B97D;
                border-radius: 6px;
                padding: 18px;
                background-color: #f8fffc;
              ">

                <p style="
                  margin: 0;
                  font-size: 13px;
                  font-style: italic;
                  color: #555555;
                  line-height: 1.5;
                ">
                  "The best time to start learning was yesterday.
                  The second best time is right now."
                </p>

                <p style="
                  margin: 10px 0 0;
                  font-size: 12px;
                  font-weight: bold;
                  color: #05B97D;
                ">
                  — The Khojo College Team
                </p>

              </div>

            </div>


            <!-- Footer -->
            <div style="
              border-top: 1px solid #eeeeee;
              padding: 20px 30px;
              color: #9aa0a6;
              font-size: 11px;
              line-height: 1.6;
            ">

              <p style="margin: 0 0 5px;">
                This is an automated email from Khojo College.
              </p>

              <p style="margin: 0;">
                Please do not reply directly to this email.
              </p>

            </div>

          </div>

        </div>

      </body>
      </html>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);

    console.log("OTP email sent successfully:", info.messageId);
  } catch (error) {
    console.error("Error sending OTP email:", error);
  }
}


// Send feedback email to admin
async function sendFeedbackEmail({ name, email, message, rating }) {
  const adminEmail = "khojocollege05@gmail.com";

  const mailOptions = {
    from: "khojocollege05@gmail.com",
    to: adminEmail,
    replyTo: email,
    subject: `New Feedback Received from ${name}`,

    text: `
New Feedback Received

Name: ${name}
Email: ${email}
Rating: ${rating}/5

Feedback:
${message}
    `,

    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>New Feedback</title>
      </head>

      <body style="
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
        font-family: Arial, Helvetica, sans-serif;
      ">

        <div style="
          width: 100%;
          padding: 30px 0;
          background-color: #f4f4f4;
        ">

          <div style="
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 10px;
            overflow: hidden;
          ">

            <!-- Header -->
            <div style="
              background-color: #05B97D;
              padding: 30px 20px;
              text-align: center;
            ">

              <div style="
                color: #ffffff;
                font-size: 13px;
                font-weight: bold;
                letter-spacing: 0.5px;
                margin-bottom: 8px;
              ">
                NEW FEEDBACK
              </div>

              <div style="
                color: #ffffff;
                font-size: 28px;
                font-weight: bold;
              ">
                Khojo College
              </div>

              <div style="
                color: #ffffff;
                font-size: 13px;
                margin-top: 8px;
              ">
                User Feedback Notification
              </div>

            </div>


            <!-- Main Content -->
            <div style="
              padding: 30px;
              color: #202124;
            ">

              <h2 style="
                margin: 0 0 10px;
                font-size: 22px;
                color: #202124;
              ">
                New feedback received! 🎉
              </h2>

              <p style="
                margin: 0 0 25px;
                color: #5f6368;
                font-size: 14px;
                line-height: 1.6;
              ">
                A user has submitted new feedback through the Khojo College
                platform. Here are the details:
              </p>


              <!-- User Details -->
              <div style="
                border-top: 1px solid #eeeeee;
                border-bottom: 1px solid #eeeeee;
                padding: 20px 0;
              ">

                <p style="
                  margin: 0 0 12px;
                  font-size: 14px;
                ">
                  <strong>Name:</strong>
                  ${name}
                </p>

                <p style="
                  margin: 0 0 12px;
                  font-size: 14px;
                ">
                  <strong>Email:</strong>
                  ${email}
                </p>

                <p style="
                  margin: 0;
                  font-size: 14px;
                ">
                  <strong>Rating:</strong>
                  <span style="
                    color: #05B97D;
                    font-weight: bold;
                  ">
                    ${rating}/5
                  </span>
                </p>

              </div>


              <!-- Feedback -->
              <div style="margin-top: 25px;">

                <h3 style="
                  margin: 0 0 10px;
                  font-size: 16px;
                  color: #202124;
                ">
                  Feedback
                </h3>

                <div style="
                  background-color: #f8fffc;
                  border-left: 4px solid #05B97D;
                  padding: 15px;
                  border-radius: 4px;
                  color: #5f6368;
                  font-size: 14px;
                  line-height: 1.6;
                  white-space: pre-wrap;
                ">
                  ${message}
                </div>

              </div>


              <!-- Action -->
              <div style="
                text-align: center;
                margin-top: 30px;
              ">

                <a
                  href="mailto:${email}"
                  style="
                    display: inline-block;
                    background-color: #05B97D;
                    color: #ffffff;
                    text-decoration: none;
                    padding: 12px 25px;
                    border-radius: 6px;
                    font-size: 14px;
                    font-weight: bold;
                  "
                >
                  Reply to User
                </a>

              </div>

            </div>


            <!-- Quote -->
            <div style="
              margin: 0 30px 25px;
              border: 1px solid #05B97D;
              border-radius: 6px;
              padding: 18px;
              background-color: #f8fffc;
            ">

              <p style="
                margin: 0;
                font-size: 13px;
                font-style: italic;
                color: #555555;
                line-height: 1.5;
              ">
                "Every piece of feedback helps us make Khojo College better."
              </p>

              <p style="
                margin: 10px 0 0;
                font-size: 12px;
                font-weight: bold;
                color: #05B97D;
              ">
                — The Khojo College Team
              </p>

            </div>


            <!-- Footer -->
            <div style="
              border-top: 1px solid #eeeeee;
              padding: 20px 30px;
              color: #9aa0a6;
              font-size: 11px;
              line-height: 1.6;
            ">

              <p style="margin: 0 0 5px;">
                This is an automated feedback notification from Khojo College.
              </p>

              <p style="margin: 0;">
                Please do not reply directly to this automated message.
              </p>

            </div>

          </div>

        </div>

      </body>
      </html>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);

    console.log(
      "Feedback email sent successfully:",
      info.messageId
    );

    return true;
  } catch (error) {
    console.error("Error sending feedback email:", error);

    // Important:
    // Email failure should NOT break feedback submission.
    return false;
  }
}


module.exports = {
  sendEmail,
  sendFeedbackEmail,
};