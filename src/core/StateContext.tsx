import * as React from 'react';
import {createContext, ReactNode, useState} from 'react';
import {ICartProduct, IContextValues, IProduct} from "../constants/interfaces";
import {toEther, getBal} from "../Services/Web3Service";
import BigNumber from "bignumber.js";
import {productMPT} from "../constants/types";
import {FaEthereum} from "react-icons/fa";
import {Address} from "web3";
import {buyProducts, getProds, logIn, register} from "../Services/ContractService";

export const StateContext = createContext({} as IContextValues)

export const ContextProvider = ({ children }: { children: ReactNode }) => {
    const [sender, setSender] = useState<Address>("0x64Fa1246f748aCA9d8037A574F0342012041ec98");
    const [balance, setBalance] = useState(BigNumber(0));
    const [products, setProducts] = useState<IProduct[]>([]);
    const [cartProducts, setCartProducts] = useState<IProduct[]>([]);
    const [orderPrice, setOrderPrice] = useState(BigNumber(0));
    const [currency] = useState(<FaEthereum/>);

    const getProducts = async () => {
        await getProds(setProducts);
    }

    const getBalance = async () => {
        await getBal(sender)
            .then(balance => setBalance(BigNumber(balance.toString())))
    }

    const signIn = async (login: string, password: string) => {
        await logIn(login, password)
            .then(address => setSender(address));
    }

    const signUp = async (login: string, password: string) => {
        await register(login, password)
            .then(address => setSender(address));
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
        const k = isIncrease ? 1 : -1;
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

    const order = async (privateKey: string) => {
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
        await buyProducts(cart, privateKey, orderPrice);
    }

    const values: IContextValues = {
        currency: currency,
        toEther: toEther,
        sender: sender,
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
        order: order,
    }

    return (
        <StateContext.Provider value={values}>
            {children}
        </StateContext.Provider>
    )

}