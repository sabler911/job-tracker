import { useState } from 'react'
import './App.css'

function App() {
  const [jobs, setJobs] = useState([
    { id: 1, company: 'Google', role: 'Frontend Engineer', status: 'Applied' },
    { id: 2, company: 'Meta', role: 'Full Stack Developer', status: 'Interviewing' },
  ])

  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!company.trim() || !role.trim()) return

    const newJob = {
      id: Date.now(),
      company: company.trim(),
      role: role.trim(),
      status: 'Applied',
    }

    setJobs([newJob, ...jobs])
    setCompany('')
    setRole('')
  }

  function handleDelete(id) {
    setJobs(jobs.filter((job) => job.id !== id))
  }

  function handleStatusChange(id, newStatus) {
    setJobs(
      jobs.map((job) =>
        job.id === id ? { ...job, status: newStatus } : job
      )
    )
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Job Tracker</h1>
        <p>Tracking {jobs.length} applications</p>
      </header>

      <form className="job-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <button type="submit">Add Job</button>
      </form>

      <main className="job-list">
        {jobs.map((job) => (
          <div key={job.id} className="job-card">
            <div className="job-card-top">
              <div>
                <h2>{job.role}</h2>
                <p>{job.company}</p>
              </div>
              <button
                className="delete-btn"
                onClick={() => handleDelete(job.id)}
                aria-label="Delete job"
              >
                ×
              </button>
            </div>
            <select
              className="status-select"
              value={job.status}
              onChange={(e) => handleStatusChange(job.id, e.target.value)}
            >
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        ))}
      </main>
    </div>
  )
}

export default App