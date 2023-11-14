//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

interface IShop {
    struct Product {
        string title;
        uint256 price;
        string description;
        string category;
        string image;
        uint8 rateValue;
        uint256 rateCount;
    }

    struct CartProduct {
        Product product;
        uint256 count;
    }

    function signIn(string calldata login, string calldata password) external view returns(address wallet);
    function signUp(string calldata login, string calldata password) external;
    function buyProducts(CartProduct[] memory) external payable;
    function addProducts(Product[] memory) external;
    function getProducts() external view returns(Product[] memory);
}

interface IUsers {
    enum Role {
        Admin,
        User
    }
    struct User {
        address wallet;
        string name;
        Role role;
    }
}