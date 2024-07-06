// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import QuizList from './components/QuizList';
import QuizForm from './components/QuizForm';
import Quiz from './components/Quiz';
import AuthForm from './components/AuthForm'; // Renamed from Auth.jsx
import './App.css';
import Dashboard from './Dashboard';
import QuizDetails from './components/QuizDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/quizzes" element={<QuizList />} />
          <Route path="/create-quiz" element={<QuizForm />} />
          <Route path="/quiz/:quizId" element={<Quiz />} />
          
          <Route path="/quizzes/:quizId" element={<QuizDetails />} />
        </Routes>
      
      </div>
   
    </Router>
  );
}

export default App;
