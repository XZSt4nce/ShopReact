import "./Sidebar.css";
import {Button} from "../../Kit/Button/Button";
import {Product} from "../Product/Product";

export const Sidebar = ({ orderPrice, sidebarLeft, cart }) => {
    return (
        <aside style={{ left: `${sidebarLeft}px` }}>
            <h1 id={"cart-title"}>Cart</h1>
            <div id={"cart-products"}>
                {cart.products.map((el, idx) => (
                    <Product key={`cart-${idx}`} product={el} isCart={true} cart={cart}/>
                ))}
            </div>
            <p id={"order-price"}>{`${orderPrice}$`}</p>
            <Button text={"Order"} type={"pr"}/>
        </aside>
    );
};