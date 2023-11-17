import {useContext, useEffect, useState} from 'react';
import {ProductsContainer} from "../Components/ProductsContainer";
import {StateContext} from "../../core/StateContext";
import * as React from 'react';
import {IProduct} from "../../constants/interfaces";

const ProductsPage = () => {
    const [visibleProducts, setVisibleProducts] = useState<IProduct[]>([]);
    const { getProducts, products } = useContext(StateContext);

    const viewMoreProducts = () => {
        const additionalProducts = products.slice(visibleProducts.length, visibleProducts.length + 6);
        setVisibleProducts([...visibleProducts, ...additionalProducts]);
    }

    useEffect(() => {
        setVisibleProducts(products.slice(0, 6));
    }, [products]);

    useEffect(() => {
        (async () => {
            await getProducts();
        })()
    }, []);

    return (
        <div className={"d-flex flex-column flex-grow-1"}>
            <ProductsContainer visibleProducts={visibleProducts} onClick={viewMoreProducts}/>
        </div>
    );
};

export default ProductsPage;