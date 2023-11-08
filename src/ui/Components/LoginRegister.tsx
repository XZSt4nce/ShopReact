import * as React from 'react';
import {useContext} from "react";
import {StateContext} from "../../core/StateContext";

export const LoginRegister = () => {
    const { signIn, signUp }  = useContext(StateContext);

    return (
        <div className={"modal show"}>

        </div>
    );
};