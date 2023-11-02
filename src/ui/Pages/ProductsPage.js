import {useContext, useEffect} from 'react';
import "./ProductsPage.css";
import {Cart} from "../Components/Cart";
import {ProductsContainer} from "../Components/ProductsContainer";
import {Message} from "../Kit/Message";
import {StateContext} from "../../core/StateContext";
import {Filter} from "../Components/Filter";

const ProductsPage = () => {
    const { getProducts, selected } = useContext(StateContext);

    useEffect(() => {
        getProducts();
    }, [selected]);

    return (
        <div className={"wrapper"}>
            <header>
                <div id={"header-decoration"}>
                    {"Shop"}
                </div>
            </header>
            <Message/>
            <Cart/>
            <Filter/>
            <ProductsContainer/>
        </div>
    );
};

export default ProductsPage;