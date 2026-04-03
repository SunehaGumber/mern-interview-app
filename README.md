🚀 Automated Resume & Interview Evaluation System (MERN)

An AI-powered MERN application that analyzes user resumes, self-descriptions, and job descriptions to generate:

📄 AI Interview Reports
📝 AI-Generated Resumes (PDF)
🎤 Interview Questions
📊 Candidate Scoring & Summary

This project helps users prepare for job interviews and gives companies a smarter way to evaluate candidates.

✨ Features
🔐 Authentication (Access Token Only)
    -> User registration & login
    -> JWT Access Token authentication
    -> Token stored client-side
    -> Protected routes via Express middleware
    
🤖 AI Capabilities
    -> Generate interview questions
    -> AI-driven evaluation & scoring
    -> AI summary report
    -> Generate resume PDF
    -> Multi-input reasoning (resume + JD + self description)
    
💻 Frontend (React + Vite)
     -> Modern responsive UI
     -> React Hooks & Context API
     -> API service layer
     -> Authentication context
     -> Loading & error states
     -> Beautiful UI with SCSS + gradients
     
🗄️ Backend (Node + Express)
     -> REST API structure
     -> AI service integration
     -> MongoDB models (Users, Reports)
     -> File upload middleware (Multer)
     -> Secure authentication middleware
🏗️ Tech Stack
    Frontend
    React + Vite
    Axios
    SCSS
    Context API
    Backend
    Node.js
    Express.js
    MongoDB + Mongoose
    JWT Authentication
    Multer
    OpenAI / LLM integration
📁 Project Folder Structure
    project/
    │── Backend/
    │   ├── src/
    │   │   ├── config/
    │   │   ├── controllers/
    │   │   ├── middleware/
    │   │   ├── models/
    │   │   ├── routes/
    │   │   ├── services/
    │   │   ├── random.txt
    │   ├── server.js
    │   ├── package.json
    │   └── .gitignore
    │
    └── Frontend/gen-ai/
        ├── src/
        ├── public/
        ├── package.json
        └── .gitignore
        
⚙️ Environment Variables

Backend .env
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    PORT=5000
    GOOGLE_GENAI_API_KEY=your_ai_key

✔ .env files are safely ignored via .gitignore.

▶️ Running the Project Locally
Backend Setup
    cd Backend
    npm install
    npm start
Frontend Setup
    cd Frontend/gen-ai
    npm install
    npm run dev
    
🔗 REST API Endpoints
Auth Routes
    POST /api/auth/register       → register new user
    POST /api/auth/login          → login user + returns JWT access token
    POST /api/auth/logout         → client-side logout
Interview Routes
    POST /api/interview/start     → begin interview generation
    POST /api/interview/generate  → generate AI answers & report
    GET  /api/interview/all       → get all reports for user
    POST /api/interview/pdf/:id   → download generated resume/interview PDF
    
🛡️ Security
    Access Token authentication (JWT)
    bcrypt password hashing
    Protected routes with middleware
    All sensitive files excluded using .gitignore
    
📤 PDF Generation
The backend generates PDF for:
  AI-generated resume
  Delivered as a blob from:

  POST /api/interview/pdf/:interviewReportId
  🤝 Contributing

Contributions and suggestions are welcome!
Fork the repo and create a PR.

⭐ Support

Give this project a ⭐ on GitHub if you like it!
