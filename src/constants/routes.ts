import ProductsPage from "../ui/Pages/ProductsPage";
import {JSX} from "react";
import CartPage from "../ui/Pages/CartPage";
import LoginPage from "../ui/Pages/LoginPage";
import RegisterPage from "../ui/Pages/RegisterPage";
import MyProductsPage from "../ui/Pages/MyProductsPage";

type route = {
    path: string;
    page: () => JSX.Element;
}

export const Routes: route[] = [
    {
        path: "/",
        page: LoginPage
    },
    {
        path: "/register",
        page: RegisterPage
    },
    {
        path: "/products",
        page: ProductsPage
    },
    {
        path: "/cart",
        page: CartPage
    },
    {
        path: "/myProducts",
        page: MyProductsPage
    }
];