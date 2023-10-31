import {Button} from "../Kit/Button/Button";
import {Product} from "./Product";
import {Sidebar} from "../Kit/Sidebar/Sidebar";
import {useContext, useState} from "react";
import {StateContext} from "../../core/StateContext";

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
        <div className={"container"}>
            <div className={"list"}>
                {cartProducts.map((el, idx) => (
                    <Product key={`cart-${idx}`} product={el} isCart={true}/>
                ))}
            </div>
            <p id={"order-price"}>{`${orderPrice}$`}</p>
            <Button text={"Order"} type={"pr"} onClick={order}/>
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