import {Rating} from "./Rating";
import {CartAmount} from "./CartAmount";
import {Price} from "./Price";
import {ReactNode, useContext, useEffect, useState} from "react";
import {StateContext} from "../../core/StateContext";
import {Button, Card, CloseButton} from "react-bootstrap";
import {IProduct} from "../../constants/interfaces";
import * as React from 'react';

export const Product = ({ product, isCart = false }: {product: IProduct; isCart?: boolean;}) => {
    const { addToCart, removeFromCart } = useContext(StateContext);
    const [bottomPart, setBottomPart] = useState<ReactNode>(null);

    const Close = function() {
        return (
            <div className={"w-100 d-flex justify-content-end"}>
                <CloseButton className={"rounded-circle"} style={{backgroundColor: "red"}} aria-label={"Delete"} onClick={() => removeFromCart(product)} />
            </div>
        )
    }

    useEffect(() => {
        if (product.count.gtn(0)) {
            if (isCart || product.isInCart) {
                setBottomPart(<CartAmount product={product} />);
            } else {
                setBottomPart(<p className={"w-100 text-center fw-bold mb-0"}>{product.count.toString()}pc.</p>);
            }
        } else {
            setBottomPart(<Button onClick={() => addToCart(product)} variant={"primary"} style={{width: "100%"}}>Add to cart</Button>);
        }
    }, [product.count]);

    return (
        <Card className={"w-100 p-2"} bg={"light"} text={"dark"} style={{minWidth: "156px"}}>
            {isCart ? <Close/> : ""}
            <Card.Img className={"user-select-none object-fit-contain pe-none"} src={product.image} alt={"Cart image"} style={{height: "150px", mixBlendMode: "multiply"}}/>
            <Rating rate={product.rateValue}/>
            <Card.Text className={"text-center"}>{product.rateCount.toString()}</Card.Text>
            <Card.Body>
                <Card.Title className={"text-truncate"}>{product.title}</Card.Title>
                <Card.Text className={"text-truncate"}>{product.description}</Card.Text>
                <Price price={product.price} count={product.count} isCart={isCart} />
                {bottomPart}
            </Card.Body>
        </Card>
    );
};