import {Tongue} from "./Tongue";
import {Button} from "react-bootstrap";

const Switch = ({ sidebarLeft, setSidebarLeft, tongueTop, text, count }) => {
    const onClick = function() {
        if (sidebarLeft === 0) {
            setSidebarLeft(-280);
        } else if (sidebarLeft === -280) {
            setSidebarLeft(0);
        }
    }

    return (
        <div style={{ top: `${tongueTop}px`}}>
            <div>
                <Tongue w={"50"} h={"70"}/>
                <Button id={"switch"} onClick={onClick} variant={"secondary"}>{text}</Button>
                {count > 0 ? <p>{count}</p> : ""}
            </div>
        </div>
    );
};

export default Switch;