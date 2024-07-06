const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const quizController = require('../controllers/quizController');

// Middleware to authenticate JWT token
router.use(authenticateToken);

// Routes for quizzes
router.get('/', quizController.getAllQuizzes);
router.get('/:id', quizController.getQuizById);
router.post('/create', quizController.createQuiz);
router.put('/:id', quizController.updateQuiz);
router.delete('/:id', quizController.deleteQuiz);
router.post('/:quizId/submit', quizController.submitQuiz);

module.exports = router;
