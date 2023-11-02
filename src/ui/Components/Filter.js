import {Sidebar} from "../Kit/Sidebar";
import {useContext, useEffect, useState} from "react";
import {StateContext} from "../../core/StateContext";
import {Checkbox} from "../Kit/Checkbox";

export const Filter = () => {
    const [list, setList] =  useState(new Set());
    const [sidebarLeft, setSidebarLeft] = useState(-280);
    const {products, selected, setSelectedFilters} = useContext(StateContext);

    useEffect(() => {
        products.forEach(el => {
            setList(list.add(el.category));
        });
    }, [products]);

    const find = function(ev) {
        ev.preventDefault();
        const elements = ev.target.elements;
        setSelectedFilters(Array.from(list).filter((el, idx) => elements[idx].checked))
        console.log(selected);
    };

    const container = (
        <form onSubmit={find}>
            <div className={"list"}>
                {Array.from(list).map((el, idx) => <Checkbox key={idx} el={el} idx={idx}/>)}
            </div>
            <input className={"btn btn-secondary"} value={"Reset"} type={"reset"}/>
            <input className={"btn btn-primary"} value={"Find"} type={"submit"}/>
        </form>
    );

    return (
        <Sidebar
            sidebarLeft={sidebarLeft}
            setSidebarLeft={setSidebarLeft}
            count={selected.size}
            title={"Filter"}
            tongueTop={200}
            tongueSymbol={"🔎"}
            container={container}
        />
    );
};