import {useContext, useEffect} from 'react';
import {ProductsContainer} from "../Components/ProductsContainer";
import {StateContext} from "../../core/StateContext";
import * as React from 'react';

const ProductsPage = () => {
    const { getProducts } = useContext(StateContext);

    useEffect(() => {
        (async () => {
            await getProducts();
        })()
    }, []);

    return (
        <div className={"d-flex flex-column flex-grow-1"}>
            <ProductsContainer/>
        </div>
    );
};

export default ProductsPage;