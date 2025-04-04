// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

contract ProductRegistry {
    struct Product {
        string name;
        string serialNumber;
        string batchNumber;
        uint256 timestamp;
        address manufacturer;
    }

    mapping(string => Product) private products;
    event ProductRegistered(string serialNumber, string name, address manufacturer);

    function registerProduct(
        string memory _name,
        string memory _serialNumber,
        string memory _batchNumber
    ) public {
        require(bytes(products[_serialNumber].serialNumber).length == 0, "Product already registered");

        products[_serialNumber] = Product(_name, _serialNumber, _batchNumber, block.timestamp, msg.sender);
        emit ProductRegistered(_serialNumber, _name, msg.sender);
    }

    function verifyProduct(string memory _serialNumber) public view returns (
        string memory name,
        string memory batchNumber,
        uint256 timestamp,
        address manufacturer
    ) {
        require(bytes(products[_serialNumber].serialNumber).length > 0, "Product not found");

        Product memory product = products[_serialNumber];
        return (product.name, product.batchNumber, product.timestamp, product.manufacturer);
    }
}
