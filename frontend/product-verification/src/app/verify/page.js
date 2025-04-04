'use client'

import { useState } from "react";
import { verifyProductOnBlockchain } from "../../../services/blockchain";

const VerifyPage = () => {
    const [serialNumber, setSerialNumber] = useState("");
    const [productData, setProductData] = useState(null);
    const [error, setError] = useState("");

    const verifyProduct = async () => {
        try {
            setError("");
            const data = await verifyProductOnBlockchain(serialNumber);
            setProductData(data);
        } catch (err) {
            setError(err.message || "Invalid or fake product!");
        }
    };

    return (
        <div className="flex flex-col items-center p-4">
            <input
                type="text"
                placeholder="Enter Serial Number"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                className="border p-2"
            />
            <button onClick={verifyProduct} className="bg-blue-500 text-white p-2 mt-2">
                Verify Product
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {productData && (
                <div className="mt-4 border p-4">
                    <h2 className="font-bold">Product Details:</h2>
                    <p>Name: {productData.name}</p>
                    <p>Batch: {productData.batchNumber}</p>
                    <p>Manufactured On: {productData.timestamp}</p>
                    <p>Manufacturer: {productData.manufacturer}</p>
                </div>
            )}
        </div>
    );
};

export default VerifyPage;
