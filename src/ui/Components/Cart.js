import {Product} from "./Product";
import {Sidebar} from "../Kit/Sidebar";
import {useContext, useState} from "react";
import {StateContext} from "../../core/StateContext";
import {Button} from "react-bootstrap";

export const Cart = () => {
    const [sidebarLeft, setSidebarLeft] = useState(-280);
    const {orderPrice, setCartPrice, cartProducts, setMsgHidden, setMsgType, setMsgText} = useContext(StateContext);

    const order = function() {
        if (cartProducts.length === 0) {
            setMsgType("danger");
            setMsgText("Cart is empty!");
        } else {
            setMsgType("success");
            setMsgText("Thanks for order!");
            console.log(cartProducts);
        }
        setMsgHidden(false);
    }

    const container = (
        <div>
            <div>
                {cartProducts.map((el, idx) => (
                    <Product key={`cart-${idx}`} product={el} isCart={true}/>
                ))}
            </div>
            <p>{`${orderPrice}$`}</p>
            <Button variant={"primary"} onClick={order}>Order</Button>
        </div>
    );

    return (
        <Sidebar
            sidebarLeft={sidebarLeft}
            setSidebarLeft={setSidebarLeft}
            count={cartProducts.length}
            title={"Cart"}
            tongueTop={100}
            tongueSymbol={"≡"}
            container={container}
        />
    );
};