const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register Callback
const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Check for existing user
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: 'User already exists',
            });
        }
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // Create and save user
        const newUser = new userModel({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({
            success: true,
            message: 'Registration Successful!',
            newUser,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error,
        });
    }
};

// Login Callback
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found',
            });
        }
        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({
                success: false,
                message: 'Invalid email or password',
            });
        }
        // Create token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });
        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
            token,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error,
        });
    }
};

module.exports = { loginController, registerController };