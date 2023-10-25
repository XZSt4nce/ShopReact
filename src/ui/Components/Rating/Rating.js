import "./Rating.css";

export const Rating = ({ rate }) => {
    const maskSize = rate / 5 * 100 + '%';
    return (
        <div className={"rating"}>
            <p className={"rating-stars"}>★★★★★</p>
            <p className={"rating-stars rating-mask"} style={{maskSize: maskSize, WebkitMaskSize: maskSize}}>★★★★★</p>
        </div>
    );
};