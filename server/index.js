const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
const app = express();

// CORS for Render
app.use(cors({
  origin: process.env.CLIENT_URL, // e.g. https://your-frontend.onrender.com
  credentials: true
}));

// Middleware
app.use(express.json());

// Database Connection
connectDB();

// Health Check Route (important for Render)
app.get('/health', (req, res) => res.send('ok'));

// Routes
app.use('/api/employees', require('./routes/employeeRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
