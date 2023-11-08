import { Dispatch, SetStateAction } from "react";
import {Contract} from "web3";

interface IProduct {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {rate: number; count: number};
    cartCount: number;
    isInCart: boolean;
}

interface IContextValues {
    sender: string;
    contract: Contract<any>;
    signIn: (login: string, password: string) => Promise<void>;
    signUp: (login: string, password: string) => Promise<void>;
    products: IProduct[];
    getProducts: () => Promise<void>;
    cartProducts: IProduct[];
    addToCart: (product: IProduct) => void;
    changeProductCount: (product: IProduct, isIncrease: boolean) => void;
    removeFromCart: (product: IProduct) => void;
    orderPrice: number;
    updateOrderPrice: Dispatch<SetStateAction<number>>;
    cartShow: boolean;
    setCartShow: Dispatch<SetStateAction<boolean>>;
    modalShow: boolean;
    setModalShow: Dispatch<SetStateAction<boolean>>;
}

export { IProduct, IContextValues };