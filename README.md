🚀 Automated Resume & Interview Evaluation System (MERN)

An AI-powered MERN application that analyzes user resumes, self-descriptions, and job descriptions to generate:

📄 AI Interview Reports
📝 AI-Generated Resumes (PDF)
🎤 Interview Questions
📊 Candidate Scoring & Summary

This project helps users prepare for job interviews and gives companies a smarter way to evaluate candidates.

✨ Features

🔐 Authentication (Access Token Only)
    User registration & login
    JWT Access Token authentication
    Token stored client-side
    Protected routes via Express middleware
    🤖 AI Capabilities
    Generate interview questions
    AI-driven evaluation & scoring
    AI summary report
    Generate resume PDF
    Multi-input reasoning (resume + job description + self-description)
💻 Frontend (React + Vite)
    Modern responsive UI
    React Hooks & Context API
    API service layer
    Authentication context
    Loading & error states
    Styled with SCSS + gradients
🗄️ Backend (Node + Express)
    REST API structure
    AI service integration
    MongoDB models (Users, Reports)
    File upload middleware (Multer)
    Secure authentication middleware
    
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
    GenAI / LLM integration
    
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

✔ .env files are safely included in .gitignore.

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
    POST /api/auth/register       → Register user
    POST /api/auth/login          → Login user (returns Access Token)
    POST /api/auth/logout         → Client-side logout
Interview Routes
    POST /api/interview/start     → Start interview generation
    POST /api/interview/generate  → Generate AI answers & report
    GET  /api/interview/all       → Get all reports of the user
    POST /api/interview/pdf/:id   → Download AI-generated resume/interview PDF
    
🛡️ Security
    JWT Access Token Authentication
    bcrypt password hashing
    Protected routes with custom middleware
    Sensitive files safely excluded via .gitignore
    
📤 PDF Generation

The backend generates PDFs for:
        AI-generated resume
Delivered as a blob via:

POST /api/interview/pdf/:interviewReportId

🤝 Contributing 

Contributions and suggestions are welcome!
Feel free to fork the repo and submit a pull request.

⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!
