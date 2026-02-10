const mongoose = require("mongoose");
const Product = require("../models/Product");
const productsData = require("../data/products.json");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log("MongoDB Connected");
        
        // Clear existing products
        await Product.deleteMany({});
        console.log("Cleared existing products");
        
        // Insert new products
        await Product.insertMany(productsData);
        console.log(`${productsData.length} products seeded successfully!`);
        
        process.exit();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
