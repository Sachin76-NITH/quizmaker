import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
const AuthForm = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isRegister ? 'http://localhost:5000/api/auth/register' : 'http://localhost:5000/api/auth/login';
    const payload = isRegister ? { username, email, password } : { email, password };

    try {
      const response = await axios.post(endpoint, payload);
      console.log('Token:', response.data.token);
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);

      if (isRegister) {
        alert('Registration successful');
      }

      navigate('/quizzes'); // Replace '/todo' with your actual dashboard route
    } catch (error) {
      console.error('Error:', error.response || error.message);
      alert(error.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className="auth-layout">
      
      <div className="right-side">
        <h2>{isRegister ? 'Register' : 'Login'}</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          {isRegister && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
        </form>
        <p onClick={() => setIsRegister(!isRegister)} className="toggle-link">
          {isRegister ? 'Already have an account? Login' : 'Don’t have an account? Register'}
        </p>
      </div>
    
    </div>
  );
};

export default AuthForm;
