import { IProduct } from "../constants/interfaces";
import { Dispatch, SetStateAction } from "react";
import abi from "./abi.json";
import BN from "bn.js";
import Web3 from "web3";

class ProductsService {
    private web3 = new Web3(`http://localhost:8545`);
    private contractAddress = "0xCd41212C3661511A468e1a396c14252EE0095191";
    private contract = new this.web3.eth.Contract(abi as any, this.contractAddress);

    public toEther = (wei: BN) => {
        return this.web3.utils.fromWei(wei.toString(), 'ether');
    }

    public buyProducts = async (cart: IProduct[], sender: string, orderPrice: BN) => {

        await this.contract.methods.buyProducts(cart).send({from: sender, value: orderPrice});
    }

    public estimateBuyProductsGas = async (cart: IProduct[], sender: string) => {
        return await this.contract.methods.buyProducts(cart).estimateGas({from: sender});
    }

    public logIn = async (login: string, password: string): Promise<string> => {
        return await this.contract.methods.signIn(login, password).call();
    }

    public register = async (address: string, login: string, password: string) => {
        await this.contract.methods.signUp(login, password).send({from: address});
    }

    public getProds = async (setProducts: Dispatch<SetStateAction<IProduct[]>>): Promise<IProduct[]> => {
        return await this.contract.methods.getProducts().call()
            .then((data) => {
                const products:  IProduct[] = [];
                data.forEach((el) => {
                    const product: IProduct = {
                        title: el.title,
                        price: this.web3.utils.toBN(el.price.toString()),
                        description: el.description,
                        category: el.category,
                        image: el.image,
                        rateValue: Number(el.rateValue),
                        rateCount: this.web3.utils.toBN(el.rateCount.toString()),
                        count: this.web3.utils.toBN(0),
                        isInCart: false
                    };

                    products.push(product);
                });
                setProducts(products);
            });
    }

    public getBalance = async (wallet: string): Promise<string> => {
        return await this.contract.methods.getBalance().call({from: wallet});
    }
}

export default new ProductsService();