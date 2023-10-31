import React from 'react';
import "./Checkbox.css";

export const Checkbox = ({ el, idx }) => {
    return (
        <div>
            <input type={"checkbox"} name={`category-${idx}`} id={`category-${idx}`}/>
            <label htmlFor={`category-${idx}`} className={"category"}>{el}</label>
        </div>
    );
};