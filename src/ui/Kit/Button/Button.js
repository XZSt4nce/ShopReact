import React from 'react';
import "./Button.css";

export const Button = ({ id, text, onClick, type }) => {
    return (
        <button id={id} onClick={onClick} className={type}>
            {text}
        </button>
    );
};