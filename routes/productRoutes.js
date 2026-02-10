const express = require("express");
const Product = require("../models/Product");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// Get all products with filters
router.get("/", async (req, res) => {
    try {
        const { category, search, minPrice, maxPrice, sort } = req.query;
        
        let query = {};
        
        if (category && category !== "all") {
            query.category = category;
        }
        
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } }
            ];
        }
        
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }
        
        let sortOption = {};
        if (sort === "price-low") sortOption.price = 1;
        else if (sort === "price-high") sortOption.price = -1;
        else if (sort === "rating") sortOption.rating = -1;
        else sortOption.createdAt = -1;
        
        const products = await Product.find(query).sort(sortOption);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Get single product
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Get categories
router.get("/categories/list", async (req, res) => {
    try {
        const categories = await Product.distinct("category");
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Add product (Admin only)
router.post("/add", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Update product (Admin only)
router.put("/:id", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Delete product (Admin only)
router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Add review
router.post("/:id/review", authMiddleware, async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        
        const review = {
            userId: req.user._id,
            userName: req.user.name,
            rating,
            comment
        };
        
        product.reviews.push(review);
        
        // Update average rating
        const totalRating = product.reviews.reduce((sum, r) => sum + r.rating, 0);
        product.rating = totalRating / product.reviews.length;
        
        await product.save();
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
