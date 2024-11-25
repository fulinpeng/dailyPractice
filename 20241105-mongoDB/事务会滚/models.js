const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  balance: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  type: { type: String, enum: ["open", "close"], required: true }, // 'open' for opening positions, 'close' for closing positions
  amount: { type: Number, required: true }, // The amount of funds involved in the order
  status: { type: String, enum: ["pending", "success", "failed"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

const Account = mongoose.model("Account", accountSchema);
const Order = mongoose.model("Order", orderSchema);

module.exports = { Account, Order };
