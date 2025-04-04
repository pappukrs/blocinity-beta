const Product = require("../models/Product");
const { generateQRCode } = require("../services/qrCodeService");
const { registerProductOnBlockchain } = require("../services/blockchainService");

// Register a Product
exports.registerProduct = async (req, res) => {
  try {
    const { name, serialNumber, batchNumber, manufactureDate, factoryLocation } = req.body;

    // Step 1: Register product on blockchain
    const blockchainHash = await registerProductOnBlockchain({ name, serialNumber, batchNumber });

    // Step 2: Generate QR Code with blockchain URL
    const qrCodeUrl = await generateQRCode(blockchainHash);

    // Step 3: Save product to database
    const product = new Product({ name, serialNumber, batchNumber, manufactureDate, factoryLocation, blockchainHash, qrCodeUrl });
    await product.save();

    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Verify Product
exports.verifyProduct = async (req, res) => {
  try {
    const { serialNumber } = req.params;
    const product = await Product.findOne({ serialNumber });

    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
