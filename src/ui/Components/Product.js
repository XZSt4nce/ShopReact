import {Rating} from "./Rating";
import {Button} from "react-bootstrap";
import {CartAmount} from "./CartAmount";
import {Price} from "./Price";
import {useContext} from "react";
import {StateContext} from "../../core/StateContext";
import {Card, CloseButton} from "react-bootstrap";

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

    // return (
    //     <div className="product" style={{boxShadow: isCart ? "" : "0 0 10px #00000064"}}>
    //         {isCart ? <Button type={"close"} onClick={removeProduct}/> : ""}
    //         <img src={product.image} alt={""} className={"image"}></img>
    //         <Rating rate={product.rating.rate}/>
    //         <p>({product.rating.count})</p>
    //         <h1 className={"title text-wrapper"}>{product.title}</h1>
    //         <p className={"description text-wrapper"}>{product.description}</p>
    //         <Price product={product} isCart={isCart}/>
    //         {isCart || product.isInCart ? <CartAmount count={product.cartCount} onClick={changeProductCount}/> : <Button text={"Add to cart"} onClick={addToCart} type={"pr"}/>}
    //     </div>
    // );
    return (
        <Card style={{width: "200px"}} bg={"light"} text={"dark"}>
            {isCart ? <CloseButton aria-label={"Delete"} variant={"red"} onClick={removeProduct} /> : ""}
            <Card.Img variant={"top"} src={product.image} alt={"Cart image"}/>
            <Rating rate={product.rating.rate}/>
            <Card.Text>({product.rating.count})</Card.Text>
            <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Price product={product} isCart={isCart} />
                {isCart || product.isInCart ? <CartAmount count={product.cartCount} onClick={changeProductCount}/> : <Button onClick={addToCart} variant={"primary"}>Add to cart</Button>}
            </Card.Body>
        </Card>
    );
};