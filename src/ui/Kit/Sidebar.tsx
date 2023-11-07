import {Offcanvas} from "react-bootstrap";
import * as React from 'react';
import {Dispatch, ReactNode, SetStateAction} from "react";
import {OffcanvasPlacement} from "react-bootstrap/Offcanvas";

export const Sidebar = ({title, show, setShow, placement, children}: {title: string, show: boolean, setShow: Dispatch<SetStateAction<boolean>>, placement: OffcanvasPlacement, children: ReactNode}) => {
    return (
        <Offcanvas className={"px-2"} show={show} placement={placement} onHide={() => setShow(false)} style={{color: "white"}}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>{title}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className={"w-100 h-100 d-flex flex-column"}>
                {children}
            </Offcanvas.Body>
        </Offcanvas>
    )
};