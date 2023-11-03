import {Product} from "./Product";
import {Sidebar} from "../Kit/Sidebar";
import {useContext} from "react";
import {StateContext} from "../../core/StateContext";
import {Alert, Badge, Button} from "react-bootstrap";

export const Cart = () => {
    const {orderPrice, cartProducts, setMsgHidden, setMsgType, setMsgText, msgHidden, msgText, msgType, cartShow, setShowCart} = useContext(StateContext);

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
        <div className={"w-100 h-100 d-flex flex-column"}>
            {!msgHidden ? <Alert variant={msgType} onClose={() => setMsgHidden(true)} dismissible>{msgText}</Alert> : ""}
            <div className={"d-flex flex-column gap-2 overflow-auto mb-2"}>
                {cartProducts.map((el, idx) => (
                    <Product key={`cart-${idx}`} product={el} isCart={true}/>
                ))}
            </div>
            <p className={"mt-auto fs-4"}>
                <Badge bg={"white"} text={"black"} className={"w-100"}>{`${orderPrice}$`}</Badge>
            </p>
            <Button className={"w-100"} variant={"primary"} onClick={order}>Order</Button>
        </div>
    );

    return (
        <Sidebar title={"Cart"} container={container} show={cartShow} setShow={setShowCart} placement={"end"} />
    );
};