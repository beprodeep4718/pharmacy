const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Product = require("../models/product.model");
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
            expiresIn: "1d",
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
exports.logout = (req, res) => {
    res.clearCookie("token", { httpOnly: true, secure: true }); // Clear the token cookie
    res.status(200).json({ message: "Logout successful" });
};

exports.addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body; 

        if (!userId || !productId) {
            return res.status(400).json({ error: "User ID and Product ID are required" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Check if product already exists in cart
        const existingItem = user.cart.find(item => item.product.toString() === productId);

        if (existingItem) {
            existingItem.quantity += quantity || 1; // Increase quantity if already in cart
        } else {
            user.cart.push({ product: productId, quantity: quantity || 1 });
        }

        await user.save();
        return res.json({ message: "Item added to cart successfully", cart: user.cart });
    } catch (error) {
        console.error("Error adding to cart:", error);
        return res.status(500).json({ error: "Error adding item to cart" });
    }
};



exports.getCart = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const user = await User.findById(userId).populate("cart.product"); // Populate product details

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.json({ cart: user.cart });
    } catch (error) {
        console.error("Error fetching cart items:", error);
        return res.status(500).json({ error: "Error fetching cart items" });
    }
};

