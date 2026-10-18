const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// This is our temporary "database" in memory
let jobs = [
  { id: 1, company: 'Google', role: 'Frontend Engineer', status: 'Applied' },
  { id: 2, company: 'Meta', role: 'Full Stack Developer', status: 'Interviewing' },
];

// GET all jobs
app.get('/api/jobs', (req, res) => {
  res.json(jobs);
});

// POST a new job
app.post('/api/jobs', (req, res) => {
  const newJob = {
    id: Date.now(),
    company: req.body.company,
    role: req.body.role,
    status: 'Applied',
  };
  jobs.push(newJob);
  res.status(201).json(newJob);
});

// DELETE a job
app.delete('/api/jobs/:id', (req, res) => {
  const id = parseInt(req.params.id);
  jobs = jobs.filter((job) => job.id !== id);
  res.status(204).send();
});

// UPDATE a job status
app.put('/api/jobs/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;
  
  jobs = jobs.map((job) => 
    job.id === id ? { ...job, status } : job
  );
  res.json(jobs.find((job) => job.id === id));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});