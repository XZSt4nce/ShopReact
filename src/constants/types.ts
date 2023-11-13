import BigNumber from "bignumber.js";
import {MatchPrimitiveType} from "web3";

type productBN = {
    title: string;
    price: BigNumber;
    description: string;
    category: string;
    image: string;
    rateValue: number;
    rateCount: BigNumber;
};

type productMPT = {
    title: string;
    price: MatchPrimitiveType<"uint256", unknown>;
    description: string;
    category: string;
    image: string;
    rateValue: MatchPrimitiveType<"uint8", unknown>;
    rateCount: MatchPrimitiveType<"uint256", unknown>;
};

export { productBN, productMPT };