// components/Result.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Result = () => {
  const { quizId } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`https://quizmaker-nu.vercel.app/api/quizzes/${quizId}/results`);
        setResults(response.data.results);
      } catch (error) {
        console.error('Error fetching quiz results:', error);
        // Handle error (display error message, etc.)
      }
    };

    fetchResults();
  }, [quizId]);

  return (
    <div className="result-container">
      <h2>Quiz Results</h2>
      <ul>
        {results.map((result, index) => (
          <li key={index}>
            <p>User: {result.username}</p>
            <p>Score: {result.score}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Result;
