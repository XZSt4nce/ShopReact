import "./Sidebar.css";
import Switch from "../../Components/Switch";
import {Button} from "../Button/Button";

export const Sidebar = ({sidebarLeft, setSidebarLeft, tongueTop, tongueSymbol, count, title, container}) => {
    return (
        <aside style={{ left: `${sidebarLeft}px`}}>
            <div className={"sidebar"}>
                <Switch sidebarLeft={sidebarLeft} setSidebarLeft={setSidebarLeft} tongueTop={tongueTop} count={count} text={tongueSymbol}/>
                <Button id={"hide"} text={"X"} type={"sec"} onClick={() => setSidebarLeft(-280)}/>
                <h1 className={"title"}>{title}</h1>
                {container}
            </div>
        </aside>
    );
};