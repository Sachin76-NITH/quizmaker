const Quiz = require('../models/Quiz');

// Controller function to get all quizzes
exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json(quizzes);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
};

// Controller function to get a quiz by ID
exports.getQuizById = async (req, res) => {
  const { id } = req.params;
  try {
    const quiz = await Quiz.findById(id);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    res.status(200).json(quiz);
  } catch (error) {
    console.error('Error fetching quiz by ID:', error);
    res.status(500).json({ error: 'Failed to fetch quiz' });
  }
};

// Controller function to create a new quiz
exports.createQuiz = async (req, res) => {
  try {
    const { title, questions } = req.body;
    const creator = req.userId; // Assuming userId is set in the request via middleware

    // Create new quiz object
    const newQuiz = new Quiz({
      title,
      questions,
      creator,
    });

    // Save quiz to database
    const savedQuiz = await newQuiz.save();

    res.status(201).json(savedQuiz); // Respond with the saved quiz object
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).json({ error: 'Failed to create quiz' });
  }
};

// Controller function to update a quiz by ID
exports.updateQuiz = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(id, { title }, { new: true });
    if (!updatedQuiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    res.status(200).json(updatedQuiz);
  } catch (error) {
    console.error('Error updating quiz:', error);
    res.status(500).json({ error: 'Failed to update quiz' });
  }
};

// Controller function to delete a quiz by ID
exports.deleteQuiz = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedQuiz = await Quiz.findByIdAndDelete(id);
    if (!deletedQuiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    res.status(200).json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    console.error('Error deleting quiz:', error);
    res.status(500).json({ error: 'Failed to delete quiz' });
  }
};

exports.getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate('creator', 'username'); // Assuming 'creator' is a reference to User model
    res.json(quizzes);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
};

// Fetch a single quiz by ID
exports.getQuizById = async (req, res) => {
  const quizId = req.params.id;

  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (error) {
    console.error('Error fetching quiz by ID:', error);
    res.status(500).json({ error: 'Failed to fetch quiz' });
  }
};

// Submit quiz responses
exports.submitQuiz = async (req, res) => {
  const quizId = req.params.quizId;
  const { answers } = req.body;

  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    console.log('Quiz:', quiz); // Debug: Check quiz data
    console.log('User Answers:', answers); // Debug: Check user answers

    let score = 0;
    for (let i = 0; i < quiz.questions.length; i++) {
      const userAnswer = answers[i];
      const correctAnswerIndex = quiz.questions[i].correctAnswerIndex;

      console.log(`Question ${i + 1}: User Answer: ${userAnswer}, Correct Answer Index: ${correctAnswerIndex}`); // Debug

      if (userAnswer === correctAnswerIndex) {
        score++;
      }
    }

    console.log('Final Score:', score); // Debug: Check final score
    res.json({ score });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    res.status(500).json({ error: 'Failed to submit quiz' });
  }
};

