const mongoose = require('mongoose');


const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: false
  },
  question_image: {
    type: String,  // giving url for this question image...
    required: false
  },
  options: {
    a: { type: String, required: false },
    a_image_link: { type: String, required: false },
    b: { type: String, required: false },
    b_image_link: { type: String, required: false },
    c: { type: String, required: false },
    c_image_link: { type: String, required: false },
    d: { type: String, required: false },
    d_image_link: { type: String, required: false }
  },
  correctOption: {
    type: String,
    enum: ['a', 'b', 'c', 'd'],  // Correct option should be one of these values
    required: true
  },
  selectedOption: {
    type: String,
    enum: ['a', 'b', 'c', 'd', ''],  // Allow an empty string for unselected options
    required: false
  },
  explanation: { type: String, required: false },
  explanation_image: { type: String, required: false },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Section Schema
const sectionSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ['Physics', 'Chemistry', 'Maths'], // Limit the values to these 3
    required: true
  },
  questions: [questionSchema] // Array of question objects
});

// MockTest Schema
const mocktestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  totalMarks: {
    type: Number,
    required: true
  },
  scoredMarks: {
    type: Number,
    required: true
  },
  sections: [sectionSchema], // Array of section objects
  createdAt: {
    type: Date,
    default: Date.now
  },
  timer: {
    type: Number,
    required: true
  }
});
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    image : {
      type : String,
      required : false
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    attempting_mocks: [{
        type: mocktestSchema
        
    }],
    attempted_mocks: [{
        type: mocktestSchema
        
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});


// Create the User model from the schema and export it
module.exports = mongoose.model('User', userSchema);
