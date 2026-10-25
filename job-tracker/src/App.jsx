import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [jobs, setJobs] = useState([])
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // Fetch jobs from the server when the page loads
  useEffect(() => {
    fetch('https://job-tracker-c4jo.onrender.com/api/jobs')
      .then((res) => res.json())
      .then((data) => {
        setJobs(data)
        setIsLoading(false)
      })
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!company.trim() || !role.trim()) return

    const response = await fetch('https://job-tracker-c4jo.onrender.com/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ company, role }),
    })
    
    const newJob = await response.json()
    setJobs([newJob, ...jobs])
    setCompany('')
    setRole('')
  }

  async function handleDelete(id) {
    await fetch(`https://job-tracker-c4jo.onrender.com/api/jobs/${id}`, { method: 'DELETE' })
    setJobs(jobs.filter((job) => job.id !== id))
  }

  async function handleStatusChange(id, newStatus) {
    await fetch(`https://job-tracker-c4jo.onrender.com/api/jobs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
    setJobs(jobs.map((job) => job.id === id ? { ...job, status: newStatus } : job))
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Job Tracker</h1>
        {!isLoading && <p>Tracking {jobs.length} applications</p>}
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

      {isLoading ? (
        <p style={{ textAlign: 'center', color: '#666', marginTop: '40px' }}>
          Loading your jobs... (Server may take 30s to wake up)
        </p>
      ) : (
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
      )}
    </div>
  )
}

export default App