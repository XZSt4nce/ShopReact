export const Price = ({ isCart, price, count }) => {

    if (isCart) {
        return (
            <div className={"text-right fw-bold"}>
                <p>{`${price}$ x ${count}pc.`}</p>
                <p>{`= ${Math.round(price * count * 100) / 100}$`}</p>
            </div>
        );
    } else {
        return (
            <p className={"text-right fw-bold"}>{`${price}$`}</p>
        );
    }
};