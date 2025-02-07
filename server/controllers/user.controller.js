const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register a new user
exports.register = async (req, res) => {
    try {
        const { fullname, email, password, phone } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            fullname: {
                firstname: fullname.firstname,
                lastname: fullname.lastname,
            },
            email,
            password: hashedPassword,
            phone,
        });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error registering user" });
    }
};

// Login a user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid username or password" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid username or password" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        res.cookie("token", token, { httpOnly: true, secure: true, maxAge: 3600000 });
        res.json({ message: "Login successful" });
    } catch (error) {
        res.status(500).json({ error: "Error logging in user" });
    }
};

// Get user info
exports.userinfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Error fetching user info" });
    }
};
