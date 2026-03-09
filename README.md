# SEACET AI Assistant

An advanced AI-powered chatbot for S.E.A College of Engineering & Technology (SEACET). This assistant provides comprehensive information about admissions, courses, facilities, placements, and more.

## Tech Stack

- **Frontend**: Vite, React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Local Express server with SQLite database
- **AI**: Llama 3 on Groq

## Getting Started

### Prerequisites

- Node.js & npm installed

### Setup

1. **Clone the repository**
2. **Install dependencies**
   ```sh
   # Frontend
   npm install
   
   # Backend
   cd server
   npm install
   ```
3. **Configure Environment Variables**
   Create a `.env` file in the `server` directory and add your `GROQ_API_KEY`.
4. **Run the Application**
   ```sh
   # Start the backend (from /server)
   npm run dev
   
   # Start the frontend (from root)
   npm run dev
   ```

## Key Features

- **Instant Answers**: Get detailed information about SEACET instantly.
- **Accurate Knowledge**: Powered by an SQLite database containing official college information.
- **Fast Responses**: Utilizes Groq's high-performance inference engine.
- **Modern UI**: Sleek, responsive design built with Tailwind and shadcn/ui.
