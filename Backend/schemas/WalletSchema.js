const { Schema } = require("mongoose");

const WalletSchema = new Schema({
    userId: { type: String, required: true, unique: true },
    balance: { type: Number, default: 10000 }, // Initial ₹10,000 for every user
    totalDeposited: { type: Number, default: 10000 },
    totalWithdrawn: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = { WalletSchema };
