import * as React from 'react';
import {FormEvent, useContext, useState} from "react";
import {StateContext} from "../../core/StateContext";
import {Product} from "../Components/Product";
import {Badge, Button, Form} from "react-bootstrap";

const CartPage = () => {
    const {orderPrice, cartProducts, order, toEther, currency} = useContext(StateContext);
    const [privateKey, setPrivateKey] = useState("");

    const onOrder = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        order(privateKey);
    }

    return (
        <div className={"d-flex flex-column flex-grow-1 p-3"}>
            <div className={"d-flex flex-column flex-grow-1 gap-2 overflow-auto mb-2"}>
                {cartProducts.length === 0 ? <p className={"d-flex flex-column w-100 h-100 bg-black opacity-25 text-white fs-3 fw-bold align-items-center justify-content-center rounded"}>Cart is empty</p> : ""}
                {cartProducts.map((el, idx) => (
                    <Product key={`cart-${idx}`} product={el} isCart={true}/>
                ))}
            </div>
            <p className={"mt-auto fs-4"}>
                <Badge bg={"light"} text={"dark"} className={"w-100"}>{`${toEther(orderPrice)}`}{currency}</Badge>
            </p>
            <Form onSubmit={onOrder}>
                <Form.Group className={"mb-3"} controlId={"formPrivateKey"}>
                    <Form.Label column={"lg"}>Private key</Form.Label>
                    <Form.Control className={"bg-white"} type={"password"} placeholder={"Enter private key"} onChange={({target: {value}}) => setPrivateKey(value)} required/>
                    <Form.Text className={"text-muted"}>We do not store private keys</Form.Text>
                </Form.Group>
                <Button className={"w-100"} variant={"primary"} type={"submit"}>Order</Button>
            </Form>
        </div>
    );
};

export default CartPage;