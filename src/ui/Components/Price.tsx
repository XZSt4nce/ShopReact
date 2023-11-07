import * as React from 'react';

export const Price = ({ isCart, price, count }: {isCart: boolean,  price: number, count: number}) => {

    if (isCart) {
        return (
            <div className={"text-end fw-bold"}>
                <p className={"m-0"}>{`${price}$ x ${count}pc.`}</p>
                <p className={"mb-2"}>{`= ${Math.round(price * count * 100) / 100}$`}</p>
            </div>
        );
    } else {
        return (
            <p className={"text-end fw-bold mb-2"}>{`${price}$`}</p>
        );
    }
};