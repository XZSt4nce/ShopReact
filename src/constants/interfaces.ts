import { Dispatch, SetStateAction } from "react";
import {Contract, MatchPrimitiveType} from "web3";
import BigNumber from "bignumber.js";
import {productBN, productMPT} from "./types";

interface IProduct {
    product: productBN;
    count: BigNumber;
    isInCart: boolean;
}

interface ICartProduct {
    product: productMPT;
    count: MatchPrimitiveType<"uint256", unknown>;
}

interface IContextValues {
    currency: string;
    toEther: (wei: BigNumber) => BigNumber;
    sender: string;
    contract: Contract<any>;
    signIn: (login: string, password: string) => Promise<void>;
    signUp: (login: string, password: string) => Promise<void>;
    balance: BigNumber,
    getBalance: () => Promise<void>;
    products: IProduct[];
    getProducts: () => Promise<void>;
    cartProducts: IProduct[];
    addToCart: (product: IProduct) => void;
    changeProductCount: (product: IProduct, isIncrease: boolean) => void;
    removeFromCart: (product: IProduct) => void;
    orderPrice: BigNumber;
    updateOrderPrice: Dispatch<SetStateAction<BigNumber>>;
    buyProducts: () => void;
    modalShow: boolean;
    setModalShow: Dispatch<SetStateAction<boolean>>;
}

export { IProduct, ICartProduct, IContextValues };