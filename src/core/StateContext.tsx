import * as React from 'react';
import {createContext, ReactNode, useState} from 'react';
import {IContextValues, IProduct} from "../constants/interfaces";
import {FaEthereum} from "react-icons/fa";
import ProductsService from "../Services/ProductsService";
import BN from "bn.js";

export const StateContext = createContext({} as IContextValues)

export const ContextProvider = ({ children }: { children: ReactNode }) => {
    const [sender, setSender] = useState("");
    const [balance, setBalance] = useState(new BN(0));
    const [products, setProducts] = useState<IProduct[]>([]);
    const [cartProducts, setCartProducts] = useState<IProduct[]>([]);
    const [orderPrice, setOrderPrice] = useState(new BN(0));
    const [currency] = useState(<FaEthereum/>);

    const getProducts = async () => {
        await ProductsService.getProds(setProducts);
    }

    const signIn = async (login: string, password: string) => {
        await ProductsService.logIn(login, password)
            .then((address: string) => setSender(address));
    }

    const signUp = async (address: string, login: string, password: string) => {
        await ProductsService.register(address, login, password)
            .then(() => setSender(address));
    }

    const getBalance = async () => {
        await ProductsService.getBalance(sender)
            .then((balance: string) => setBalance(new BN(balance)))
            .catch(console.log);
    }

    const logOut = () => {
        setSender("");
        setCartProducts([]);
        setOrderPrice(new BN(0));
    }

    const addToCart = (product: IProduct) => {
        if (!product.isInCart) {
            product.isInCart = true;
            product.count = new BN(1);
            setCartProducts([...cartProducts, product]);
            updateOrderPrice(product.price);
        }
    }

    const changeProductCount = (product: IProduct, isIncrease: boolean) => {
        const k = isIncrease ? new BN(1) : new BN(-1);
        updateOrderPrice(product.price.mul(k));
        product.count = product.count.add(k);
        if (product.count.isZero()) {
            product.isInCart = false;
            setCartProducts(cartProducts.filter((el: IProduct) => el !== product));
        }
    }

    const removeFromCart = (product: IProduct) => {
        updateOrderPrice(product.price.neg().mul(product.count));
        product.count = new BN(0);
        product.isInCart = false;
        setCartProducts(cartProducts.filter((el: IProduct) => el !== product));
    }

    const updateOrderPrice = (price: BN) => {
        setOrderPrice(orderPrice.add(price))
    };

    const buyProducts = async () => {
        console.log(cartProducts, sender, orderPrice.toString());
        const cart = [];
        cart.forEach((el) => {
            const {isInCart, price, ...product} = el;
            cart.push({...product, price: price.toString()});
        });
        if (cartProducts.length > 0) {
            await ProductsService.buyProducts(cartProducts, sender, orderPrice)
                .catch(console.log);
        }
    }

    const buyProductsGas = async () => {
        return await ProductsService.estimateBuyProductsGas(cartProducts, sender);
    }

    const values: IContextValues = {
        currency: currency,
        toEther: ProductsService.toEther,
        sender: sender,
        signIn: signIn,
        signUp: signUp,
        logOut: logOut,
        balance: balance,
        getBalance: getBalance,
        products: products,
        getProducts: getProducts,
        cartProducts: cartProducts,
        addToCart: addToCart,
        changeProductCount: changeProductCount,
        removeFromCart: removeFromCart,
        orderPrice: orderPrice,
        buyProducts: buyProducts,
        buyProductsGas: buyProductsGas
    }

    return (
        <StateContext.Provider value={values}>
            {children}
        </StateContext.Provider>
    )

}