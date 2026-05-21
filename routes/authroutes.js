const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

// Signup
router.post("/signup", async function(req, res) {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ message: "Signup successful" });
    } catch (error) {
        res.status(500).json({ message: "Error during signup" });
    }
});

// Login
router.post("/login", async function(req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            "mysecretkey",
            { expiresIn: "1d" }
        );

        res.status(200).json({
            message: "Login successful",
            token: token,
            userName: user.name
        });
    } catch (error) {
        res.status(500).json({ message: "Error during login" });
    }
});

module.exports = router;
