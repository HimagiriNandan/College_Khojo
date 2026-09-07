const User = require("../Models/userschema");

async function addMockToUser(req, res) {
  try {
    const { userId, data, change, timer } = req.body;
   
    // Check if data is valid
    if (change==="modify" && (!data || !data._id)) {
      return res.status(400).json({ error: "Invalid data: missing _id" });
    }
    // Find user and ensure they exist
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }


    // Ensure attempting_mocks is an array and filter out invalid entries
    if (!Array.isArray(user.attempting_mocks)) {
      user.attempting_mocks = [];
    }
    user.attempting_mocks = user.attempting_mocks.filter(mock => mock && typeof mock === 'object');

    // Check if the mock already exists
    const mockIndex = user.attempting_mocks.findIndex(
      (mock) => mock && mock._id && mock._id.toString() === data._id
    );

    if (mockIndex !== -1 && change === "modify") {
      user.attempting_mocks[mockIndex] = { ...data, timer: timer };
    } else if (mockIndex === -1) {
      user.attempting_mocks.push(data);
    }

    // Save using findOneAndUpdate to avoid version errors
    await User.findOneAndUpdate(
      { _id: userId },
      { $set: { attempting_mocks: user.attempting_mocks } },
      { new: true }
    );

    if(mockIndex !== -1 && change !== "modify") {
      return res.status(200).json({ message: "Mock modified successfully", data: user.attempting_mocks[mockIndex], existing: true });
    }
    res.status(200).json({ message: "Mock processed successfully" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = addMockToUser;
