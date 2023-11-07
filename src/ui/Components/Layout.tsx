import * as React from 'react';
import {NavbarHeader} from "./NavbarHeader";

export const Layout = ({ children }) => {
    return (
        <>
            <NavbarHeader/>
            {children}
        </>
    );
};