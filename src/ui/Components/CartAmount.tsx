import * as React from 'react';
import {useContext} from "react";
import {StateContext} from "../../core/StateContext";
import {IProduct} from "../../constants/interfaces";

export const CartAmount = ({ product }: {product: IProduct}) => {
    const { changeProductCount } = useContext(StateContext);

    return (
        <div className={"d-flex flex-row align-items-center fw-bold"}>
            <button className={"btn btn-outline-secondary rounded-circle"} style={{width: "40px", height: "40px"}} onClick={() => changeProductCount(product, false)}>–</button>
            <p className={"text-center flex-grow-1 m-0"}>{`${product.cartCount}pc.`}</p>
            <button className={"btn btn-outline-secondary rounded-circle"} style={{width: "40px", height: "40px"}} onClick={() => changeProductCount(product, true)}>+</button>
        </div>
    );
};