function feedbackEmailTemplate({ name, email, message, rating }) {
  return {
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

               

                

                <div style="
                  text-align: center;
                ">

                  <div style="
                    font-size: 18px;
                    font-weight: bold;
                    color: #202124;
                    margin-bottom: 10px;
                  ">
                    Rating
                  </div>

                  <div style="
                    color: #FFB800;
                    font-size: 30px;
                    font-weight: bold;
                    letter-spacing: 4px;
                    line-height: 1;
                  ">
                    ${"★".repeat(Math.round(rating))}${"☆".repeat(5 - Math.round(rating))}
                  </div>

                </div>

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
                  padding: 12px 0 12px 0;
                  border-radius: 4px;
                  color: #5f6368;
                  font-size: 14px;
                  line-height: 1.6;
                  white-space: pre-wrap;
                ">
                  ${message}
                </div>

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
                "Thank you for helping us understand what matters to our students."
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
}

module.exports = feedbackEmailTemplate;
