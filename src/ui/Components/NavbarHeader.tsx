import * as React from 'react';
import {Badge, Button, Nav, Navbar} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";
import {useContext, useEffect} from "react";
import {StateContext} from "../../core/StateContext";
import {BsFillBasket3Fill} from "react-icons/bs";

export const NavbarHeader = () => {
    const navigation = useHistory();
    const {getBalance, balance, sender, currency, toEther} = useContext(StateContext);

    useEffect(() => {
        (async () => {
            await getBalance();
        })();
    }, [sender]);

    return (
        <Navbar className={"w-100 p-2 sticky-top"} style={{background: "#454A75"}}>
            <Navbar.Brand><Link className={"text-white text-decoration-none user-select-none"} to={'/'}>Shop</Link></Navbar.Brand>
            <Nav className={"w-100 gap-2 d-flex justify-content-end"}>
                <Badge className={"d-flex align-items-center text-center  p-2"} bg={"light"} text={"dark"} >{`${toEther(balance)} ${currency}`}</Badge>
                <Button className={"h-100"} variant={"secondary"} onClick={() => navigation.push('/cart')}><BsFillBasket3Fill/></Button>
            </Nav>
        </Navbar>
    );
};