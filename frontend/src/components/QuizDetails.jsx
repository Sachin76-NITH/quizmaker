import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const QuizDetails = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null); // State to hold the score after submitting

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/quizzes/${quizId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setQuiz(response.data);
        // Initialize answers array with default values (e.g., -1 for unanswered)
        setAnswers(new Array(response.data.questions.length).fill(-1));
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    };
    fetchQuiz();
  }, [quizId]);

  const handleAnswerChange = (e, qIndex) => {
    const { value } = e.target;
    const updatedAnswers = [...answers];
    updatedAnswers[qIndex] = parseInt(value, 10);
    setAnswers(updatedAnswers);
  };

  const handleSubmitQuiz = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:5000/api/quizzes/${quizId}/submit`,
        { answers },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Quiz submitted successfully:', response.data);
      setScore(response.data.score);
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  if (!quiz) {
    return <div className="quiz-details-container">Loading...</div>;
  }

  return (
    <div className="quiz-details-container">
      <h2 className="quiz-title">{quiz.title}</h2>
      <form onSubmit={handleSubmitQuiz} className="quiz-form">
        {quiz.questions.map((question, qIndex) => (
          <div key={qIndex} className="question-container">
            <h3 className="question-heading">
              Question {qIndex + 1}: {question.question}
            </h3>
            <ul className="options-list">
              {question.options.map((option, oIndex) => (
                <li key={oIndex} className="option-item">
                  <label className="option-label">
                    <input
                      type="radio"
                      name={`question${qIndex}`}
                      value={oIndex}
                      checked={answers[qIndex] === oIndex}
                      onChange={(e) => handleAnswerChange(e, qIndex)}
                      required
                    />
                    <span className="option-text">{option}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <button type="submit" className="submit-button">
          Submit Quiz
        </button>
      </form>
      {score !== null && (
        <div className="score-card">
          <h3>Your Score: {score} / {quiz.questions.length}</h3>
        </div>
      )}
    </div>
  );
};

export default QuizDetails;
