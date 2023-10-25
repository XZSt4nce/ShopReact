import "./Sidebar.css";
import {useState} from "react";
import {Button} from "../../Kit/Button/Button";

export const Sidebar = () => {
    const [orderPrice, setOrderPrice] = useState(0);
    const [left, setLeft] = useState(-280);

    return (
        <aside style={{ left: `${left}px` }}>
            <h1 id={"cart-title"}>Cart</h1>
            <div id={"cart-products"}>

            </div>
            <p id={"order-price"}>{`${orderPrice}$`}</p>
            <Button text={"Order"} type={"pr"}/>
        </aside>
    );
};