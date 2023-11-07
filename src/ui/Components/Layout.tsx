import * as React from 'react';
import {NavbarHeader} from "./NavbarHeader";
import {ReactNode} from "react";

export const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <NavbarHeader/>
            {children}
        </>
    );
};