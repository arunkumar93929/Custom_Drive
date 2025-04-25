const express = require('express');
const router = express.Router();    
const { body,validationResult } = require('express-validator');
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register",
    body("email").trim().isEmail().withMessage("Invalid email").isLength({ min: 13 }),
    body("username").trim().isLength({ min: 3 }).withMessage("Username must be at least 3 characters"),
    body("password").trim().isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), message: "Validation failed" });
        }

        const { username, email, password } = req.body;

        try {
            const hashPassword = await bcrypt.hash(password, 10);

            const newUser = await userModel.create({
                username,
                email,
                password: hashPassword,
            });

            res.json({
                newUser,
                message: "User created successfully",
            });
        } catch (err) {
            if (err.code === 11000 && err.keyPattern.email) {
                return res.status(400).json({ message: "Email already exists" });
            }
            console.error(err);
            res.status(500).json({ message: "Server error" });
        }
    }
);

router.get("/login", (req, res) => {
    res.render("login");
}
);

router.post("/login",
    body("email").trim().isEmail().isLength({ min: 13 }),
    body("password").trim().isLength({ min: 6 }),
    async (req,res)=>{

        const errors= validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({ 
                errors: errors.array() ,
                message: "Validation failed"});
        };

        const { email, password } = req.body;

        const user = await userModel.findOne({
            email: email,
        });
        if(!user){
            return res.status(400).json({
                message: "User not found",
            });
        };

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({
                message: "Invalid credentials",
            });
        };

        const token = jwt.sign({
            userId: user._id,
            username: user.username,
            email: user.email
            },process.env.JWT_SECRET, {
                expiresIn: "1h",
            });

            res.cookie("token", token);

            res.send({
                message: "Login successful",
                token: token,
            });

});


module.exports = router;