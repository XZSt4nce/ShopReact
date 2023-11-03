import {Sidebar} from "../Kit/Sidebar";
import {useContext, useEffect, useState} from "react";
import {StateContext} from "../../core/StateContext";
import {Button, Form} from "react-bootstrap";

export const Filter = () => {
    const [list, setList] =  useState(new Set());
    const {products, setSelectedFilters, filterShow, setShowFilter} = useContext(StateContext);

    useEffect(() => {
        products.forEach(el => {
            setList(list.add(el.category));
        });
    }, [products]);

    const find = function(ev) {
        ev.preventDefault();
        if (ev.type === "reset") {
            Array.from(ev.target.elements).forEach(el => el.checked = false);
        } else {
            // Adding selected categories titles to the filter
            setSelectedFilters(Array.from(list).filter((el, idx) => ev.target.elements[idx].checked))
        }
    };

    const container = (
        <Form onSubmit={find} onReset={find} className={"w-100 h-100 d-flex flex-column gap-3"}>
            <div className={""}>
                {Array.from(list).map((el, idx) => <Form.Check type={"checkbox"} key={idx} label={el.toString()}  /> )}
            </div>
            <Button className={"mt-auto"} variant={"outline-secondary"} type={"reset"}>Reset</Button>
            <Button variant={"primary"} type={"submit"}>Find</Button>
        </Form>
    );

    return (
        <Sidebar title={"Filter"} container={container} show={filterShow} setShow={setShowFilter} />
    );
};