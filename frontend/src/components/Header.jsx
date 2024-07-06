import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <header className="header">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">QuizApp</Link>
        </div>
        <nav className="navbar">
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/quizzes">Quizzes</Link></li>
            <li><Link to="/create-quiz">Create Quiz</Link></li>
            {/* <li><Link to="/dashboard">Login</Link></li> */}
           
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
