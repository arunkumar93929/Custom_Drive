const express = require('express');
const app= express();
const userRouter = require('./routes/user.routes.js');
const dotenv= require ('dotenv');
const connectDB = require('./config/db.js');
const cookieParser = require('cookie-parser');
const indexRouter = require('./routes/index.routes.js');
dotenv.config();
connectDB(); // Connect to MongoDB


 // Load environment variables from .env file



app.set('view engine', 'ejs');
app.use(cookieParser()); // Middleware to parse cookies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded data
app.use(express.json()); // Middleware to parse JSON data



app.use("/",indexRouter); // Use the index routes
app.use("/user",userRouter); // Use the user routes

app.listen(3000, () => {    
    console.log("Server is running on port 3000")
});
