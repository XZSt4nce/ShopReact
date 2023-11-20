import {Product} from "./Product";
import {useEffect, useState} from "react";
import {Button, Spinner} from "react-bootstrap";
import {IProduct} from "../../constants/interfaces";
import * as React from 'react';

export const ProductsContainer = ({ products }: {products: IProduct[]}) => {
    const [visibleProducts, setVisibleProducts] = useState<IProduct[]>([]);
    const [viewVisible, setViewVisible] = useState(false);
    const [loading, setLoading] = useState(true);

    const viewMoreProducts = () => {
        const additionalProducts = products.slice(visibleProducts.length, visibleProducts.length + 6);
        setVisibleProducts([...visibleProducts, ...additionalProducts]);
    }

    useEffect(() => {
        setLoading(true);
        setVisibleProducts(products.slice(0, 6));
        setLoading(false);
    }, [products]);

    useEffect(() => {
        setViewVisible(visibleProducts.length < products.length);
    }, [visibleProducts, products]);

    return (
        <div className={"w-100 table-1 table-lg-2 table-xl-3 overflow-auto p-4"}>
            {visibleProducts.map((el, idx) => (
                <Product key={idx} product={el} />
            ))}
            { loading ? <Spinner animation={"border"} variant={"light"} className={"m-auto stretch-column"} /> : ""}
            { viewVisible ? <Button className={"w-100 mt-3 stretch-column"} onClick={viewMoreProducts} variant={"outline-secondary"}>View more</Button> : "" }
        </div>
    );
};