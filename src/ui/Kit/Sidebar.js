import Switch from "../Components/Switch";
import {CloseButton} from "react-bootstrap";

export const Sidebar = ({sidebarLeft, setSidebarLeft, tongueTop, tongueSymbol, count, title, container}) => {
    return (
        <aside style={{ left: `${sidebarLeft}px`}}>
            <div>
                <Switch sidebarLeft={sidebarLeft} setSidebarLeft={setSidebarLeft} tongueTop={tongueTop} count={count} text={tongueSymbol}/>
                <CloseButton aria-label={"Hide"} />
                <h1 className={"title"}>{title}</h1>
                {container}
            </div>
        </aside>
    );
};