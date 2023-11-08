//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0 < 0.8.20;

import "./IStore.sol";

contract Store is IShop, IUsers {
    address owner;
    Product[] products;

    mapping (address => CartProduct[]) ownership;
    mapping (string => CartProduct) titleToCartProduct;
    mapping (address => User) addressToUser;
    mapping (string => address) loginToAddress;
    mapping (string => string) loginToPassword;

    modifier onlyRole(Role _role) {
        require (addressToUser[msg.sender].role == _role, unicode"Недостаточно прав");
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
        require(_getHash(loginToPassword[login]) == _getHash(password));
        return (loginToAddress[login]);
    }

    function signUp(string calldata login, string calldata password) external {
        _signUp(login, password, Role.User);
    }

    function buyProducts(CartProduct[] memory cartProducts) external payable {
        uint256 orderPrice = 0;
        for (uint256 i = 0; i < cartProducts.length; i++) {
            orderPrice += cartProducts[i].product.price * cartProducts[i].count;
        }
        require(msg.value >= orderPrice, unicode"Недостаточно средств");
        payable(owner).transfer(msg.value);

        CartProduct[] memory userProducts = ownership[msg.sender];
        for (uint256 i = 0; i < cartProducts.length; i++) {
            bool notFound = true;
            for (uint256 j = 0; j < userProducts.length; j++) {
                if (_getHash(userProducts[j].product.title) == _getHash(cartProducts[i].product.title)) {
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

    function getProducts() external view returns(CartProduct[] memory) {
        return ownership[msg.sender];
    }

    function _signUp(string memory login, string memory password, Role role) private {
        require(addressToUser[msg.sender].wallet == address(0), unicode"Вы уже зарегистрированы");
        require(addressToUser[loginToAddress[login]].wallet == address(0), unicode"Пользователь с таким именем уже зарегистрирован");
        addressToUser[msg.sender] = User(msg.sender, login, role);
        loginToAddress[login] = msg.sender;
        loginToPassword[login] = password;
    }

    function _getHash(string memory text) private pure returns(bytes32) {
        return keccak256(abi.encodePacked(text));
    }
}