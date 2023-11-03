import {Rating} from "./Rating";
import {CartAmount} from "./CartAmount";
import {Price} from "./Price";
import {useContext} from "react";
import {StateContext} from "../../core/StateContext";
import {Button, Card, CloseButton} from "react-bootstrap";

export const Product = ({ product, isCart }) => {
    const {orderPrice, setCartPrice, cartProducts, setCart} = useContext(StateContext);

    const changeProductCount = function(isIncrease) {
        const newPrice = orderPrice + product.price * (2 * isIncrease - 1);
        setCartPrice(Math.round(newPrice * 100) / 100);
        product.cartCount += 2 * isIncrease - 1;
        if (product.cartCount === 0) {
            product.isInCart = false;
            setCart(cartProducts.filter(el => el !== product));
        }
    }

    const removeProduct = function() {
        const newPrice = orderPrice - product.price * product.cartCount;
        setCartPrice(Math.round(newPrice * 100) / 100);
        product.cartCount = 0;
        product.isInCart = false;
        setCart(cartProducts.filter(el => el !== product));
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
                <CloseButton aria-label={"Delete"} variant={"red"} onClick={removeProduct} />
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