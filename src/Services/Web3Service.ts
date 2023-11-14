import { Web3 } from "web3";
import BigNumber from "bignumber.js";

const protocol = "http:/";
const address = "localhost";
const port = "8545";
const provider = Web3.providers.HttpProvider;

export const web3 = new Web3(new provider(`${protocol}/${address}:${port}`));

export const getBal = async (wallet: string) => {
    return await web3.eth.getBalance(wallet);
}

export const toEther = (wei: BigNumber) => {
    return BigNumber(web3.utils.fromWei(wei.toString(), 'ether'));
}