import "./Switch.css";
import {Button} from "../../Kit/Button/Button";
import {Tongue} from "../Tongue/Tongue";

const Switch = ({ sidebarLeft, setSidebarLeft, tongueTop, text, count }) => {
    const onClick = function() {
        if (sidebarLeft === 0) {
            setSidebarLeft(-280);
        } else if (sidebarLeft === -280) {
            setSidebarLeft(0);
        }
    }

    return (
        <div id={"switch-container"} style={{ top: `${tongueTop}px` }}>
            <div id={"switch-box"}>
                <Tongue w={"50"} h={"70"}/>
                <Button id={"switch"} onClick={onClick} type={"sec"} text={text}/>
                {count > 0 ? <p id={"switch-count"}>{count}</p> : ""}
            </div>
        </div>
    );
};

export default Switch;