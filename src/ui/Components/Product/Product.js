import "./Product.css";
import {Rating} from "../Rating/Rating";
import {Button} from "../../Kit/Button/Button";
import {CartAmount} from "../cartAmount/cartAmount";

export const Product = ({ product, cart, isCart }) => {
    const changeProductCount = function(isIncrease) {
        const newPrice = Number(cart.orderPrice) + product.price * (2 * isIncrease - 1);
        cart.setOrderPrice(Math.round(newPrice * 100) / 100);
        product.cartCount += 2 * isIncrease - 1;

        if (product.cartCount === 0) {
            product.isInCart = false;
            cart.setProducts(cart.products.filter(el => el !== product));
        }
    }

    const addToCart = function() {
        const found = cart.products.find(el => el === product);
        product.isInCart = true;
        if (!found) {
            cart.setProducts([...cart.products, product]);
            changeProductCount(true);
        }
    }

    const removeProduct = function() {
        const newPrice = Number(cart.orderPrice) - product.price * product.cartCount;
        cart.setOrderPrice(Math.round(newPrice * 100) / 100);
        product.cartCount = 0;
        product.isInCart = false;
        cart.setProducts(cart.products.filter(el => el !== product));
    }

    return (
        <div className="product" style={{boxShadow: isCart ? "" : "0 0 10px #00000064"}}>
            {isCart ? <Button type={"close"} onClick={removeProduct}/> : ""}
            <img src={product.image} alt={""} className={"image"}></img>
            <Rating rate={product.rating.rate}/>
            <p>({product.rating.count})</p>
            <h1 className={"title text-wrapper"}>{product.title}</h1>
            <p className={"description text-wrapper"}>{product.description}</p>
            <p className={"price"}>{`${product.price}$`}</p>
            {isCart || product.isInCart ? <CartAmount count={product.cartCount} onClick={changeProductCount}/> : <Button text={"Add to cart"} onClick={addToCart} type={"pr"}/>}
        </div>
    );
};