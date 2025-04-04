const { ethers } = require("ethers");
const contractABI = require("../../blockchain/artifacts/contracts/ProductRegistry.sol/ProductRegistry.json").abi;

// Local Hardhat node provider - Updated for ethers v6
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

// Use the private key from the local Hardhat network
const wallet = new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider);

// Use the contract address returned after local deployment
const contract = new ethers.Contract(
  "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  contractABI,
  wallet
);

exports.registerProductOnBlockchain = async ({ name, serialNumber, batchNumber }) => {
  try {
    const tx = await contract.registerProduct(name, serialNumber, batchNumber);
    await tx.wait();
    return tx.hash;
  } catch (error) {
    throw new Error("Blockchain transaction failed: " + error.message);
  }
};

exports.verifyProductOnBlockchain = async (serialNumber) => {
  try {
    const product = await contract.verifyProduct(serialNumber);
    return {
      name: product[0],
      batchNumber: product[1],
      timestamp: product[2],
      manufacturer: product[3],
    };
  } catch (error) {
    throw new Error("Product not found on blockchain: " + error.message);
  }
};


