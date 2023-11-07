import * as React from 'react';

export const Price = ({ isCart, price, count }) => {

    if (isCart) {
        return (
            <div className={"text-end fw-bold"}>
                <p>{`${price}$ x ${count}pc.`}</p>
                <p>{`= ${Math.round(price * count * 100) / 100}$`}</p>
            </div>
        );
    } else {
        return (
            <p className={"text-end fw-bold"}>{`${price}$`}</p>
        );
    }
};