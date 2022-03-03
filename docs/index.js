import { ethers } from "ethers";
require('dotenv').config()


const provider = new ethers.providers.Web3Provider(window.ethereum)

await provider.send("eth_requestAccounts", []);

const signer = provider.getSigner()

const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_URL);

await provider.getBlockNumber()