const express = require("express");
const Order = require("../models/Order");
const Product = require("../models/Product");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// Place Order
router.post("/checkout", authMiddleware, async (req, res) => {
    try {
        const { items, totalAmount, shippingAddress, paymentMethod } = req.body;

        // Validate stock
        for (let item of items) {
            const product = await Product.findById(item.productId);
            if (!product || product.stock < item.quantity) {
                return res.status(400).json({ 
                    message: `Insufficient stock for ${item.name}` 
                });
            }
        }

        // Create order
        const order = await Order.create({
            userId: req.user._id,
            items,
            totalAmount,
            shippingAddress,
            paymentMethod
        });

        // Update stock
        for (let item of items) {
            await Product.findByIdAndUpdate(item.productId, {
                $inc: { stock: -item.quantity }
            });
        }

        res.json({ message: "Order placed successfully", order });
    } catch (error) {
        res.status(500).json({ message: "Order failed", error: error.message });
    }
});

// Get user orders
router.get("/my-orders", authMiddleware, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Get single order
router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        
        if (order.userId.toString() !== req.user._id.toString() && req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied" });
        }
        
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Get all orders (Admin only)
router.get("/", authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied" });
        }
        
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Update order status (Admin only)
router.put("/:id/status", authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied" });
        }
        
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
