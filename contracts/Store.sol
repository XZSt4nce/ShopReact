//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Store {
    enum Role {
        Admin,
        User
    }
    struct User {
        address wallet;
        string name;
        Role role;
    }

    struct Product {
        string title;
        uint256 price;
        string description;
        string category;
        string image;
        uint8 rateValue;
        uint256 rateCount;
        uint256 count;
    }

    address private owner;
    Product[] private products;

    mapping (address => Product[]) private ownership;
    mapping (address => User) private addressToUser;
    mapping (string => address) private loginToAddress;
    mapping (string => string) private loginToPassword;

    modifier onlyRole(Role _role) {
        require (addressToUser[msg.sender].role == _role, "Access denied");
        _;
    }

    constructor(Product[] memory initProducts) {
        owner = msg.sender;
        _signUp("admin", "123", Role.Admin);

        for (uint256 i = 0; i < initProducts.length; i++) {
            products.push(initProducts[i]);
        }
    }

    function signIn(string calldata login, string calldata password) external view returns(address wallet) {
        require(_getHash(loginToPassword[login]) == _getHash(password), "Invalid data!");
        return (loginToAddress[login]);
    }

    function signUp(string calldata login, string calldata password) external {
        _signUp(login, password, Role.User);
    }

    function buyProducts(Product[] memory cartProducts) external payable onlyRole(Role.User) {
        uint256 orderPrice = 0;
        for (uint256 i = 0; i < cartProducts.length; i++) {
            orderPrice += cartProducts[i].price * cartProducts[i].count;
        }
        require(msg.value >= orderPrice, "Insufficient funds!");
        payable(owner).transfer(msg.value);

        Product[] memory userProducts = ownership[msg.sender];
        for (uint256 i = 0; i < cartProducts.length; i++) {
            bool notFound = true;
            for (uint256 j = 0; j < userProducts.length; j++) {
                if (_getHash(userProducts[j].title) == _getHash(cartProducts[i].title)) {
                    notFound = false;
                    ownership[msg.sender][j].count += cartProducts[i].count;
                }
            }
            if (notFound) {
                ownership[msg.sender].push(cartProducts[i]);
            }
        }
    }

    function addProducts(Product[] memory newProducts) external onlyRole(Role.Admin) {
        for (uint256 i = 0; i < newProducts.length; i++) {
            bool notFound = true;
            for (uint256 j = 0; j < products.length; j++) {
                if (_getHash(products[j].title) != _getHash(newProducts[i].title)) {
                    notFound = false;
                }
            }
            if (notFound) {
                products.push(newProducts[i]);
            }
        }
    }

    function getProducts() external view returns(Product[] memory) {
        return products;
    }

    function getBalance() external view returns(uint256) {
        return msg.sender.balance;
    }

    function getOwnProducts() external view returns(Product[] memory) {
        return ownership[msg.sender];
    }

    function _signUp(string memory login, string memory password, Role role) private {
        require(addressToUser[msg.sender].wallet == address(0), "You are already registered!");
        require(addressToUser[loginToAddress[login]].wallet == address(0), "A user with this login is already registered!");
        addressToUser[msg.sender] = User(msg.sender, login, role);
        loginToAddress[login] = msg.sender;
        loginToPassword[login] = password;
    }

    function _getHash(string memory text) private pure returns(bytes32) {
        return keccak256(abi.encodePacked(text));
    }
}