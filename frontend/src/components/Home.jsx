import { Link } from 'react-router-dom';
import AuthForm from './AuthForm';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from './Footer';
const Home = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/quizzes');
        setQuizzes(response.data); // Assuming response.data is an array of quizzes
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div className="home-container">
      <div className="left-section">
        <h1>LET's TAKE A QUIZ!</h1>
        <p>Choose from our collection of quizzes or create your own.</p>
        <Link to="/quizzes">Take a Quiz</Link>
      </div>
      <div className="right-section">
        <AuthForm />
      </div>
      <Footer/>
    </div>
  );
}

export default Home;
