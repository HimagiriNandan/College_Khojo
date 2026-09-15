const FeedBack = require("../Models/FeedBack");
const User = require("../Models/userschema");
const sendEmail = require("./emailService");

async function feedback(req, res) {
  try {
    const {message, rating } = req.body;

    const user = await User.findById(req.body.user_id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const feedBack = new FeedBack({
      name: user.name,
      email: user.email,
      message,
      rating,
    });

    await feedBack.save();

    const emailResult = await sendEmail({
      type: "feedback",
      to: "khojocollege05@gmail.com",
      replyTo: user.email,
      data: {
        name: user.name,
        email: user.email,
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