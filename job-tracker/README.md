# Job Tracker - Full Stack Application

A full-stack job application tracker that allows users to manage their job search in one place.

## 🚀 Live Demo
[Click here to view the live app](https://job-tracker-pi-flax.vercel.app/)

*Note: The backend is hosted on Render's free tier and may take 30-50 seconds to "wake up" on the first load. Please be patient!*

## 🛠️ Tech Stack
- **Frontend:** React, Vite, CSS
- **Backend:** Node.js, Express
- **Database:** PostgreSQL (hosted on Neon)
- **Deployment:** Vercel (Frontend) + Render (Backend)

## ✨ Features
- Add new job applications
- Update application status (Applied, Interviewing, Offer, Rejected)
- Delete applications
- Real-time data persistence (data survives page refreshes)
- Responsive design

## 💻 Running Locally
1. Clone the repo
2. Frontend: `cd job-tracker && npm install && npm run dev`
3. Backend: `cd server && npm install && node index.js`
4. Create a `.env` file in the `server` folder with your `DATABASE_URL`