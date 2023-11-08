import {Product} from "./Product";
import {Sidebar} from "../Kit/Sidebar";
import {useContext} from "react";
import {StateContext} from "../../core/StateContext";
import {Badge, Button} from "react-bootstrap";
import * as React from 'react';

export const Cart = () => {
    const {orderPrice, cartProducts, cartShow, setCartShow, contract} = useContext(StateContext);

    const order = function() {
        if (cartProducts.length === 0) {
            // ToDo: error
        } else {
            // ToDo: success
            contract.methods.buyProducts();
        }
    }

    return (
        <Sidebar title={"Cart"} show={cartShow} setShow={setCartShow} placement={"end"}>
            <div className={"d-flex flex-column gap-2 overflow-auto mb-2"}>
                {cartProducts.map((el, idx) => (
                    <Product key={`cart-${idx}`} product={el} isCart={true}/>
                ))}
            </div>
            <p className={"mt-auto fs-4"}>
                <Badge bg={"white"} text={"black"} className={"w-100"}>{`${orderPrice}$`}</Badge>
            </p>
            <Button className={"w-100"} variant={"primary"} onClick={order}>Order</Button>
        </Sidebar>
    );
};