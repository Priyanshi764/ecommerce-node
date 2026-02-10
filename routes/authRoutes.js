const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Set role (default to "user" if not provided or invalid)
        const userRole = (role === "admin" || role === "user") ? role : "user";

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: userRole
        });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

        res.json({ 
            message: "User registered successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                cart: user.cart,
                wishlist: user.wishlist
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).populate('wishlist');
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });
        
        res.json({ 
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                cart: user.cart,
                wishlist: user.wishlist
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Get current user
router.get("/me", authMiddleware, async (req, res) => {
    res.json({
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        cart: req.user.cart,
        wishlist: req.user.wishlist
    });
});

// Add to cart
router.post("/cart/add", authMiddleware, async (req, res) => {
    try {
        const { productId, name, price, image, quantity } = req.body;
        const user = req.user;

        const existingItem = user.cart.find(item => item.productId.toString() === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity || 1;
        } else {
            user.cart.push({ productId, name, price, image, quantity: quantity || 1 });
        }

        await user.save();
        res.json({ cart: user.cart });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Update cart item quantity
router.put("/cart/update/:productId", authMiddleware, async (req, res) => {
    try {
        const { productId } = req.params;
        const { quantity } = req.body;
        const user = req.user;

        const item = user.cart.find(item => item.productId.toString() === productId);
        
        if (item) {
            if (quantity <= 0) {
                user.cart = user.cart.filter(item => item.productId.toString() !== productId);
            } else {
                item.quantity = quantity;
            }
            await user.save();
        }

        res.json({ cart: user.cart });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Remove from cart
router.delete("/cart/remove/:productId", authMiddleware, async (req, res) => {
    try {
        const { productId } = req.params;
        const user = req.user;

        user.cart = user.cart.filter(item => item.productId.toString() !== productId);
        await user.save();

        res.json({ cart: user.cart });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Clear cart
router.delete("/cart/clear", authMiddleware, async (req, res) => {
    try {
        const user = req.user;
        user.cart = [];
        await user.save();
        res.json({ cart: user.cart });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Get cart
router.get("/cart", authMiddleware, async (req, res) => {
    try {
        res.json({ cart: req.user.cart });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Toggle wishlist
router.post("/wishlist/:productId", authMiddleware, async (req, res) => {
    try {
        const { productId } = req.params;
        const user = req.user;

        const index = user.wishlist.indexOf(productId);
        
        if (index > -1) {
            user.wishlist.splice(index, 1);
        } else {
            user.wishlist.push(productId);
        }

        await user.save();
        res.json({ wishlist: user.wishlist });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Get wishlist
router.get("/wishlist", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('wishlist');
        res.json({ wishlist: user.wishlist });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
