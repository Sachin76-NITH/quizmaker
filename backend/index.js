require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({
    origin: 'https://quizmaker-sachin.vercel.app/', // replace with your frontend domain
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow credentials if needed
  }));

// Routes
const authRoutes = require('./routes/authRoutes');
const quizRoutes = require('./routes/quizRoutes');
app.use('/api/auth', authRoutes);
app.use('/api/quizzes', quizRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
