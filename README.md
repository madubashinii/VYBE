# Workout Tracker Web App - VYBE

VYBE is a modern **full-stack fitness tracking app** that helps users stay on top of their workouts, track progress, and maintain fitness goals. Built with **Next.js** on the frontend and **Node.js/Express** on the backend, VYBE makes fitness tracking simple, interactive, and motivating.  

## Key Features

- **User Authentication**: Secure login using **JWT**
- **Workout Logging**: Record sets, reps, duration, calories burned, and personal records
- **Progress Dashboard**: Track your fitness journey with charts, streaks, and stats 
- **Workout Plans**: Create, view, and manage **HIIT**, **strength**, **yoga**, and custom plans  
- **Personalized Insights**: View weekly activity, progress trends, and achievements  
- **Responsive UI**: Clean, modern design for seamless experience across devices

## Tech Stack

| Layer                     | Technology             |
|--------------------------- |---------------------- |
| **Frontend**               | Next.js, Tailwind CSS |
| **Backend**                | Node.js, Express      |
| **Database**               | MongoDB               |
| **Authentication**         | JWT                   |
| **Deployment**             | Vercel                |


## Getting Started

### Prerequisites

- Node.js (v18+ recommended)  
- MongoDB Atlas or local MongoDB instance  
- npm or yarn  

### Installation

1. **Clone the repository**  

```bash
git clone https://github.com/madubashinii/VYBE.git
cd vybe
```
2. **Install dependencies**

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

3. **Set up environment variables**

**Backend .env file:**
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. **Run the app locally**

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm run dev
```
Frontend will run at http://localhost:3000 and backend at http://localhost:5000.

## Project Structure

```bash
vybe/
├── backend/
│   ├── models/      
|   ├── api/ 
│   ├── routes/         
│   ├── middleware/     
│   ├── lib/            
│   └── package.json
├── frontend/
│   ├── pages/          
│   ├── components/    
│   ├── services/       
│   ├── styles/        
│   └── package.json
└── README.md
```

## Deployment
- Frontend & Backend can be deployed together using Vercel.
- Backend uses Vercel Serverless Functions or can run separately on Render.
- Make sure to set environment variables on the hosting platform.

