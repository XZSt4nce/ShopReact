import * as React from 'react';
import {Badge, Button, Nav, Navbar} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";
import {useContext, useEffect} from "react";
import {StateContext} from "../../core/StateContext";
import {BsFillBasket3Fill} from "react-icons/bs";

export const NavbarHeader = () => {
    const {getBalance, balance, sender, currency, toEther, logOut} = useContext(StateContext);
    const buttonClass = "h-100 btn btn-secondary";
    const history = useHistory();

    const logOutPage = () => {
        logOut();
        history.push("/");
    }

    useEffect(() => {
        if (sender) {
            history.push('/products');
            (async () => {
                await getBalance();
            })();
        } else {
            history.push("/");
        }
    }, [sender]);

    if (window.location.pathname !== "/" && window.location.pathname !== "/register") {
        return (
            <Navbar className={"w-100 p-2 sticky-top"} style={{background: "#454A75"}}>
                <Navbar.Brand><Link className={"text-white text-decoration-none user-select-none"} to={'/products'}>Shop</Link></Navbar.Brand>
                <Nav className={"w-100 gap-2 d-flex justify-content-end"}>
                    <Button className={"h-100"} variant={"secondary"} onClick={logOutPage}>Log Out</Button>
                    <Badge className={"d-flex align-items-center text-center"} bg={"light"} text={"dark"} >{`${toEther(balance)}`} {currency}</Badge>
                    <Link className={buttonClass} to={"/cart"}><BsFillBasket3Fill/></Link>
                </Nav>
            </Navbar>
        );
    }
};