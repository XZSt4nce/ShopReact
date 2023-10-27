import "./Sidebar.css";
import {Button} from "../../Kit/Button/Button";
import {Product} from "../Product/Product";
import SidebarSwitch from "../SidebarSwitch/SidebarSwitch";

export const Sidebar = ({ orderPrice, sidebarLeft, setSidebarLeft, cart, }) => {
    return (
        <aside style={{ left: `${sidebarLeft}px` }}>
            <div id={"sidebar"}>
                <SidebarSwitch sidebarLeft={sidebarLeft} setSidebarLeft={setSidebarLeft} cartLength={cart.products.length}/>
                <Button id={"hide"} text={"X"} type={"sec"} onClick={() => setSidebarLeft(-280)}/>
                <h1 id={"cart-title"}>Cart</h1>
                <div id={"cart-products"}>
                    {cart.products.map((el, idx) => (
                        <Product key={`cart-${idx}`} product={el} isCart={true} cart={cart}/>
                    ))}
                </div>
                <p id={"order-price"}>{`${orderPrice}$`}</p>
                <Button text={"Order"} type={"pr"}/>
            </div>
        </aside>
    );
};