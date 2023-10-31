import {Button} from "../Kit/Button/Button";

export const CartAmount = ({ count, onClick }) => {
    return (
        <div className={"cartAmount"}>
            <Button type={"sec cartAmount-button"} text={"–"} onClick={() => onClick(false)}/>
            <p className={"cartAmount-p"}>{`${count}pc.`}</p>
            <Button type={"sec cartAmount-button"} text={"+"} onClick={() => onClick(true)}/>
        </div>
    );
};