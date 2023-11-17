import * as React from 'react';
import {useContext} from "react";
import {StateContext} from "../../core/StateContext";
import {IProduct} from "../../constants/interfaces";

export const CartAmount = ({ product }: {product: IProduct}) => {
    const { changeProductCount } = useContext(StateContext);
    const buttonClass = "btn btn-outline-secondary rounded-circle"
    const buttonStyle = {width: "40px", height: "40px"};

    const decreaseAmount = () => changeProductCount(product, false);
    const increaseAmount = () => changeProductCount(product, true);

    return (
        <div className={"d-flex flex-row align-items-center fw-bold"}>
            <button className={buttonClass} style={buttonStyle} onClick={decreaseAmount}>–</button>
            <p className={"text-center flex-grow-1 m-0"}>{`${product.count}pc.`}</p>
            <button className={buttonClass} style={buttonStyle} onClick={increaseAmount}>+</button>
        </div>
    );
};