import ProductsPage from "../ui/Pages/ProductsPage";
import {JSX} from "react";
import CartPage from "../ui/Pages/CartPage";

type route = {
    path: string;
    page: () => JSX.Element;
}

export const Routes: route[] = [
    {
        path: "/",
        page: ProductsPage
    },
    {
        path: "/cart",
        page: CartPage
    }
];