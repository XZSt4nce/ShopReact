import {Address, Bytes} from "web3/lib/types";
import {web3} from "./Web3Service";
import {ICartProduct, IProduct} from "../constants/interfaces";
import {productBN, productMPT} from "../constants/types";
import BigNumber from "bignumber.js";
import {Dispatch, SetStateAction} from "react";

const contractAddress: Address = "0xEDc14C6B15C23dbad117C9264E7e2D5eB70d4D3C";
const abi = [{"inputs":[{"components":[{"internalType":"string","name":"title","type":"string"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"string","name":"description","type":"string"},{"internalType":"string","name":"category","type":"string"},{"internalType":"string","name":"image","type":"string"},{"internalType":"uint8","name":"rateValue","type":"uint8"},{"internalType":"uint256","name":"rateCount","type":"uint256"}],"internalType":"struct IShop.Product[]","name":"initProducts","type":"tuple[]"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"components":[{"internalType":"string","name":"title","type":"string"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"string","name":"description","type":"string"},{"internalType":"string","name":"category","type":"string"},{"internalType":"string","name":"image","type":"string"},{"internalType":"uint8","name":"rateValue","type":"uint8"},{"internalType":"uint256","name":"rateCount","type":"uint256"}],"internalType":"struct IShop.Product[]","name":"newProducts","type":"tuple[]"}],"name":"addProducts","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"components":[{"internalType":"string","name":"title","type":"string"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"string","name":"description","type":"string"},{"internalType":"string","name":"category","type":"string"},{"internalType":"string","name":"image","type":"string"},{"internalType":"uint8","name":"rateValue","type":"uint8"},{"internalType":"uint256","name":"rateCount","type":"uint256"}],"internalType":"struct IShop.Product","name":"product","type":"tuple"},{"internalType":"uint256","name":"count","type":"uint256"}],"internalType":"struct IShop.CartProduct[]","name":"cartProducts","type":"tuple[]"}],"name":"buyProducts","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getOwnProducts","outputs":[{"components":[{"components":[{"internalType":"string","name":"title","type":"string"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"string","name":"description","type":"string"},{"internalType":"string","name":"category","type":"string"},{"internalType":"string","name":"image","type":"string"},{"internalType":"uint8","name":"rateValue","type":"uint8"},{"internalType":"uint256","name":"rateCount","type":"uint256"}],"internalType":"struct IShop.Product","name":"product","type":"tuple"},{"internalType":"uint256","name":"count","type":"uint256"}],"internalType":"struct IShop.CartProduct[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getProducts","outputs":[{"components":[{"internalType":"string","name":"title","type":"string"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"string","name":"description","type":"string"},{"internalType":"string","name":"category","type":"string"},{"internalType":"string","name":"image","type":"string"},{"internalType":"uint8","name":"rateValue","type":"uint8"},{"internalType":"uint256","name":"rateCount","type":"uint256"}],"internalType":"struct IShop.Product[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"login","type":"string"},{"internalType":"string","name":"password","type":"string"}],"name":"signIn","outputs":[{"internalType":"address","name":"wallet","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"login","type":"string"},{"internalType":"string","name":"password","type":"string"}],"name":"signUp","outputs":[],"stateMutability":"nonpayable","type":"function"}] as const;
const contract = new web3.eth.Contract(abi, contractAddress);

export const buyProducts = async (cart: ICartProduct[], privateKey: string, orderPrice: BigNumber) => {
    const encodedTx: Bytes = contract.methods.buyProducts(cart).encodeABI();
    const txObject = {
        data: encodedTx,
        from: web3.eth.accounts[1],
        to: contractAddress,
        value: orderPrice.toString(),
        nonce: await web3.eth.getTransactionCount(contractAddress, 'latest'),
        gas: 30_000,
        gasPrice: await web3.eth.getGasPrice(),
        gasLimit: 3_000_000
    };

    await web3.eth.accounts.signTransaction(txObject, privateKey)
        .then(result => {
            web3.eth.sendSignedTransaction(result.rawTransaction)
                .on('receipt', (receipt) => {
                    console.log(receipt);
                })
                .on('error', (error => {
                    console.log(error.toJSON());
                }))
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err)
        });
}

export const logIn = async (login: string, password: string) => {
    return await contract.methods.signIn(login, password).call();
}

export const register = async (login: string, password: string) => {
    const wallet = await web3.eth.personal.newAccount(password);
    await web3.eth.personal.unlockAccount(wallet, password, 0)
        .then(() => contract.methods.signUp(login, password).send({from: wallet}));
    return wallet;
}

export const getProds = async (setProducts: Dispatch<SetStateAction<IProduct[]>>) => {
    await contract.methods.getProducts().call().then((data) => {
        const products:  IProduct[] = [];
        data.forEach((el: productMPT) => {
            const product: productBN = {
                title: el.title,
                price: BigNumber(el.price.toString()),
                description: el.description,
                category: el.category,
                image: el.image,
                rateValue: Number(el.rateValue),
                rateCount: BigNumber(el.rateCount.toString())
            };

            products.push({
                product: product,
                count: BigNumber(0),
                isInCart: false
            });
        });
        setProducts(products);
    });
}