import * as React from 'react';
import {useContext} from "react";
import {StateContext} from "../../core/StateContext";
import {Product} from "../Components/Product";
import {Badge, Button} from "react-bootstrap";

const CartPage = () => {
    const {orderPrice, cartProducts, buyProducts, toEther, currency} = useContext(StateContext);

    return (
        <div className={"d-flex flex-column flex-grow-1 p-3"}>
            <div className={"d-flex flex-column flex-grow-1 gap-2 overflow-auto mb-2"}>
                {cartProducts.length === 0 ? <p className={"d-flex flex-column w-100 h-100 bg-black opacity-25 text-white fs-3 fw-bold align-items-center justify-content-center rounded"}>Cart is empty</p> : ""}
                {cartProducts.map((el, idx) => (
                    <Product key={`cart-${idx}`} product={el} isCart={true}/>
                ))}
            </div>
            <p className={"mt-auto fs-4"}>
                <Badge bg={"light"} text={"dark"} className={"w-100"}>{`${toEther(orderPrice)}${currency}`}</Badge>
            </p>
            <Button className={"w-100"} variant={"primary"} onClick={buyProducts}>Order</Button>
        </div>
    );
};

export default CartPage;