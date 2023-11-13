import * as React from 'react';
import {createContext, ReactNode, useState} from 'react';
import {ICartProduct, IContextValues, IProduct} from "../constants/interfaces";
import {Web3Service} from "../Services/Web3Service";
import BigNumber from "bignumber.js";
import {productBN, productMPT} from "../constants/types";

export const StateContext = createContext({} as IContextValues)

const contractAddress = "0xEDc14C6B15C23dbad117C9264E7e2D5eB70d4D3C";
const abi = [{"inputs":[{"components":[{"internalType":"string","name":"title","type":"string"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"string","name":"description","type":"string"},{"internalType":"string","name":"category","type":"string"},{"internalType":"string","name":"image","type":"string"},{"internalType":"uint8","name":"rateValue","type":"uint8"},{"internalType":"uint256","name":"rateCount","type":"uint256"}],"internalType":"struct IShop.Product[]","name":"initProducts","type":"tuple[]"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"components":[{"internalType":"string","name":"title","type":"string"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"string","name":"description","type":"string"},{"internalType":"string","name":"category","type":"string"},{"internalType":"string","name":"image","type":"string"},{"internalType":"uint8","name":"rateValue","type":"uint8"},{"internalType":"uint256","name":"rateCount","type":"uint256"}],"internalType":"struct IShop.Product[]","name":"newProducts","type":"tuple[]"}],"name":"addProducts","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"components":[{"internalType":"string","name":"title","type":"string"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"string","name":"description","type":"string"},{"internalType":"string","name":"category","type":"string"},{"internalType":"string","name":"image","type":"string"},{"internalType":"uint8","name":"rateValue","type":"uint8"},{"internalType":"uint256","name":"rateCount","type":"uint256"}],"internalType":"struct IShop.Product","name":"product","type":"tuple"},{"internalType":"uint256","name":"count","type":"uint256"}],"internalType":"struct IShop.CartProduct[]","name":"cartProducts","type":"tuple[]"}],"name":"buyProducts","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getOwnProducts","outputs":[{"components":[{"components":[{"internalType":"string","name":"title","type":"string"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"string","name":"description","type":"string"},{"internalType":"string","name":"category","type":"string"},{"internalType":"string","name":"image","type":"string"},{"internalType":"uint8","name":"rateValue","type":"uint8"},{"internalType":"uint256","name":"rateCount","type":"uint256"}],"internalType":"struct IShop.Product","name":"product","type":"tuple"},{"internalType":"uint256","name":"count","type":"uint256"}],"internalType":"struct IShop.CartProduct[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getProducts","outputs":[{"components":[{"internalType":"string","name":"title","type":"string"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"string","name":"description","type":"string"},{"internalType":"string","name":"category","type":"string"},{"internalType":"string","name":"image","type":"string"},{"internalType":"uint8","name":"rateValue","type":"uint8"},{"internalType":"uint256","name":"rateCount","type":"uint256"}],"internalType":"struct IShop.Product[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"login","type":"string"},{"internalType":"string","name":"password","type":"string"}],"name":"signIn","outputs":[{"internalType":"address","name":"wallet","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"login","type":"string"},{"internalType":"string","name":"password","type":"string"}],"name":"signUp","outputs":[],"stateMutability":"nonpayable","type":"function"}] as const;

export const ContextProvider = ({ children }: { children: ReactNode }) => {
    const web3 = Web3Service();
    const contract = new web3.eth.Contract(abi, contractAddress);

    const [sender, setSender] = useState("0x64Fa1246f748aCA9d8037A574F0342012041ec98");
    const [balance, setBalance] = useState(BigNumber(0));
    const [products, setProducts] = useState<IProduct[]>([]);
    const [cartProducts, setCartProducts] = useState<IProduct[]>([]);
    const [orderPrice, setOrderPrice] = useState(BigNumber(0));
    const [modalShow, setModalShow] = useState(false);
    const [currency] = useState("Ξ");

    const toEther = (wei: BigNumber) => {
        return BigNumber(web3.utils.fromWei(wei.toString(), 'ether'));
    }

    const signIn = async (login: string, password: string) => {
        contract.methods.signIn(login, password).call({from: sender})
            .then(address => setSender(address));
    }

    const signUp = async (login: string, password: string) => {
        await web3.eth.personal.newAccount(password)
            .then(address => setSender(address));
        await web3.eth.personal.unlockAccount(sender, password, 0)
            .then(() => contract.methods.signUp(login, password).send({from: sender}));
    }

    const getBalance = async () => {
        await web3.eth.getBalance(sender)
            .then(bal => setBalance(BigNumber(bal.toString())));
    }

    const getProducts = async () => {
        await contract.methods.getProducts().call().then((data) => {
            const products:  IProduct[] = [];
            data.forEach((el: productMPT) => {
                const product: productBN = {
                    title: el.title,
                    price: BigNumber(el.price.toString()),
                    description: el.description,
                    category: el.category,
                    image: el.image,
                    rateValue: Number(el.rateValue),
                    rateCount: BigNumber(el.rateCount.toString())
                };

                products.push({
                    product: product,
                    count: BigNumber(0),
                    isInCart: false
                });
            });
            setProducts(products);
        });
    }

    const addToCart = (product: IProduct) => {
        if (!product.isInCart) {
            product.isInCart = true;
            product.count = BigNumber(1);
            setCartProducts([...cartProducts, product]);
            updateOrderPrice(product.product.price);
        }
    }

    const changeProductCount = (product: IProduct, isIncrease: boolean) => {
        const k = isIncrease ?  1 : -1;
        updateOrderPrice(product.product.price.multipliedBy(k));
        product.count = product.count.plus(k);
        if (product.count.isZero()) {
            product.isInCart = false;
            setCartProducts(cartProducts.filter((el: IProduct) => el !== product));
        }
    }

    const removeFromCart = (product: IProduct) => {
        updateOrderPrice(product.product.price.negated().multipliedBy(product.count));
        product.count = BigNumber(0);
        product.isInCart = false;
        setCartProducts(cartProducts.filter((el: IProduct) => el !== product));
    }

    const updateOrderPrice = (price: BigNumber) => {
        setOrderPrice(orderPrice.plus(price))
    };

    const buyProducts = async () => {
        const cart: ICartProduct[] = cartProducts.map(el => {
            const { isInCart, ...product } = el;

            const productStrings = {} as ICartProduct;
            productStrings.product = {} as productMPT;
            productStrings.product.title = "title";
            Object.keys(product.product).forEach((key: string) => {
                productStrings.product[key] = product.product[key].toString();
            });
            productStrings.count = product.count.toString();

            return productStrings;
        });
        await contract.methods.buyProducts(cart).send({from: sender, value: orderPrice.toString()});
    }

    const values: IContextValues = {
        currency: currency,
        toEther: toEther,
        sender: sender,
        contract: contract,
        signIn: signIn,
        signUp: signUp,
        balance: balance,
        getBalance: getBalance,
        products: products,
        getProducts: getProducts,
        cartProducts: cartProducts,
        addToCart: addToCart,
        changeProductCount: changeProductCount,
        removeFromCart: removeFromCart,
        orderPrice: orderPrice,
        updateOrderPrice: updateOrderPrice,
        buyProducts: buyProducts,
        modalShow: modalShow,
        setModalShow: setModalShow
    }

    return (
        <StateContext.Provider value={values}>
            {children}
        </StateContext.Provider>
    )

}