import { Web3 } from "web3";

const protocol = "http:/";
const address = "localhost";
const port = "8545";
const provider = Web3.providers.HttpProvider;


export const Web3Service = () => {
    const web3: Web3 = new Web3(new provider(`${protocol}/${address}:${port}`));
    return web3;
}