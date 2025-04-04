const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  serialNumber: String,
  batchNumber: String,
  manufactureDate: String,
  factoryLocation: String,
  blockchainHash: String,  // Hash stored on blockchain
  qrCodeUrl: String,       // Generated QR Code URL
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);
