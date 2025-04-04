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
