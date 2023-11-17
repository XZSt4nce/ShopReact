import {JSX} from "react";
import BN from "bn.js";

interface IProduct {
    title: string;
    price: BN;
    description: string;
    category: string;
    image: string;
    rateValue: number;
    rateCount: BN;
    count: BN;
    isInCart: boolean;
}

interface IContextValues {
    currency: JSX.Element;
    toEther: (wei: BN) => string;
    sender: string;
    signIn: (login: string, password: string) => Promise<any>;
    signUp: (address: string, login: string, password: string) => Promise<void>;
    logOut: () => void;
    balance: BN,
    getBalance: () => Promise<void>;
    products: IProduct[];
    getProducts: () => Promise<void>;
    cartProducts: IProduct[];
    addToCart: (product: IProduct) => void;
    changeProductCount: (product: IProduct, isIncrease: boolean) => void;
    removeFromCart: (product: IProduct) => void;
    orderPrice: BN;
    buyProducts: () => void;
    buyProductsGas: () => Promise<any>;
}

export { IProduct, IContextValues };