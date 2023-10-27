import {useEffect, useState} from 'react';
import {ProductsService} from "../../Services/ProductsService";
import "./ProductsPage.css";
import {Sidebar} from "../Components/Sidebar/Sidebar";
import {ProductsContainer} from "../Components/ProductsContainer/ProductsContainer";

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [visibleProducts, setVisibleProducts] = useState([]);
    const [cartProducts, setCartProducts] = useState([]);
    const [orderPrice, setOrderPrice] = useState(0);
    const cart = {
        products: cartProducts,
        setProducts: setCartProducts,
        orderPrice: orderPrice,
        setOrderPrice: setOrderPrice
    }
    const [viewVisible, setViewVisible] = useState(true);
    const [sidebarLeft, setSidebarLeft] = useState(-280);

    const viewMoreProducts = function() {
        const additionalProducts = products.slice(visibleProducts.length, visibleProducts.length + 6);
        setVisibleProducts([...visibleProducts, ...additionalProducts]);

        if (products.length === visibleProducts.length) {
            setViewVisible(false);
        } else {
            setViewVisible(true);
        }
    }

    useEffect(() => {
        (async () => {
            await ProductsService().then((data) => {
                data.forEach((el, idx) => {
                    el.cartCount = 0;
                    el.isInCart = false;
                    data[idx] = el;
                });
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
            <Sidebar orderPrice={orderPrice} sidebarLeft={sidebarLeft} setSidebarLeft={setSidebarLeft} cart={cart}/>
            <ProductsContainer products={visibleProducts} visibleButton={viewVisible} cart={cart} viewMore={viewMoreProducts}/>
        </div>
    );
};

export default ProductsPage;