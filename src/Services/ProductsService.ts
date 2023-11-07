import axios from "axios";

const url = "https://fakestoreapi.com/products";

export const ProductsService = async function() {
    const response = await axios.get(url);
    return response.data;
}