const express = require("express");
const router = express.Router();
const { registerProduct, verifyProduct } = require("../controllers/productController");

router.post("/register", registerProduct);  // Register product
router.get("/verify/:serialNumber", verifyProduct);  // Verify product

module.exports = router;
