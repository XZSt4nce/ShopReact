import {useEffect, useState} from 'react';
import TodoService from "../../services/ProductsService";
import {Product} from "../Components/Product/Product";
import {Button} from "../Kit/Button/Button";
import "./ProductsPage.css";
import {Sidebar} from "../Components/Sidebar/Sidebar";

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [visibleProducts, setVisibleProducts] = useState([]);
    const [viewVisible, setViewVisible] = useState(true);

    const viewMoreProducts = function() {
        const additionalProducts = products.slice(visibleProducts.length, visibleProducts.length + 6);
        setVisibleProducts([...visibleProducts, ...additionalProducts]);
    }

    useEffect(() => {
        if (products.length === visibleProducts.length) {
            setViewVisible(false);
        } else {
            setViewVisible(true);
        }
    }, [visibleProducts]);

    useEffect(() => {
        (async () => {
            await TodoService.getPosts().then((data) => {
                setProducts(data);
                setVisibleProducts(data.slice(0, 9));
            });
        })()
    }, []);

    return (
        <div className={"wrapper"}>
            <header>
                <div id={"header-decoration"}>
                    {"Products"}
                </div>
            </header>
            <Sidebar leftPos={"0"}/>
            <div id={"products-container"} className={"container"}>
                {visibleProducts.map((el, idx) => (
                    <Product key={idx} product={el}></Product>
                ))}
                { viewVisible ? <Button id={"view"} text={"View more"} onClick={viewMoreProducts} type={"sec"}/> : "" }
            </div>
        </div>
    );
};

export default ProductsPage;