require("dotenv").config();
const API_KEY = process.env.ALCHEMY_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.GammaSwapTrade_ADDRESS;

const { json } = require("hardhat/internal/core/params/argumentTypes");
const { ethers } = require("ethers");
const contract = require("../artifacts/contracts/Trade.sol/TokenSwap.json");

// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(network="ropsten", API_KEY);

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

console.log(signer.getGasPrice());

// Contract
const gammaSwapContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

async function main() {

    try {
        const message = await gammaSwapContract.buy("0x391E3567e8Da8018f592e1855A4459629c0E1d8A", 20, { gasLimit: 250000 });
        console.log("The message is: " + message);
    } catch (error) {
        console.log(error);
    }
}
main();