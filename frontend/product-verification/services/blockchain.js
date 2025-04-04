import { ethers } from "ethers";
import contractABI from "../../../blockchain/ProductRegistry.json";

const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_BLOCKCHAIN_RPC_URL);
const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, contractABI, provider);

export const verifyProductOnBlockchain = async (serialNumber) => {
    try {
        const product = await contract.verifyProduct(serialNumber);
        return {
            name: product[0],
            batchNumber: product[1],
            timestamp: new Date(product[2] * 1000).toLocaleString(),
            manufacturer: product[3],
        };
    } catch (error) {
        throw new Error(`Product not found: ${error.message}`);
    }
};
