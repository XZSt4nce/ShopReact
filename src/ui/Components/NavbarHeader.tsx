import * as React from 'react';
import {Button, Nav, Navbar} from "react-bootstrap";
import {HiOutlineMenuAlt3} from "react-icons/hi";
import {useContext} from "react";
import {StateContext} from "../../core/StateContext";

export const NavbarHeader = () => {
    const { setCartShow } = useContext(StateContext);

    return (
        <Navbar className={"w-100 p-2 sticky-top"} style={{background: "#454A75"}}>
            <Navbar.Brand className={"text-white user-select-none"}>Shop</Navbar.Brand>
            <Nav className={"w-100 gap-2 d-flex justify-content-end"}>
                <Button className={"h-100"} variant={"secondary"} ></Button>
                <Button className={"h-100"} variant={"secondary"} ></Button>
                <Button className={"h-100"} variant={"secondary"} onClick={() => setCartShow(true)}><HiOutlineMenuAlt3/></Button>
            </Nav>
        </Navbar>
    );
};