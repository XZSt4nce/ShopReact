import "./Filter.css";
import Switch from "../Switch/Switch";
import {Button} from "../../Kit/Button/Button";

export const Filter = ({ filter, products, setProducts }) => {
    const find = function() {
        if (filter.list !== 0) {
            setProducts(filter.list);
            filter.setList([]);
        }
    }
    const renderCheckbox = function(el) {
        const notFound = filter.list.findIndex((fel) => el === fel) === -1;
        if (notFound) {
            filter.setList([...filter.list, el]);
            return (<input type={"checkbox"} name={"category"} value={`filter-${filter.list.length}`}/>);
        }
    }

    return (
        <aside style={{ left: `${filter.sidebarLeft}px` }}>
            <div id={"sidebar"}>
                <Switch sidebarLeft={filter.sidebarLeft} setSidebarLeft={filter.setSidebarLeft} tongueTop={200} count={filter.list.length} text={"≡"}/>
                <Button id={"hide"} text={"X"} type={"sec"} onClick={() => filter.setSidebarLeft(-280)}/>
                <h1 id={"filter-title"}>Filter</h1>
                <div id={"filter-container"}>
                    {products.map((el) => renderCheckbox(el))}
                </div>
                <Button text={"Find"} type={"pr"} onClick={find}/>
            </div>
        </aside>
    );
};