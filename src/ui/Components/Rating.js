export const Rating = ({ rate }) => {
    const maskSize = rate / 5 * 100 + '%';
    return (
        <div className={"rating"}>
            <p className={"rating-stars"} style={{textShadow: "0 0 10px #00000066"}}>★★★★★</p>
            <p className={"rating-stars rating-mask"} style={{maskSize: maskSize, WebkitMaskSize: maskSize}}>★★★★★</p>
        </div>
    );
};