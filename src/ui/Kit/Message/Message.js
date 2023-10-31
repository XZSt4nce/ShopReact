import "./Message.css";
import {useContext} from "react";
import {StateContext} from "../../../core/StateContext";
import {Alert} from "react-bootstrap";

export const Message = () => {
    const {msgHidden, setMsgHidden, msgType, msgText} = useContext(StateContext);

    if (!msgHidden) {
        return (
            <Alert id={"msg"} variant={msgType} onClose={() => setMsgHidden(true)} dismissible>
                {msgText}
            </Alert>
        );
    }
};