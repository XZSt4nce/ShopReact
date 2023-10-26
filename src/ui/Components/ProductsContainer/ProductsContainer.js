import "./ProductsContainer.css";
import {Product} from "../Product/Product";
import {Button} from "../../Kit/Button/Button";

export const ProductsContainer = ({ products, visibleButton, cart, viewMore }) => {
    return (
        <div id={"products-container"} className={"container"}>
            {products.map((el, idx) => (
                <Product key={idx} product={el} cart={cart} isCart={false}></Product>
            ))}
            { visibleButton ? <Button id={"view"} text={"View more"} onClick={viewMore} type={"sec"}/> : "" }
        </div>
    );
};