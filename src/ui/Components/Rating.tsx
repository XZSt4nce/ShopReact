import * as React from 'react';

export const Rating = ({ rate }) => {
    const maskSize = rate / 5 * 100 + '%';
    return (
        <div className={"w-100 d-flex justify-content-center position-relative user-select-none pe-none"} style={{height: "30px"}}>
            <p className={"rating-stars"} style={{textShadow: "0 0 10px #00000066"}}>★★★★★</p>
            <p className={"rating-stars mask"} style={{color: "gold", maskSize: maskSize, WebkitMaskSize: maskSize}}>★★★★★</p>
        </div>
    );
};