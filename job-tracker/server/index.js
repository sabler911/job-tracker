const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Allows us to read JSON data from the frontend

// A simple test route
app.get('/api/jobs', (req, res) => {
  res.json([
    { id: 1, company: 'Server Test', role: 'Backend Developer', status: 'Applied' }
  ]);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});