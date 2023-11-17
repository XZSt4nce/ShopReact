import * as React from 'react';
import {useContext} from "react";
import {StateContext} from "../../core/StateContext";
import BN from "bn.js";

export const Price = ({ isCart, price, count }: {isCart: boolean,  price: BN, count: BN}) => {
    const {toEther, currency} = useContext(StateContext);

    if (isCart) {
        return (
            <div className={"text-end fw-bold"}>
                <p className={"m-0"}>{`${toEther(price)}`}{currency}{` x ${count}pc.`}</p>
                <p className={"mb-2"}>{`= ${toEther(price.mul(count))}`}{currency}</p>
            </div>
        );
    } else {
        return (
            <p className={"text-end fw-bold mb-2"}>{`${toEther(price)}`}{currency}</p>
        );
    }
};