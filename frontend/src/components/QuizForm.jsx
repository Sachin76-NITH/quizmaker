import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Home from './Home';

const QuizForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ question: '', options: ['', ''], correctAnswerIndex: 0 }]);

  const handleQuestionChange = (e, index) => {
    const { value } = e.target;
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (e, qIndex, oIndex) => {
    const { value } = e.target;
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (e, qIndex) => {
    const { value } = e.target;
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].correctAnswerIndex = parseInt(value, 10);
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', ''], correctAnswerIndex: 0 }]);
  };

  const addOption = (qIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options.push('');
    setQuestions(updatedQuestions);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
  
      // Prepare quiz data with correctAnswerIndex for each question
      const quizData = {
        title,
        questions: questions.map(({ question, options, correctAnswerIndex }) => ({
          question,
          options,
          correctAnswerIndex,
        })),
      };
  
      // Send POST request to create quiz
      await axios.post('http://localhost:5000/api/quizzes/create', quizData, config);
      navigate('/quizzes'); // Redirect to quizzes list after creating quiz
    } catch (error) {
      console.error('Error creating quiz:', error);
      // Handle error (display error message, etc.)
    }
  };

  // Check if user is logged in
  const token = localStorage.getItem('token');
  if (!token) {
    return <div><Home/></div>;
  }

  return (
    <div className="quiz-form-container">
      <h2>Create Quiz</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        {questions.map((question, qIndex) => (
          <div key={qIndex} style={{ marginTop: qIndex > 0 ? '20px' : '0' }}>
            <input
              type="text"
              placeholder={`Question ${qIndex + 1}`}
              value={question.question}
              onChange={(e) => handleQuestionChange(e, qIndex)}
              required
            />
            <ul>
              {question.options.map((option, oIndex) => (
                <li key={oIndex}>
                  <input
                    type="text"
                    placeholder={`Option ${oIndex + 1}`}
                    value={option}
                    onChange={(e) => handleOptionChange(e, qIndex, oIndex)}
                    required
                  />
                  <input
                    type="radio"
                    name={`correct-answer-${qIndex}`}
                    value={oIndex}
                    checked={question.correctAnswerIndex === oIndex}
                    onChange={(e) => handleCorrectAnswerChange(e, qIndex)}
                  /> Correct
                </li>
              ))}
            </ul>
            <button type="button" onClick={() => addOption(qIndex)}>Add Option</button>
          </div>
        ))}
        <button type="button" onClick={addQuestion}>Add Question</button>
        <button type="submit">Create Quiz</button>
      </form>
    </div>
  );
};

export default QuizForm;
