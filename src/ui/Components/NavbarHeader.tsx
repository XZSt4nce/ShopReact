import * as React from 'react';
import {Badge, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useContext, useEffect} from "react";
import {StateContext} from "../../core/StateContext";
import {BsFillBasket3Fill} from "react-icons/bs";

export const NavbarHeader = () => {
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
                <Badge className={"d-flex align-items-center text-center p-2"} bg={"light"} text={"dark"} >{`${toEther(balance)}`} {currency}</Badge>
                <Link className={"h-100 btn btn-secondary"} to={"/cart"}><BsFillBasket3Fill/></Link>
            </Nav>
        </Navbar>
    );
};