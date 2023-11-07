import {useContext, useEffect} from 'react';
import {Cart} from "../Components/Cart";
import {ProductsContainer} from "../Components/ProductsContainer";
import {StateContext} from "../../core/StateContext";
import {Filter} from "../Components/Filter";
import * as React from 'react';

const ProductsPage = () => {
    const { getProducts, selected } = useContext(StateContext);

    useEffect(() => {
        getProducts();
    }, [selected]);

    return (
        <div className={"d-flex flex-column"}>
            <Filter/>
            <Cart/>
            <ProductsContainer/>
        </div>
    );
};

export default ProductsPage;