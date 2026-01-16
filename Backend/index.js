require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const authRoute = require("./Routes/AuthRoute");
const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { WalletModel } = require("./model/WalletModel");
const { userVerification } = require("./Middlewares/AuthMiddleware");

const app = express();
const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

// middlewares
app.use(
  cors({
    origin: [
      "http://localhost:5173", // frontend
      "http://localhost:5174", // dashboard
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use("/auth", authRoute);

app.get("/", (req, res) => {
  res.send("API running");
});

// 🔥 HOLDINGS - User specific
app.get("/allHoldings", userVerification, async (req, res) => {
  try {
    const allHoldings = await HoldingsModel.find({ userId: req.user.id });
    res.json(allHoldings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔥 POSITIONS - User specific
app.get("/allPositions", userVerification, async (req, res) => {
  try {
    const allPositions = await PositionsModel.find({ userId: req.user.id });
    res.json(allPositions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔥 NEW ORDER - Integrates with wallet, creates/updates holdings
app.post("/newOrder", userVerification, async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;
    const userId = req.user.id;
    const orderAmount = qty * price;

    // Get or create wallet
    let wallet = await WalletModel.findOne({ userId });
    if (!wallet) {
      wallet = new WalletModel({
        userId,
        balance: 10000,
        totalDeposited: 10000,
        totalWithdrawn: 0,
      });
      await wallet.save();
    }

    // For BUY orders, check if user has enough balance
    if (mode.toLowerCase() === 'buy') {
      if (wallet.balance < orderAmount) {
        return res.status(400).json({
          message: `Insufficient balance. Required: ₹${orderAmount.toFixed(2)}, Available: ₹${wallet.balance.toFixed(2)}`
        });
      }

      // Deduct from wallet
      wallet.balance -= orderAmount;
      wallet.updatedAt = Date.now();
      await wallet.save();
    }

    // For SELL orders, add money to wallet
    if (mode.toLowerCase() === 'sell') {
      wallet.balance += orderAmount;
      wallet.updatedAt = Date.now();
      await wallet.save();
    }

    // Save the order
    const newOrder = new OrdersModel({
      name,
      qty,
      price,
      mode,
      userId,
    });
    await newOrder.save();

    // If it's a BUY order, create or update holding
    if (mode.toLowerCase() === 'buy') {
      const existingHolding = await HoldingsModel.findOne({ userId, name });

      if (existingHolding) {
        // Update existing holding - average the price
        const totalQty = existingHolding.qty + qty;
        const newAvg = ((existingHolding.avg * existingHolding.qty) + (price * qty)) / totalQty;

        existingHolding.qty = totalQty;
        existingHolding.avg = newAvg;
        existingHolding.price = price;
        await existingHolding.save();
      } else {
        // Create new holding
        const newHolding = new HoldingsModel({
          userId,
          name,
          qty,
          avg: price,
          price,
          net: "0.00%",
          day: "0.00%",
        });
        await newHolding.save();
      }
    }

    // If it's a SELL order, reduce or remove holding
    if (mode.toLowerCase() === 'sell') {
      const existingHolding = await HoldingsModel.findOne({ userId, name });

      if (existingHolding) {
        if (existingHolding.qty > qty) {
          existingHolding.qty -= qty;
          await existingHolding.save();
        } else {
          // Remove holding if selling all
          await HoldingsModel.deleteOne({ userId, name });
        }
      }
    }

    res.status(201).json({
      message: "Order saved!",
      newBalance: wallet.balance
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔥 ALL ORDERS
app.get("/allOrders", userVerification, async (req, res) => {
  try {
    const allOrders = await OrdersModel.find({
      userId: req.user.id,
    });
    res.json(allOrders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔥 WALLET - Get Balance (auto-creates wallet with ₹10,000 for new users)
app.get("/wallet", userVerification, async (req, res) => {
  try {
    let wallet = await WalletModel.findOne({ userId: req.user.id });

    // If wallet doesn't exist, create one with ₹10,000
    if (!wallet) {
      wallet = new WalletModel({
        userId: req.user.id,
        balance: 10000,
        totalDeposited: 10000,
        totalWithdrawn: 0,
      });
      await wallet.save();
    }

    res.json(wallet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔥 WALLET - Add Funds
app.post("/wallet/add", userVerification, async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    let wallet = await WalletModel.findOne({ userId: req.user.id });

    if (!wallet) {
      wallet = new WalletModel({
        userId: req.user.id,
        balance: 10000 + amount,
        totalDeposited: 10000 + amount,
      });
    } else {
      wallet.balance += amount;
      wallet.totalDeposited += amount;
      wallet.updatedAt = Date.now();
    }

    await wallet.save();
    res.json({ message: "Funds added successfully", wallet });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔥 WALLET - Withdraw Funds
app.post("/wallet/withdraw", userVerification, async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const wallet = await WalletModel.findOne({ userId: req.user.id });

    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    if (wallet.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    wallet.balance -= amount;
    wallet.totalWithdrawn += amount;
    wallet.updatedAt = Date.now();
    await wallet.save();

    res.json({ message: "Withdrawal successful", wallet });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// db + server
mongoose.connect(uri)
  .then(() => {
    console.log("DB connected");
    app.listen(PORT, () => console.log("app started"));
  })
  .catch(err => console.error("DB connection failed:", err));

