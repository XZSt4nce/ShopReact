export const Price = ({ isCart, product }) => {
    if (isCart) {
        return (
            <div className={"price"}>
                <p>{`${product.price}$ x ${product.cartCount}pc.`}</p>
                <p>{`= ${Math.round(product.price * product.cartCount * 100) / 100}$`}</p>
            </div>
        );
    } else {
        return (
            <p className={"price"}>{`${product.price}$`}</p>
        );
    }
};