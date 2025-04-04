'use client'
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

const QRCodeGenerator = () => {
    const [serialNumber, setSerialNumber] = useState("");
    const [qrValue, setQrValue] = useState("");

    const generateQRCode = () => {
        if (serialNumber) {
            setQrValue(`${process.env.NEXT_PUBLIC_API_URL}/verify?serialNumber=${serialNumber}`);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <input
                type="text"
                placeholder="Enter Serial Number"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                className="border p-2"
            />
            <button onClick={generateQRCode} className="bg-blue-500 text-white p-2 mt-2">
                Generate QR Code
            </button>
            {qrValue && <QRCodeSVG value={qrValue} className="mt-4" />}
        </div>
    );
};

export default QRCodeGenerator;
