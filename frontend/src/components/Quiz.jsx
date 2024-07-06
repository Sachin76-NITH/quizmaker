// Quiz.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Quiz = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`https://quizmaker-nu.vercel.app/api/quizzes/${id}`, {
          headers: {
            Authorization: localStorage.getItem('token'), // Assuming token is stored in localStorage
          },
        });
        setQuiz(response.data);
        initializeAnswers(response.data.questions);
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    };

    fetchQuiz();
  }, [id]);

  const initializeAnswers = (questions) => {
    const initialAnswers = {};
    questions.forEach((question, index) => {
      initialAnswers[index] = ''; // Initialize answers with empty strings
    });
    setAnswers(initialAnswers);
  };

  const handleAnswerChange = (e, qIndex) => {
    const { value } = e.target;
    setAnswers({
      ...answers,
      [qIndex]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`https://quizmaker-nu.vercel.app/api/quizzes/${id}/submit`, { answers }, {
        headers: {
          Authorization: localStorage.getItem('token'), // Assuming token is stored in localStorage
        },
      });
      // Handle successful submission (redirect, show success message, etc.)
    } catch (error) {
      console.error('Error submitting quiz:', error);
      // Handle submission error (display error message, etc.)
    }
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div className="quiz-container">
      <h2>{quiz.title}</h2>
      <form onSubmit={handleSubmit}>
        {quiz.questions.map((question, qIndex) => (
          <div key={qIndex}>
            <h3>{question.question}</h3>
            <ul>
              {question.options.map((option, oIndex) => (
                <li key={oIndex}>
                  <label>
                    <input
                      type="radio"
                      value={option}
                      checked={answers[qIndex] === option}
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

export default Quiz;
