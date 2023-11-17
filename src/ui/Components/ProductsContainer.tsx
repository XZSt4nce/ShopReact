import {Product} from "./Product";
import {useContext, useEffect, useState} from "react";
import {StateContext} from "../../core/StateContext";
import {Button, Spinner} from "react-bootstrap";
import {IProduct} from "../../constants/interfaces";
import * as React from 'react';

export const ProductsContainer = ({ visibleProducts, onClick }: {visibleProducts: IProduct[], onClick: () => void}) => {
    const [viewVisible, setViewVisible] = useState(false);
    const {products} = useContext(StateContext);

    useEffect(() => {
        setViewVisible(visibleProducts.length < products.length);
    }, [visibleProducts, products]);

    return (
        <div className={"w-100 table-1 table-lg-2 table-xl-3 overflow-auto p-4"}>
            {visibleProducts.map((el, idx) => (
                <Product key={idx} product={el} />
            ))}
            {products.length === 0 ? <Spinner animation={"border"} variant={"light"} className={"m-auto stretch-column"} /> : ""}
            { viewVisible ? <Button className={"w-100 mt-3 stretch-column"} onClick={onClick} variant={"outline-secondary"}>View more</Button> : "" }
        </div>
    );
};