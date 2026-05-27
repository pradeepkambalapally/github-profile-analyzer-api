# GitHub Profile Analyzer API

A backend REST API built with Node.js, Express.js, MySQL, and the GitHub REST API that analyzes GitHub user profiles and stores useful insights in a MySQL database.

## Live API

https://github-profile-analyzer-api-g4y6.onrender.com

## GitHub Repository

https://github.com/pradeepkambalapally/github-profile-analyzer-api

---

# Features

- Fetch GitHub user profile data using username
- Analyze repository insights
- Store analyzed data in MySQL
- Fetch all analyzed profiles
- Fetch a single analyzed profile
- Automatic profile update using MySQL UPSERT
- Professional error handling
- Cloud MySQL integration using Aiven
- RESTful API architecture

---

# Tech Stack

- Node.js
- Express.js
- MySQL
- GitHub REST API
- Axios
- dotenv

---

# Tech/Features Added Beyond Requirements

- Layered backend architecture using Routes, Controllers, Services, and Utility functions
- Repository insights analysis:
  - Total Stars
  - Total Forks
  - Top Programming Language
  - Most Starred Repository
- Duplicate profile handling using MySQL UPSERT
- Professional error handling for invalid usernames and API failures
- Clean and structured REST API responses
- Cloud database integration using Aiven MySQL
- Deployment-ready backend setup
- Automatic profile update when the same GitHub user is analyzed again

---

# Project Structure

```text
github-profile-analyzer-api/
│
├── config/
│   └── db.js
│
├── controllers/
│   └── githubController.js
│
├── routes/
│   └── githubRoutes.js
│
├── services/
│   └── githubService.js
│
├── utils/
│   └── calculateInsights.js
│
├── .env
├── .gitignore
├── app.js
├── package.json
└── README.md
```

---

# API Endpoints

## 1. Analyze GitHub Profile

### Endpoint

```http
GET /api/github/analyze/:username
```

### Example

```text
GET https://github-profile-analyzer-api-g4y6.onrender.com/api/github/analyze/torvalds
```

---

## 2. Get All Stored Profiles

### Endpoint

```http
GET /api/github/profiles
```

### Example

```text
GET https://github-profile-analyzer-api-g4y6.onrender.com/api/github/profiles
```

---

## 3. Get Single Stored Profile

### Endpoint

```http
GET /api/github/profiles/:username
```

### Example

```text
GET https://github-profile-analyzer-api-g4y6.onrender.com/api/github/profiles/torvalds
```

---

# Sample Response

```json
{
  "success": true,
  "profile": {
    "username": "torvalds",
    "followers": 304730,
    "public_repos": 11
  },
  "insights": {
    "totalStars": 246622,
    "totalForks": 63634,
    "topLanguage": "C",
    "mostStarredRepo": "linux"
  }
}
```

---

# Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000

DB_HOST=your_host
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=github_analyzer
DB_PORT=your_port
```

---

# Local Setup Instructions

## 1. Clone Repository

```bash
git clone https://github.com/pradeepkambalapally/github-profile-analyzer-api.git
```

---

## 2. Navigate to Project Directory

```bash
cd github-profile-analyzer-api
```

---

## 3. Install Dependencies

```bash
npm install
```

---

## 4. Setup Environment Variables

Create a `.env` file and add your database credentials.

---

## 5. Run Development Server

```bash
npm run dev
```

---

## 6. Start Production Server

```bash
npm start
```

---

# Database Schema

```sql
CREATE TABLE github_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    name VARCHAR(255),
    bio TEXT,
    followers INT,
    following INT,
    public_repos INT,
    public_gists INT,
    total_stars INT,
    total_forks INT,
    top_language VARCHAR(255),
    most_starred_repo VARCHAR(255),
    avatar_url TEXT,
    profile_url TEXT,
    analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

# Deployment

- Backend deployed on Render
- MySQL database hosted on Aiven

---

# Error Handling

The API handles:

- Invalid GitHub usernames
- GitHub API rate limits
- Internal server errors
- Database operation errors

---

# Example Tested Profiles

- torvalds
- gaearon

---

# Note

GitHub public API rate limits may apply for excessive requests.

---

# Author

Pradeep Kambalapally