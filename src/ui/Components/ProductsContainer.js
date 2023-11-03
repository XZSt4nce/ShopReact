import {Product} from "./Product";
import {useContext, useEffect, useState} from "react";
import {StateContext} from "../../core/StateContext";
import {Button, Spinner} from "react-bootstrap";

export const ProductsContainer = () => {
    const [visibleProducts, setVisibleProducts] = useState([]);
    const [viewVisible, setViewVisible] = useState(false);
    const {products} = useContext(StateContext);

    const viewMoreProducts = function() {
        const additionalProducts = products.slice(visibleProducts.length, visibleProducts.length + 9);
        setVisibleProducts([...visibleProducts, ...additionalProducts]);
    }

    useEffect(() => {
        setVisibleProducts(products.slice(0, 9));
    }, [products]);

    useEffect(() => {
        setViewVisible(visibleProducts.length < products.length);
    }, [visibleProducts, products]);

    return (
        <div className={"w-100 flex-grow-1 table-1 table-lg-2 table-xl-3 overflow-auto p-4"}>
            {visibleProducts.map((el, idx) => (
                <Product key={idx} product={el}></Product>
            ))}
            {products.length === 0 ? <Spinner animation={"border"} variant={"light"} className={"m-auto stretch-column"} /> : ""}
            { viewVisible ? <Button className={"w-100 mt-3 stretch-column"} onClick={viewMoreProducts} variant={"outline-secondary"}>View more</Button> : "" }
        </div>
    );
};