import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const QuizTaking = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/quizzes/${quizId}`);
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
    updatedAnswers[qIndex] = parseInt(value, 10); // Convert to number
    setAnswers(updatedAnswers);
  };

  const handleSubmitQuiz = async () => {
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
      // Handle response data as needed (e.g., show score to user)
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };
  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div className="quiz-taking-container">
      <h2>{quiz.title}</h2>
      <form onSubmit={handleSubmitQuiz}>
        {quiz.questions.map((question, qIndex) => (
          <div key={qIndex}>
            <h3>{question.question}</h3>
            <ul>
              {question.options.map((option, oIndex) => (
                <li key={oIndex}>
                  <label>
                    <input
                      type="radio"
                      name={`question${qIndex}`}
                      value={oIndex}
                      checked={answers[qIndex] === oIndex}
                      onChange={(e) => handleAnswerChange(e, qIndex)}
                      required
                    />
                    {option}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <button type="submit">Submit Quiz</button>
      </form>
    </div>
  );
};

export default QuizTaking;
