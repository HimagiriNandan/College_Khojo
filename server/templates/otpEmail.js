function otpEmailTemplate(otp) {
  return {
    subject: "OTP Verification for Khojo College",

    text: `
Your OTP for Khojo College is: ${otp}

This OTP is required to verify your account.
Please do not share this OTP with anyone.

— The Khojo College Team
    `,

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


              <!-- OTP -->
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
                border-left: 4px solid #fe0000;
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
}

module.exports = otpEmailTemplate;
