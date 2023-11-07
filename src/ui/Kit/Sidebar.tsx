import {Offcanvas} from "react-bootstrap";
import * as React from 'react';

export const Sidebar = ({title, container, show, setShow, placement}) => {
    return (
        <Offcanvas backdropClassName={"d-flex flex-column"} className={"px-2"} show={show} placement={placement} onHide={() => setShow(false)} style={{color: "white"}}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>{title}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className={"w-100 h-100"}>
                {container}
            </Offcanvas.Body>
        </Offcanvas>
    )
};