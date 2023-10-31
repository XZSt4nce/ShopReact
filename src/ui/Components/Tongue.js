import {useEffect, useRef} from "react";

export const Tongue = ({ w, h }) => {
    const canvas = useRef();

    useEffect(() => {
        if (canvas.current) {
            const ctx = canvas.current.getContext("2d");
            ctx.fillStyle = "royalblue";
            ctx.globalCompositeOperation = 'source-over';
            ctx.beginPath();
            ctx.roundRect(0, 10, w, h - 20, [w]);
            ctx.fill();
            ctx.fillRect(0, 10, w / 2, h - 20);
            ctx.fillRect(0, 0, 10, 10);
            ctx.fillRect(0, h - 10, 10, 10);
            ctx.closePath();
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(10, 0, 10, 0, 2*Math.PI);
            ctx.arc(10, h, 10, 0, 2*Math.PI);
            ctx.fill();
            ctx.closePath();
        }
    }, []);

    return (
        <canvas ref={canvas} width={w} height={h}></canvas>
    );
};