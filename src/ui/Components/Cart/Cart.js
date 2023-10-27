import "./Cart.css";
import {Button} from "../../Kit/Button/Button";
import {Product} from "../Product/Product";
import Switch from "../Switch/Switch";

export const Cart = ({ cart, order}) => {
    return (
        <aside style={{ left: `${cart.sidebarLeft}px` }}>
            <div id={"cart"}>
                <Switch sidebarLeft={cart.sidebarLeft} setSidebarLeft={cart.setSidebarLeft} tongueTop={100} count={cart.products.length} text={"≡"}/>
                <Button id={"hide"} text={"X"} type={"sec"} onClick={() => cart.setSidebarLeft(-280)}/>
                <h1 id={"cart-title"}>Cart</h1>
                <div id={"cart-products"}>
                    {cart.products.map((el, idx) => (
                        <Product key={`cart-${idx}`} product={el} isCart={true} cart={cart}/>
                    ))}
                </div>
                <p id={"order-price"}>{`${cart.orderPrice}$`}</p>
                <Button text={"Order"} type={"pr"} onClick={order}/>
            </div>
        </aside>
    );
};