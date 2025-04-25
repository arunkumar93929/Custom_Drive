# Drive File Management System

This project is a file management system that allows users to upload, download, and manage their files. It uses **Supabase** for file storage and **MongoDB** for user and file metadata management.

---

## Features

- **User Authentication**: Secure user authentication using JWT.
- **File Upload**: Users can upload files, which are stored in Supabase.
- **File Download**: Users can download their files securely.
- **File Metadata Management**: File metadata is stored in MongoDB.
- **Sanitized File Names**: Uploaded file names are sanitized to prevent invalid characters.
- **Responsive UI**: Built with TailwindCSS for a modern and responsive design.

---

## Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or later)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)
- [Supabase](https://supabase.com/) account and project

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/drive-file-management.git
   cd drive-file-management

2. Install dependencies:
  npm install
3. Create a .env file in the root directory and add the following environment variables:
  MONGO_URI=mongodb://localhost:27017/your-database-name
  SUPABASE_URL=https://your-supabase-url.supabase.co
  SUPABASE_KEY=your-supabase-api-key
  JWT_SECRET=your-jwt-secret
4. Start the MongoDB server (if running locally):
  mongod
5. Start the application:
    http://localhost:3000


Project Structure
project/  
│  
├── config/  
│   ├── db.js                # MongoDB connection configuration  
│   ├── supabase.config.js   # Supabase client configuration  
│  
├── middlewares/  
│   ├── authe.js             # Authentication middleware  
│  
├── models/  
│   ├── user.model.js        # User schema for MongoDB  
│   ├── files.model.js       # File metadata schema for MongoDB  
│  
├── routes/  
│   ├── [index.routes.js](http://_vscodecontentref_/0)      # Routes for file upload/download  
│   ├── user.routes.js       # Routes for user authentication  
│  
├── views/  
│   ├── home.ejs             # Home page for file management  
│   ├── login.ejs            # Login page  
│   ├── register.ejs         # Registration page  
│  
├── [app.js](http://_vscodecontentref_/1)                   # Main application file  
├── [package.json](http://_vscodecontentref_/2)             # Project dependencies and scripts  
└── README.md                # Project documentation  

   
