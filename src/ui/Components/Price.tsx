import * as React from 'react';
import BigNumber from "bignumber.js";
import {useContext} from "react";
import {StateContext} from "../../core/StateContext";

export const Price = ({ isCart, price, count }: {isCart: boolean,  price: BigNumber, count: BigNumber}) => {
    const {toEther, currency} = useContext(StateContext);
    price = toEther(price);
    if (isCart) {
        return (
            <div className={"text-end fw-bold"}>
                <p className={"m-0"}>{`${price}`}{currency}{` x ${count}pc.`}</p>
                <p className={"mb-2"}>{`= ${price.multipliedBy(count)}`}{currency}</p>
            </div>
        );
    } else {
        return (
            <p className={"text-end fw-bold mb-2"}>{`${price}`}{currency}</p>
        );
    }
};