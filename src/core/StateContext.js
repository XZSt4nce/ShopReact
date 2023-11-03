import {createContext, useState} from 'react';
import {ProductsService} from "../Services/ProductsService";

export const StateContext = createContext({})

export const ContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [cartProducts, setCartProducts] = useState([]);
    const [orderPrice, setOrderPrice] = useState(0);
    const [text, setText] = useState("");
    const [type, setType] =  useState("");
    const [hidden, setHidden] =  useState(true);
    const [selected, setSelected] = useState([]);
    const [cartShow, setCartShow] = useState(false);
    const [filterShow, setFilterShow] = useState(false);

    const getProducts = async () => {
        await ProductsService().then((data) => {
            if (selected.length > 0) {
                data = data.filter(el => selected.includes(el.category));
            }
            data.forEach((el) => {
                el.cartCount = 0;
                el.isInCart = false;
            });
            setProducts(data);
        });
    }

    const setListProducts = (products) => {
        setProducts(products);
    };

    const setCart = (products) => {
        setCartProducts(products);
    };

    const setCartPrice = (price) => {
        setOrderPrice(price);
    };

    const setMsgText = (text) => {
        setText(text);
    }

    const setMsgType = (type) => {
        setType(type);
    }

    const setMsgHidden = (isHidden) => {
        setHidden(isHidden);
    }

    const setSelectedFilters = (filters) => {
        setSelected(filters);
    }

    const setShowCart = (isShow) => {
        setCartShow(isShow);
    }

    const setShowFilter = (isShow) => {
        setFilterShow(isShow);
    }

    const values = {
        products: products,
        getProducts: getProducts,
        setListProducts: setListProducts,
        cartProducts: cartProducts,
        setCart: setCart,
        orderPrice: orderPrice,
        setCartPrice: setCartPrice,
        msgText: text,
        setMsgText: setMsgText,
        msgType: type,
        setMsgType: setMsgType,
        msgHidden: hidden,
        setMsgHidden: setMsgHidden,
        selected: selected,
        setSelectedFilters: setSelectedFilters,
        cartShow: cartShow,
        setShowCart: setShowCart,
        filterShow: filterShow,
        setShowFilter: setShowFilter
    }

    return (
        <StateContext.Provider value={values}>
            {children}
        </StateContext.Provider>
    )

}