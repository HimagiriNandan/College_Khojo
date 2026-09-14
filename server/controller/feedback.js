const FeedBack = require("../Models/FeedBack");
const sendEmail = require("./emailService");

async function feedback(req, res) {
  try {
    const { name, email, message, rating } = req.body;

    const feedBack = new FeedBack({
      name,
      email,
      message,
      rating,
    });

    await feedBack.save();

    const emailResult = await sendEmail({
      type: "feedback",
      to: "khojocollege05@gmail.com",
      replyTo: email,
      data: {
        name,
        email,
        message,
        rating,
      },
    });

    if (!emailResult.success) {
      return res.status(200).json({
        success: true,
        message:
          "Feedback submitted successfully, but email could not be sent.",
        emailError: emailResult.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Feedback submitted and email sent successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Unable to submit feedback: ${error.message}`,
    });
  }
}

module.exports = feedback;