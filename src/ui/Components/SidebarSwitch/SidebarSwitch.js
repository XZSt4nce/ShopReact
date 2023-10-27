import "./SidebarSwitch.css";
import {useEffect, useRef} from "react";
import {Button} from "../../Kit/Button/Button";

const SidebarSwitch = ({ sidebarLeft, setSidebarLeft, cartLength }) => {
    const canvas = useRef();

    const onClick = function() {
        if (sidebarLeft === 0) {
            setSidebarLeft(-280);
        } else if (sidebarLeft === -280) {
            setSidebarLeft(0);
        }
    }

    useEffect(() => {
        if (canvas.current) {
            const ctx = canvas.current.getContext("2d");
            ctx.fillStyle = "royalblue";
            ctx.globalCompositeOperation = 'source-over';
            ctx.beginPath();
            ctx.roundRect(0, 10, 50, 50, [50]);
            ctx.fill();
            ctx.fillRect(0, 10, 25, 50);
            ctx.fillRect(0, 0, 10, 10);
            ctx.fillRect(0, 60, 10, 10);
            ctx.closePath();
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(10, 0, 10, 0, 2*Math.PI);
            ctx.arc(10, 70, 10, 0, 2*Math.PI);
            ctx.fill();
            ctx.closePath();
        }
    }, []);

    return (
        <div id={"sidebar-switch"}>
            <div id={"sidebar-box"}>
                <canvas ref={canvas} width={"50"} height={"70"}></canvas>
                <Button id={"cart"} onClick={onClick} type={"pr"} text={"≡"}/>
                {cartLength > 0 ? <p id={"cart-length"}>{cartLength}</p> : ""}
            </div>
        </div>
    );
};

export default SidebarSwitch;