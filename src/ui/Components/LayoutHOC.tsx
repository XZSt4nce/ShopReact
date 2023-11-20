import * as React from 'react';
import {NavbarHeader} from "./NavbarHeader";
import {ReactNode, useContext} from "react";
import {Toast, ToastContainer} from "react-bootstrap";
import {StateContext} from "../../core/StateContext";

export const LayoutHOC = ({ children }: { children: ReactNode }) => {
    const { orderVisible, hideOrder } = useContext(StateContext);

    return (
        <div className={"d-flex flex-column w-100 h-100"}>
            <NavbarHeader/>
            {children}
            <ToastContainer className={"p-3"} position={"bottom-end"} style={{zIndex: "1000"}}>
                <Toast show={orderVisible} onClose={hideOrder}>
                    <Toast.Header className={"text-white bg-success fw-bold"}>
                        <p className={"me-auto mb-0"}>Successfully ordered!</p>
                    </Toast.Header>
                </Toast>
            </ToastContainer>

        </div>
    );
};