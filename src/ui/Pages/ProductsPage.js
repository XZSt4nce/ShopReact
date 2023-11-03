import {useContext, useEffect} from 'react';
import {Cart} from "../Components/Cart";
import {ProductsContainer} from "../Components/ProductsContainer";
import {StateContext} from "../../core/StateContext";
import {Filter} from "../Components/Filter";
import {Button, Nav, Navbar} from "react-bootstrap";

const ProductsPage = () => {
    const { getProducts, selected, setShowCart, setShowFilter } = useContext(StateContext);

    useEffect(() => {
        getProducts();
    }, [selected]);

    return (
        <div className={"vw-100 vh-100 d-flex flex-column"}>
            <Navbar className={"p-2 sticky-top"} style={{background: "#454A75"}}>
                <Navbar.Brand className={"text-white user-select-none"}>Shop</Navbar.Brand>
                <Navbar.Collapse className={"d-flex justify-content-end"}>
                    <Nav className={"gap-2"}>
                        <Button className={"h-100"} variant={"secondary"} onClick={() => setShowFilter(true)}>ᗊ︎</Button>
                        <Button className={"h-100"} variant={"secondary"} onClick={() => setShowCart(true)}>≡</Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Filter/>
            <Cart/>
            <ProductsContainer/>
        </div>
    );
};

export default ProductsPage;