//under work
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [quizzes, setQuizzes] = useState([]);
//   const [userQuizzes, setUserQuizzes] = useState([]);
//   const [selectedQuiz, setSelectedQuiz] = useState(null);
//   const [quizTitle, setQuizTitle] = useState('');
//   const [loadingQuizzes, setLoadingQuizzes] = useState(true);
//   const [loadingUserQuizzes, setLoadingUserQuizzes] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const authToken = localStorage.getItem('authToken');
//     if (!authToken) {
//       console.error('No auth token found. Redirecting to login...');
//       navigate('/login'); // Redirect to login page if authToken is missing
//       return;
//     }

//     fetchQuizzes(authToken);
//     fetchUserQuizzes(authToken);
//   }, [navigate]);

//   const fetchQuizzes = async (authToken) => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/quizzes', {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       });
//       console.log('Quizzes fetched:', response.data);
//       setQuizzes(response.data);
//     } catch (error) {
//       console.error('Error fetching quizzes:', error);
//       setError('Failed to load quizzes.');
//     } finally {
//       setLoadingQuizzes(false);
//     }
//   };

//   const fetchUserQuizzes = async (authToken) => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/quizzes/user', {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       });
//       console.log('User quizzes fetched:', response.data);
//       setUserQuizzes(response.data);
//     } catch (error) {
//       console.error('Error fetching user quizzes:', error);
//       setError('Failed to load user quizzes.');
//     } finally {
//       setLoadingUserQuizzes(false);
//     }
//   };

//   const handleCreateQuiz = async (e) => {
//     e.preventDefault();
//     try {
//       const authToken = localStorage.getItem('authToken');
//       const response = await axios.post(
//         'http://localhost:5000/api/quizzes/create',
//         { title: quizTitle },
//         {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//         }
//       );
//       console.log('Quiz created:', response.data);
//       setQuizTitle('');
//       setQuizzes([...quizzes, response.data]);
//       alert('Quiz created successfully!');
//     } catch (error) {
//       console.error('Error creating quiz:', error);
//       setError('Failed to create quiz.');
//     }
//   };

//   const handleQuizSelection = (quiz) => {
//     setSelectedQuiz(quiz);
//     // Navigate or perform action on selected quiz
//   };

//   if (!localStorage.getItem('authToken')) {
//     return (
//       <div className="dashboard">
//         <p>No auth token found. Please log in.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="dashboard">
//       <div className="quiz-list">
//         <h2>All Quizzes</h2>
//         {loadingQuizzes ? (
//           <p>Loading quizzes...</p>
//         ) : error ? (
//           <p>{error}</p>
//         ) : (
//           <ul>
//             {quizzes.map((quiz) => (
//               <li key={quiz._id} onClick={() => handleQuizSelection(quiz)}>
//                 {quiz.title}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//       <div className="user-quizzes">
//         <h2>Your Quizzes</h2>
//         {loadingUserQuizzes ? (
//           <p>Loading your quizzes...</p>
//         ) : error ? (
//           <p>{error}</p>
//         ) : (
//           <ul>
//             {userQuizzes.map((quiz) => (
//               <li key={quiz._id} onClick={() => handleQuizSelection(quiz)}>
//                 {quiz.title}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//       <div className="create-quiz">
//         <h2>Create a Quiz</h2>
//         <form onSubmit={handleCreateQuiz}>
//           <input
//             type="text"
//             placeholder="Enter quiz title"
//             value={quizTitle}
//             onChange={(e) => setQuizTitle(e.target.value)}
//             required
//           />
//           <button type="submit">Create Quiz</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
