const FeedBack = require("../Models/FeedBack");
const { sendFeedbackEmail } = require("./emailService");

async function feedback(req, res) {
  try {
    const { name, email, message, rating } = req.body;

    // Save feedback to database first
    const feedBack = new FeedBack({
      name,
      email,
      message,
      rating,
    });

    await feedBack.save();

    // Send email after successful database save.
    // Email failure should not affect feedback submission.
    try {
      await sendFeedbackEmail({
        name,
        email,
        message,
        rating,
      });
    } catch (emailError) {
      console.error(
        "Feedback was saved, but email notification failed:",
        emailError
      );
    }

    // Feedback submission remains successful even if email fails.
    res.status(200).json({
      message: "Feedback Saved successfully",
    });

  } catch (err) {
    console.error("Error saving feedback:", err);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

module.exports = feedback;