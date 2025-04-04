'use client'
import { useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const QRCodeScanner = ({ onScan }) => {
    const [scanner, setScanner] = useState(null);

    const startScanner = () => {
        if (!scanner) {
            const qrScanner = new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: 250 });
            qrScanner.render((decodedText) => {
                onScan(decodedText);
                qrScanner.clear();
                setScanner(null);
            });
            setScanner(qrScanner);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <button onClick={startScanner} className="bg-green-500 text-white p-2">
                Start Scanner
            </button>
            <div id="qr-reader" className="mt-4"></div>
        </div>
    );
};

export default QRCodeScanner;
