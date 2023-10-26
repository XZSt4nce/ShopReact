import "./cartAmount.css";

export const CartAmount = ({ count, onClick }) => {
    return (
        <div className={"cartAmount"}>
            <button onClick={() => onClick(1, false)}>-</button>
            <p>{count}</p>
            <button onClick={() => onClick(1, true)}>+</button>
        </div>
    );
};