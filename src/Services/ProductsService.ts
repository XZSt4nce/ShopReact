import { IProduct } from "../constants/interfaces";
import abi from "./abi.json";
import BN from "bn.js";
import Web3 from "web3";

class ProductsService {
    public web3 = new Web3(`http://localhost:8545`);
    private contractAddress = "0xEDc14C6B15C23dbad117C9264E7e2D5eB70d4D3C";
    private contract = new this.web3.eth.Contract(abi as any, this.contractAddress);

    public toEther = (wei: BN) => {
        return this.web3.utils.fromWei(wei.toString(), 'ether');
    }

    public buyProducts = async (cart: IProduct[], sender: string, orderPrice: BN) => {
        await this.contract.methods.buyProducts(cart).send({from: sender, value: orderPrice});
    }

    public logIn = async (login: string, password: string): Promise<string> => {
        return await this.contract.methods.signIn(login, password).call();
    }

    public register = async (address: string, login: string, password: string) => {
        await this.contract.methods.signUp(login, password).send({from: address});
    }

    public getProducts = async (): Promise<IProduct[]> => {
        return await this.contract.methods.getProducts().call();
    }

    public getMyProducts = async (sender: string) => {
        return await this.contract.methods.getOwnProducts().call({from: sender});
    }

    public getBalance = async (wallet: string): Promise<string> => {
        return await this.contract.methods.getBalance().call({from: wallet});
    }
}

export default new ProductsService();