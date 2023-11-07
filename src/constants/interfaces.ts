import {Dispatch, SetStateAction} from "react";

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
    products: IProduct[];
    getProducts: () => Promise<void>;
    setListProducts: Dispatch<SetStateAction<IProduct[]>>;
    cartProducts: IProduct[];
    setCart: Dispatch<SetStateAction<IProduct[]>>;
    orderPrice: number;
    setCartPrice: Dispatch<SetStateAction<number>>;
    msgText: string;
    setMsgText: Dispatch<SetStateAction<string>>;
    msgType: string;
    setMsgType: Dispatch<SetStateAction<string>>;
    msgHidden: boolean;
    setMsgHidden: Dispatch<SetStateAction<boolean>>;
    cartShow: boolean;
    setShowCart: Dispatch<SetStateAction<boolean>>;
}

export { IProduct, IContextValues };