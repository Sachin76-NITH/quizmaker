const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswerIndex: { type: Number, required: true } // Ensure this field is correctly defined
});

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [questionSchema],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
