import {Sidebar} from "../Kit/Sidebar";
import {SyntheticEvent, useContext, useEffect, useState} from "react";
import {StateContext} from "../../core/StateContext";
import {Button, Form} from "react-bootstrap";
import * as React from 'react';

export const Filter = () => {
    const [list, setList] =  useState(new Set<string>());
    const {products, setSelectedFilters, filterShow, setShowFilter} = useContext(StateContext);

    useEffect(() => {
        products.forEach(el => {
            setList(list.add(el.category));
        });
    }, [products]);

    const find = function(ev: SyntheticEvent) {
        ev.preventDefault();
        const checkboxInputElements = Array.from((ev.target as HTMLFormElement).elements);
        console.log(checkboxInputElements);
        if (ev.type === "reset") {
            checkboxInputElements.forEach(el => (el as HTMLInputElement).checked = false);
            setSelectedFilters([]);
        } else {
            // Adding selected categories titles to the filter
            setSelectedFilters(Array.from(list).filter((el, idx) => (checkboxInputElements[idx] as HTMLInputElement).checked));
        }
    };

    const container = (
        <Form onSubmit={find} onReset={find} className={"w-100 h-100 d-flex flex-column gap-3"}>
            <div className={""}>
                {Array.from(list).map((el, idx) => <Form.Check type={"checkbox"} key={idx} id={`category-${idx}`} label={el.toString()}  /> )}
            </div>
            <Button className={"mt-auto"} variant={"outline-secondary"} type={"reset"}>Reset</Button>
            <Button variant={"primary"} type={"submit"}>Find</Button>
        </Form>
    );

    return (
        <Sidebar title={"Filter"} container={container} show={filterShow} setShow={setShowFilter} placement={"start"} />
    );
};