'use client'
import QRCodeGenerator from "../../components/QRCodeGenerator";
import QRCodeScanner from "../../components/QRCodeScanner";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    const handleScan = (decodedText: string) => {
        router.push(decodedText);
    };

    return (
        <div className="flex flex-col items-center p-4">
            <h1 className="text-2xl font-bold">Product Authentication</h1>
            <QRCodeGenerator />
            <QRCodeScanner onScan={handleScan} />
        </div>
    );
}
