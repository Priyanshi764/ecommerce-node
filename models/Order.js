const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [{
        productId: mongoose.Schema.Types.ObjectId,
        name: String,
        price: Number,
        quantity: Number,
        image: String
    }],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ["pending", "processing", "shipped", "delivered", "cancelled"], default: "pending" },
    shippingAddress: {
        fullName: String,
        phone: String,
        address: String,
        city: String,
        state: String,
        pincode: String
    },
    paymentMethod: { type: String, default: "COD" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);
