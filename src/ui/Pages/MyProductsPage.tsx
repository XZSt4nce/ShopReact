import React, {useContext, useEffect, useState} from 'react';
import {ProductsContainer} from "../Components/ProductsContainer";
import {StateContext} from "../../core/StateContext";

const MyProductsPage = () => {
    const [products, setProducts] = useState([]);
    const { getMyProducts } = useContext(StateContext);

    useEffect(() => {
        (async () => {
            await getMyProducts()
                .then((myProducts) => {
                    setProducts(myProducts);
                });
        })();
    }, []);

    return (
        <div className={"d-flex flex-column flex-grow-1"}>
            <ProductsContainer products={products} />
        </div>
    );
};

export default MyProductsPage;