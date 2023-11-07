import * as React from 'react';

export const CartAmount = ({ count, onClick }) => {
    return (
        <div className={"d-flex flex-row align-items-center fw-bold"}>
            <button className={"btn btn-outline-secondary rounded-circle"} style={{width: "40px", height: "40px"}} onClick={() => onClick(false)}>–</button>
            <p className={"text-center flex-grow-1 m-0"}>{`${count}pc.`}</p>
            <button className={"btn btn-outline-secondary rounded-circle"} style={{width: "40px", height: "40px"}} onClick={() => onClick(true)}>+</button>
        </div>
    );
};