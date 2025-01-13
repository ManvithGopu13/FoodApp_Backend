const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  favorites: { type: [String], default: [] },
}, { timestamps: true });

module.exports = mongoose.model("Food", FoodSchema);
