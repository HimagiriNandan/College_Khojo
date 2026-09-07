const User = require("../Models/userschema");

async function addAttemptedMockToUser(req, res) {
  try {
    const { userId, data } = req.body;
    let score = 0;


    // Find user and ensure they exist
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }


    // Check if the mock exists in attempting_mocks
    const mockIndex = user.attempting_mocks.findIndex(
      (mock) => mock._id.toString() === data._id
    );

    if (mockIndex === -1) {
      return res.status(404).json({ error: "Mock not found in attempting_mocks" });
    }


    // Remove the mock from attempting_mocks
    user.attempting_mocks.splice(mockIndex, 1);

    // Calculate score
    data.sections.forEach((section) => {
      section.questions.forEach((question) => {
        if (question.selectedOption === question.correctOption) {
          score += 4;
        } else if (question.selectedOption !== "") {
          score -= 1;
        }
      });
    });

    data.scoredMarks = score;
    user.attempted_mocks.push(data);

    // Save changes using findOneAndUpdate (atomic update)
    await User.findOneAndUpdate(
      { _id: userId },
      { $set: { attempting_mocks: user.attempting_mocks }, $push: { attempted_mocks: data } },
      { new: true }
    );

    res.status(200).send("Mock submitted successfully");
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = addAttemptedMockToUser;
