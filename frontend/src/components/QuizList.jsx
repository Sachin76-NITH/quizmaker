// QuizList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('https://quizmaker-nu.vercel.app/api/quizzes', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setQuizzes(response.data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div className="quiz-list-container">
      <h2>Explore Quizzes</h2>
      <ul className="quiz-list">
        {quizzes.map((quiz) => (
          <li className="quiz-item" key={quiz._id}>
            <Link to={`/quizzes/${quiz._id}`}>
              <h3>{quiz.title}</h3>
              <p>{quiz.description}</p>
              <span>Questions: {quiz.questions.length}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizList;
