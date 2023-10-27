import "./CartAmount.css";

export const CartAmount = ({ count, onClick }) => {
    return (
        <div className={"cartAmount"}>
            <button className={"cartAmount-button"} onClick={() => onClick(false)}>-</button>
            <p className={"cartAmount-p"}>{`${count}pc.`}</p>
            <button className={"cartAmount-button"} onClick={() => onClick(true)}>+</button>
        </div>
    );
};