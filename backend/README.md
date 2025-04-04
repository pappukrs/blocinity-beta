

## **📌 Step 1: Initialize the Project**
1. Open your terminal and create the backend directory:
   ```bash
   mkdir backend && cd backend
   ```
2. Initialize a Node.js project:
   ```bash
   npm init -y
   ```
3. Install the required dependencies:
   ```bash
   npm install express mongoose dotenv cors axios qrcode hardhat ethers
   ```
   - **express** → Web framework for API.  
   - **mongoose** → MongoDB ORM.  
   - **dotenv** → Manage environment variables.  
   - **cors** → Enable cross-origin requests.  
   - **axios** → Make API calls (for IPFS integration).  
   - **qrcode** → Generate QR codes.  
   - **hardhat & ethers** → Blockchain interaction.  

---

## **📌 Step 2: Setup the Express Server**
📄 **Create a file `app.js`**
```javascript
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const productRoutes = require("./routes/productRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/products", productRoutes);

// Database Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```
---

## **📌 Step 3: Setup MongoDB Model**
📄 **Create a file `models/Product.js`**
```javascript
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
```

---

## **📌 Step 4: Create the API Controller**
📄 **Create a file `controllers/productController.js`**
```javascript
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
```

---

## **📌 Step 5: Define API Routes**
📄 **Create a file `routes/productRoutes.js`**
```javascript
const express = require("express");
const router = express.Router();
const { registerProduct, verifyProduct } = require("../controllers/productController");

router.post("/register", registerProduct);  // Register product
router.get("/verify/:serialNumber", verifyProduct);  // Verify product

module.exports = router;
```

---

## **📌 Step 6: QR Code Generation Service**
📄 **Create a file `services/qrCodeService.js`**
```javascript
const QRCode = require("qrcode");

exports.generateQRCode = async (blockchainHash) => {
  try {
    const qrData = `https://blockchain-explorer.com/${blockchainHash}`;
    const qrCodeUrl = await QRCode.toDataURL(qrData);
    return qrCodeUrl;
  } catch (error) {
    throw new Error("QR Code generation failed");
  }
};
```

---

## **📌 Step 7: Blockchain Interaction Service**
📄 **Create a file `services/blockchainService.js`**
```javascript
const { ethers } = require("ethers");
const contractABI = require("../blockchain/contractABI.json"); // Import contract ABI

const provider = new ethers.providers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contractABI, wallet);

exports.registerProductOnBlockchain = async ({ name, serialNumber, batchNumber }) => {
  try {
    const tx = await contract.registerProduct(name, serialNumber, batchNumber);
    await tx.wait();
    return tx.hash; // Return transaction hash
  } catch (error) {
    throw new Error("Blockchain transaction failed");
  }
};
```

---

## **📌 Step 8: Setup Environment Variables**
📄 **Create a `.env` file**
```
PORT=5000
MONGO_URI=mongodb+srv://your-db-uri
BLOCKCHAIN_RPC_URL=https://rpc.your-blockchain.com
PRIVATE_KEY=your-private-key
CONTRACT_ADDRESS=your-smart-contract-address
```

---

## **📌 Step 9: Run the Server**
```bash
node app.js
```
🚀 **Your backend is now running at:**  
```
http://localhost:5000/api/products
```

---

## **📌 Step 10: Test the API with Postman**
### ✅ **Register Product**
- **Endpoint:** `POST http://localhost:5000/api/products/register`  
- **Body (JSON):**
```json
{
  "name": "iPhone 15",
  "serialNumber": "SN12345",
  "batchNumber": "BATCH001",
  "manufactureDate": "2024-04-03",
  "factoryLocation": "USA"
}
```

### ✅ **Verify Product**
- **Endpoint:** `GET http://localhost:5000/api/products/verify/SN12345`

---

## **🔹 Next Steps**
1. **Smart Contract Deployment** 🛠️  
   - Deploy a **Solidity Smart Contract** to Ethereum/Polygon.  
2. **Frontend Development** 📱  
   - Build a React app to scan QR codes & verify products.  

