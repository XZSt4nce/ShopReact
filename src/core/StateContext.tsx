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
    const [orderVisible, setOrderVisible] = useState(false);

    const showOrder = () => {
        setOrderVisible(true);
    };

    const hideOrder = () => {
        setOrderVisible(false);
    }

    const processProducts = (data) => {
        const products:  IProduct[] = [];
        data.forEach((el) => {
            const product: IProduct = {
                title: el.title,
                price: ProductsService.web3.utils.toBN(el.price.toString()),
                description: el.description,
                category: el.category,
                image: el.image,
                rateValue: Number(el.rateValue),
                rateCount: ProductsService.web3.utils.toBN(el.rateCount.toString()),
                count: new BN(el.count),
                isInCart: false
            };
            products.push(product);
        });
        return products;
    };

    const getProducts = async () => {
        await ProductsService.getProducts()
            .then((data) => {
                setProducts(processProducts(data));
            });
    };

    const getMyProducts = async (): Promise<IProduct[]> => {
        return await ProductsService.getMyProducts(sender).then(processProducts);
    };

    const signIn = async (login: string, password: string) => {
        await ProductsService.logIn(login, password)
            .then((address: string) => setSender(address));
    };

    const signUp = async (address: string, login: string, password: string) => {
        await ProductsService.register(address, login, password)
            .then(() => setSender(address));
    };

    const getBalance = async () => {
        await ProductsService.getBalance(sender)
            .then((balance: string) => setBalance(new BN(balance)))
            .catch(console.log);
    };

    const logOut = () => {
        setSender("");
        setCartProducts([]);
        setOrderPrice(new BN(0));
    };

    const addToCart = (product: IProduct) => {
        if (!product.isInCart) {
            product.isInCart = true;
            product.count = new BN(1);
            setCartProducts([...cartProducts, product]);
            updateOrderPrice(product.price);
        }
    };

    const changeProductCount = (product: IProduct, isIncrease: boolean) => {
        const k = isIncrease ? new BN(1) : new BN(-1);
        updateOrderPrice(product.price.mul(k));
        product.count = product.count.add(k);
        if (product.count.isZero()) {
            product.isInCart = false;
            setCartProducts(cartProducts.filter((el: IProduct) => el !== product));
        }
    };

    const removeFromCart = (product: IProduct) => {
        updateOrderPrice(product.price.neg().mul(product.count));
        product.count = new BN(0);
        product.isInCart = false;
        setCartProducts(cartProducts.filter((el: IProduct) => el !== product));
    };

    const updateOrderPrice = (price: BN) => {
        setOrderPrice(orderPrice.add(price))
    };

    const buyProducts = async () => {
        const cart = [];
        cartProducts.forEach((el) => {
            const {isInCart, price, count, rateCount, ...product} = el;
            cart.push({...product, price: price.toString(), count: count.toString(), rateCount: rateCount.toString()});
        });
        if (cart.length > 0) {
            await ProductsService.buyProducts(cart, sender, orderPrice)
                .then(() => {
                    setOrderVisible(true);
                    setCartProducts([]);
                    setOrderPrice(new BN(0));
                })
                .catch(console.log);
        }
        await getBalance();
    };

    const values: IContextValues = {
        orderVisible: orderVisible,
        showOrder: showOrder,
        hideOrder: hideOrder,
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
        getMyProducts: getMyProducts
    }

    return (
        <StateContext.Provider value={values}>
            {children}
        </StateContext.Provider>
    )

}