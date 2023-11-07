import {useContext, useEffect} from 'react';
import {Cart} from "../Components/Cart";
import {ProductsContainer} from "../Components/ProductsContainer";
import {StateContext} from "../../core/StateContext";
import * as React from 'react';

const ProductsPage = () => {
    const { getProducts } = useContext(StateContext);

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className={"d-flex flex-column"}>
            <Cart/>
            <ProductsContainer/>
        </div>
    );
};

export default ProductsPage;