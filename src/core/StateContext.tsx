import {createContext, ReactNode, useState} from 'react';
import { IProduct, IContextValues } from "../constants/interfaces";
import {ProductsService} from "../Services/ProductsService";
import * as React from 'react';
import {Web3Service} from "../Services/Web3Service";

export const StateContext = createContext({} as IContextValues)

const address = "0xd9145CCE52D386f254917e481eB44e9943F39138";
const abi = [{"inputs":[{"components":[{"internalType":"string","name":"title","type":"string"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"string","name":"description","type":"string"},{"internalType":"string","name":"category","type":"string"},{"internalType":"string","name":"image","type":"string"},{"internalType":"uint256","name":"rateValue","type":"uint256"},{"internalType":"uint256","name":"rateCount","type":"uint256"}],"internalType":"struct IShop.Product[]","name":"initProducts","type":"tuple[]"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"components":[{"internalType":"string","name":"title","type":"string"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"string","name":"description","type":"string"},{"internalType":"string","name":"category","type":"string"},{"internalType":"string","name":"image","type":"string"},{"internalType":"uint256","name":"rateValue","type":"uint256"},{"internalType":"uint256","name":"rateCount","type":"uint256"}],"internalType":"struct IShop.Product[]","name":"newProducts","type":"tuple[]"}],"name":"addProducts","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"components":[{"internalType":"string","name":"title","type":"string"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"string","name":"description","type":"string"},{"internalType":"string","name":"category","type":"string"},{"internalType":"string","name":"image","type":"string"},{"internalType":"uint256","name":"rateValue","type":"uint256"},{"internalType":"uint256","name":"rateCount","type":"uint256"}],"internalType":"struct IShop.Product","name":"product","type":"tuple"},{"internalType":"uint256","name":"count","type":"uint256"}],"internalType":"struct IShop.CartProduct[]","name":"cartProducts","type":"tuple[]"}],"name":"buyProducts","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getProducts","outputs":[{"components":[{"components":[{"internalType":"string","name":"title","type":"string"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"string","name":"description","type":"string"},{"internalType":"string","name":"category","type":"string"},{"internalType":"string","name":"image","type":"string"},{"internalType":"uint256","name":"rateValue","type":"uint256"},{"internalType":"uint256","name":"rateCount","type":"uint256"}],"internalType":"struct IShop.Product","name":"product","type":"tuple"},{"internalType":"uint256","name":"count","type":"uint256"}],"internalType":"struct IShop.CartProduct[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"login","type":"string"},{"internalType":"string","name":"password","type":"string"}],"name":"signIn","outputs":[{"internalType":"address","name":"wallet","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"login","type":"string"},{"internalType":"string","name":"password","type":"string"}],"name":"signUp","outputs":[],"stateMutability":"nonpayable","type":"function"}] as const;

export const ContextProvider = ({ children }: { children: ReactNode }) => {
    const web3 = Web3Service();
    const contract = new web3.eth.Contract(abi, address);

    const [sender, setSender] = useState("");
    const [products, setProducts] = useState<IProduct[]>([]);
    const [cartProducts, setCartProducts] = useState<IProduct[]>([]);
    const [orderPrice, setOrderPrice] = useState(0);
    const [cartShow, setCartShow] = useState(false);
    const [modalShow, setModalShow] = useState(false);

    const signIn = async (login: string, password: string) => {
        contract.methods.signIn(login, password).call({from: sender})
            .then(address => setSender(address));
    }

    const signUp = async (login: string, password: string) => {
        await web3.eth.personal.newAccount(password)
            .then(address => setSender(address));
        await web3.eth.personal.unlockAccount(sender, password, 0)
            .then(() => contract.methods.signUp(login, password));
    }

    const getProducts = async () => {
        await ProductsService().then((data) => {
            data.forEach((el: IProduct) => {
                el.cartCount = 0;
                el.isInCart = false;
            });
            setProducts(data);
        });
    }

    const addToCart = (product: IProduct) => {
        if (!product.isInCart) {
            product.isInCart = true;
            product.cartCount++;
            setCartProducts([...cartProducts, product]);
            updateOrderPrice(product.price);
        }
    }

    const changeProductCount = (product: IProduct, isIncrease: boolean) => {
        const k = isIncrease ?  1 : -1;
        updateOrderPrice(product.price * k);
        product.cartCount += k;
        if (product.cartCount === 0) {
            product.isInCart = false;
            setCartProducts(cartProducts.filter((el: IProduct) => el !== product));
        }
    }

    const removeFromCart = (product: IProduct) => {
        updateOrderPrice(-product.price * product.cartCount);
        product.cartCount = 0;
        product.isInCart = false;
        setCartProducts(cartProducts.filter((el: IProduct) => el !== product));
    }

    const updateOrderPrice = (price: number) => {
        setOrderPrice(Math.round((orderPrice + price) * 100) / 100);
    };

    const values: IContextValues = {
        sender: sender,
        contract: contract,
        signIn: signIn,
        signUp: signUp,
        products: products,
        getProducts: getProducts,
        cartProducts: cartProducts,
        addToCart: addToCart,
        changeProductCount: changeProductCount,
        removeFromCart: removeFromCart,
        orderPrice: orderPrice,
        updateOrderPrice: updateOrderPrice,
        cartShow: cartShow,
        setCartShow: setCartShow,
        modalShow: modalShow,
        setModalShow: setModalShow
    }

    return (
        <StateContext.Provider value={values}>
            {children}
        </StateContext.Provider>
    )

}