const router = require('express').Router();
const feedback = require('../controller/feedback');
const profile = require("../controller/profile");
const updatedprofile = require("../controller/updatedprofile");
const User = require("../Models/userschema");
const colleges = require("../controller/collegedetails");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const isAuthenticated = require("../middleware/auth");
const privateuniversities = require("../controller/PrivateUniversity");
const updateuserprofilepic = require("../controller/updateuserprofilepic");
const sendEmail = require('../controller/emailService');
const contactus = require("../controller/contactus");
const multer = require('multer');
const jwt = require('jsonwebtoken');
const path = require('path');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: 'duyuxtpau', 
  api_key: '521557337532656',  
  api_secret: 'EPtKwTFYbMqq6Zb7Fz_Y9sUSshk'
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



const uploadImageIfPresent = async (req, res, next) => {
  const { file } = req;

  if (file) {
      try {
          console.log("Uploading image to Cloudinary...");
          // Use the upload_stream method to upload a Buffer to Cloudinary
          const stream = cloudinary.uploader.upload_stream(
              {
                  resource_type: 'auto', // Automatically detect the file type
                  // public_id: `profilepics/${hashedUserId}`, // Optional: Set a custom public_id
                  folder: 'user_profiles', // Optional: Organize uploads in a folder
                  format: 'webp', // Force the image to be stored in WebP format
                  transformation: [{ width: 800, height: 800, crop: 'fill' }] // Optional: You can add transformations
                  
              },
              (error, result) => {
                  if (error) {
                      console.error("Cloudinary upload error:", error);
                      return res.status(500).json({ error: "Error uploading image to Cloudinary" });
                  }

                  // Save the secure URL of the uploaded image to the request body
                  req.body.pic = result.secure_url;
                  console.log("Image uploaded to Cloudinary:", result.secure_url);
                  next();
              }
          );

          // Pipe the file buffer into the Cloudinary upload stream
          stream.end(file.buffer); // End the stream with the buffer (this triggers the upload)
      } catch (error) {
          console.error("Error in image upload:", error);
          return res.status(500).json({ error: "Error in image upload" });
      }
  } else {
      next(); // If no file, continue to the next middleware
  }
};




//  Profile Routes
router.get("/profile", isAuthenticated, profile);
router.post("/updateuserprofile", upload.single('profilepic') ,uploadImageIfPresent ,updateuserprofilepic)
router.post("/updateprofile", updatedprofile);
router.post("/contactus", contactus);
router.post("/feedback", feedback);
router.post("/colleges",colleges);
const TempUser = require("../Models/TempUser");



router.get("/privateuniversities", privateuniversities)
router.post("/signup", async (req, res) => {
  try {
    console.log('Signup request received');
    const { name, location, email, password } = req.body;

    // Validate the email format using a regex pattern
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Create and save the temporary user
    const tempuser = await TempUser.find({ email });
    if(tempuser){
      await TempUser.deleteOne({ email, otp });
    }

    const newTempUser = new TempUser({ 
      name, 
      location, 
      email, 
      password: hashedPassword, 
      otp 
    });


    await newTempUser.save();

    // Send OTP email
    await sendEmail(email, otp);

    // Respond to the client
    res.status(201).json({ message: "User registered successfully. Please verify OTP." });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
});


router.post("/verifyotp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Find the temporary user with the provided email and OTP
    const tempUser = await TempUser.findOne({ email, otp });

    if (!tempUser) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Destructure user information from temp user
    const { name, location, password } = tempUser;

    // Remove the temporary user after OTP verification
    await TempUser.deleteOne({ email, otp });

    // Create and save the final user
    const newUser = new User({ 
      name, 
      location, 
      email, 
      password 
    });

    await newUser.save();

    // Respond to the client that OTP was verified successfully
    res.status(200).json({ message: "OTP verified successfully. Account created." });
  } catch (error) {
    console.error('Error during OTP verification:', error);
    res.status(500).json({ message: "Error verifying OTP", error: error.message });
  }
});

router.post("/resetpassword", async (req, res) => {
  try {
    const { email,password,confirmpassword } = req.body;

    // Check if the user exists
    if(password !== confirmpassword){
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const otp = Math.floor(100000 + Math.random() * 900000);

    const tempuser = await TempUser.find({ email });

    if(tempuser){
      await TempUser.deleteMany({ email });
    }

    const tempUser = new TempUser({
      email,
      password : hashedPassword,
      otp
    });
    tempUser.save();
    sendEmail(email, otp);

    res.status(201).json({error:false, message: "Password reset successfully. Please verify OTP." });

  }
  catch (error) {
    console.error('Error during password reset:', error);
    res.status(500).json({error:true, message: "Error resetting password", error: error.message });
  }
});

router.post("/verifyresetotp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Find the temporary user with the provided email and OTP
    const tempUser
      = await TempUser.findOne({ email, otp });

    if (!tempUser) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    const user = await User.findOne({ email });
    await User.updateOne({email}, {password: tempUser.password});
    await TempUser.deleteMany({email});
    // Respond to the client that OTP was verified successfully
    res.status(200).json({error:false, message: "OTP verified successfully. Password reset." });

  }
  catch (error) {
    console.error('Error during OTP verification:', error);
    res.status(500).json({error:true, message: "Error verifying OTP", error: error.message });
  }
});



router.post("/resetpassword", async (req, res) => {
  try {
    const { email,password,confirmpassword } = req.body;

    // Check if the user exists
    if(password !== confirmpassword){
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const hashedPassword = await bcrypt.hash(password, 10);
    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    const tempuser = await TempUser.find({ email });

    if(tempuser){
      await TempUser.deleteMany({ email });
    }

    const tempUser = new TempUser({
      email,
      password : hashedPassword,
      otp
    });
    tempUser.save();
    sendEmail(email, otp);

    res.status(201).json({error:false, message: "Password reset successfully. Please verify OTP." });

  }
  catch (error) {
    console.error('Error during password reset:', error);
    res.status(500).json({error:true, message: "Error resetting password", error: error.message });
  }
});

router.post("/verifyresetotp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Find the temporary user with the provided email and OTP
    const tempUser
      = await TempUser.findOne({ email, otp });

    if (!tempUser) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    const user = await User.findOne({ email });
    await User.updateOne({email}, {password: tempUser.password});
    await TempUser.deleteMany({email});
    // Respond to the client that OTP was verified successfully
    res.status(200).json({error:false, message: "OTP verified successfully. Password reset." });

  }
  catch (error) {
    console.error('Error during OTP verification:', error);
    res.status(500).json({error:true, message: "Error verifying OTP", error: error.message });
  }
});



// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });
    // console.log("User found:", user);
    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    // console.log("Password match:", isMatch);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Store user session
    // console.log("User logged in:", user);
    const token = jwt.sign({ id: user._id }, "djbvunvuwheoufheowhfwuhefuhifwuehi", { expiresIn: "1d" });
    console.log("Token:", token);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000
    }).status(200).json({ message: "Login successful"});

  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});


router.post("/logout", async (req, res) => {
  try{
    
    res.clearCookie("token");
    res.status(200).send({ message: "Logout successful" });
  

  }catch(e){
    console.log(e);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
