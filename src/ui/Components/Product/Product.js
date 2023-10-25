import "./Product.css";
import {Rating} from "../Rating/Rating";

export const Product = ({ product }) => {
    return (
        <div className="product">
            <img src={product.image} alt={""} className={"image"}></img>
            <Rating rate={product.rating.rate}/>
            <p>({product.rating.count})</p>
            <h1 className={"title text-wrapper"}>{product.title}</h1>
            <p className={"description text-wrapper"}>{product.description}</p>
            <p className={"price"}>{`${product.price}$`}</p>
        </div>
    );
};