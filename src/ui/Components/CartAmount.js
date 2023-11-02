export const CartAmount = ({ count, onClick }) => {
    return (
        <div className={"d-flex"}>
            <button className={"btn btn-primary rounded-circle"} style={{width: "40px", height: "40px"}} onClick={() => onClick(false)}>–</button>
            <p className={"text-center justify-content-center flex-grow-1 m-0"}>{`${count}pc.`}</p>
            <button className={"btn btn-primary rounded-circle"} style={{width: "40px", height: "40px"}} onClick={() => onClick(true)}>+</button>
        </div>
    );
};