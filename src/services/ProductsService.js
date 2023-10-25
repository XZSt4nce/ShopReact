import axios from "axios";

class ProductsService {

    url = "https://fakestoreapi.com/products";

    async getPosts() {
        const response = await axios.get(this.url);
        return response.data;
    }
}

export default new ProductsService();