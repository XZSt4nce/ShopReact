import {Rating} from "./Rating";
import {CartAmount} from "./CartAmount";
import {Price} from "./Price";
import {useContext} from "react";
import {StateContext} from "../../core/StateContext";
import {Button, Card, CloseButton} from "react-bootstrap";
import {IProduct} from "../../constants/interfaces";
import * as React from 'react';

export const Product = ({ product, isCart = false }: {product: IProduct; isCart?: boolean;}) => {
    const {orderPrice, setCartPrice, cartProducts, setCart} = useContext(StateContext);

    const changeProductCount = function(isIncrease: boolean) {
        const k = isIncrease ?  1 : -1;
        const newPrice = orderPrice + product.price * k;
        setCartPrice(Math.round(newPrice * 100) / 100);
        product.cartCount += k;
        if (product.cartCount === 0) {
            product.isInCart = false;
            setCart(cartProducts.filter((el: IProduct) => el !== product));
        }
    }

    const removeProduct = function() {
        const newPrice = orderPrice - product.price * product.cartCount;
        setCartPrice(Math.round(newPrice * 100) / 100);
        product.cartCount = 0;
        product.isInCart = false;
        setCart(cartProducts.filter((el: IProduct) => el !== product));
    }

    const addToCart = function() {
        if (!product.isInCart) {
            product.isInCart = true;
            setCart([...cartProducts, product]);
            changeProductCount(true);
        }
    }

    const Close = function() {
        return (
            <div className={"w-100 d-flex justify-content-end"}>
                <CloseButton className={"rounded-circle"} style={{backgroundColor: "red"}} aria-label={"Delete"} onClick={removeProduct} />
            </div>
        )
    }

    return (
        <Card className={"w-100 p-2"} bg={"light"} text={"dark"} style={{minWidth: "156px"}}>
            {isCart ? <Close/> : ""}
            <Card.Img className={"user-select-none object-fit-contain pe-none"} src={product.image} alt={"Cart image"} style={{height: "150px", mixBlendMode: "multiply"}}/>
            <Rating rate={product.rating.rate}/>
            <Card.Text className={"text-center"}>({product.rating.count})</Card.Text>
            <Card.Body>
                <Card.Title className={"text-truncate"}>{product.title}</Card.Title>
                <Card.Text className={"text-truncate"}>{product.description}</Card.Text>
                <Price price={product.price} count={product.cartCount} isCart={isCart} />
                {isCart || product.isInCart ? <CartAmount count={product.cartCount} onClick={changeProductCount}/> : <Button onClick={addToCart} variant={"primary"} style={{width: "100%"}}>Add to cart</Button>}
            </Card.Body>
        </Card>
    );
};