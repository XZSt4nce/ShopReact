import {createContext, ReactNode, useState} from 'react';
import { IProduct, IContextValues } from "../constants/interfaces";
import {ProductsService} from "../Services/ProductsService";
import * as React from 'react';

export const StateContext = createContext({} as IContextValues)

export const ContextProvider = ({ children }: { children: ReactNode }) => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [cartProducts, setCartProducts] = useState<IProduct[]>([]);
    const [orderPrice, setOrderPrice] = useState(0);
    const [text, setText] = useState("");
    const [type, setType] =  useState("");
    const [hidden, setHidden] =  useState(true);
    const [cartShow, setCartShow] = useState(false);

    const getProducts = async () => {
        await ProductsService().then((data) => {
            data.forEach((el: IProduct) => {
                el.cartCount = 0;
                el.isInCart = false;
            });
            setProducts(data);
        });
    }

    const setListProducts = (products: IProduct[]) => {
        setProducts(products);
    };

    const setCart = (products: IProduct[]) => {
        setCartProducts(products);
    };

    const setCartPrice = (price: number) => {
        setOrderPrice(price);
    };

    const setMsgText = (text: string) => {
        setText(text);
    }

    const setMsgType = (type: string) => {
        setType(type);
    }

    const setMsgHidden = (isHidden: boolean) => {
        setHidden(isHidden);
    }

    const setShowCart = (isShow: boolean) => {
        setCartShow(isShow);
        setMsgHidden(true);
    }

    const values: IContextValues = {
        products: products,
        getProducts: getProducts,
        setListProducts: setListProducts,
        cartProducts: cartProducts,
        setCart: setCart,
        orderPrice: orderPrice,
        setCartPrice: setCartPrice,
        msgText: text,
        setMsgText: setMsgText,
        msgType: type,
        setMsgType: setMsgType,
        msgHidden: hidden,
        setMsgHidden: setMsgHidden,
        cartShow: cartShow,
        setShowCart: setShowCart,
    }

    return (
        <StateContext.Provider value={values}>
            {children}
        </StateContext.Provider>
    )

}