import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  // Effect to handle logout when clicking anywhere on the page
  useEffect(() => {
    const handleLogout = () => {
      // Clear the token from local storage
      localStorage.removeItem('token');
      
      // Navigate to the desired location
      navigate('/');
    };

    // Add click event listener to document body
    document.body.addEventListener('click', handleLogout);

    // Clean up event listener when component unmounts
    return () => {
      document.body.removeEventListener('click', handleLogout);
    };
  }, [navigate]);

  // Render nothing directly in the component
  return null;
}

export default Logout;

