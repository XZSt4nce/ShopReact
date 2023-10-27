import {useEffect, useState} from 'react';
import {ProductsService} from "../../Services/ProductsService";
import "./ProductsPage.css";
import {Cart} from "../Components/Cart/Cart";
import {ProductsContainer} from "../Components/ProductsContainer/ProductsContainer";
import {Message} from "../Kit/Message/Message";
import {Filter} from "../Components/Filter/Filter";

const SetCart = function() {
    const [products, setProducts] = useState([]);
    const [orderPrice, setOrderPrice] = useState(0);
    const [sidebarLeft, setSidebarLeft] = useState(-280);
    return {products, setProducts, orderPrice, setOrderPrice, sidebarLeft, setSidebarLeft};
}

const SetFilter = function() {
    const [list, setList] =  useState([]);
    const [sidebarLeft, setSidebarLeft] = useState(-280);
    return {list, setList, sidebarLeft, setSidebarLeft};
}

const SetMsg = function() {
    const [text, setText] = useState("");
    const [type, setType] =  useState("");
    const [hidden, setHidden] =  useState(true);
    return {text, setText, type, setType, hidden, setHidden};
}

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [visibleProducts, setVisibleProducts] = useState([]);
    const [viewVisible, setViewVisible] = useState(false);
    const cart = SetCart();
    const filter = SetFilter();
    const msg = SetMsg();

    const order = function() {
        if (cart.products.length === 0) {
            msg.setType("error");
            msg.setText("Cart is empty!");
        } else {
            msg.setType("success");
            msg.setText("Thanks for order!");
            console.log(cart);
        }
        msg.setHidden(false);

        setTimeout(() => msg.setHidden(true), 2000);
    }

    const viewMoreProducts = function() {
        const additionalProducts = products.slice(visibleProducts.length, visibleProducts.length + 6);
        setVisibleProducts([...visibleProducts, ...additionalProducts]);
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
            });
        })()
    }, []);

    useEffect(() => {
        setVisibleProducts(products.slice(0, 9));
        setViewVisible(visibleProducts.length < products.length);
    }, [products]);

    useEffect(() => {
        if (products.length === visibleProducts.length) {
            setViewVisible(false);
        } else {
            setViewVisible(true);
        }
    }, [visibleProducts]);

    return (
        <div className={"wrapper"}>
            <header>
                <div id={"header-decoration"}>
                    {"Products"}
                </div>
            </header>
            <Message msg={msg}/>
            <Cart cart={cart} order={order}/>
            <Filter products={products} setProducts={setProducts} filter={filter}/>
            <ProductsContainer products={visibleProducts} visibleButton={viewVisible} cart={cart} viewMore={viewMoreProducts}/>
        </div>
    );
};

export default ProductsPage;