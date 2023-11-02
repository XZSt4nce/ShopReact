import "./ProductsContainer.css";
import {Product} from "./Product";
import {useContext, useEffect, useState} from "react";
import {StateContext} from "../../core/StateContext";
import {Button} from "react-bootstrap";

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
    }, [visibleProducts]);

    return (
        <div id={"products-container"} className={"w-100 d-grid"}>
            {visibleProducts.map((el, idx) => (
                <Product key={idx} product={el}></Product>
            ))}
            { viewVisible ? <Button id={"view"}  onClick={viewMoreProducts} variant={"secondary"}>View more</Button> : "" }
        </div>
    );
};