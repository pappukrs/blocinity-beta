const hre = require("hardhat");

async function main() {
    const ProductRegistry = await hre.ethers.getContractFactory("ProductRegistry");
    const productRegistry = await ProductRegistry.deploy();

    await productRegistry.waitForDeployment();
    console.log("Contract deployed to:", await productRegistry.getAddress());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
