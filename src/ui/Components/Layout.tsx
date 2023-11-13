import * as React from 'react';
import {NavbarHeader} from "./NavbarHeader";
import {ReactNode} from "react";

export const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className={"d-flex flex-column w-100 h-100"}>
            <NavbarHeader/>
            {children}
        </div>
    );
};