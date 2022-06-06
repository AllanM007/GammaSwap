require("dotenv").config();
const API_KEY = process.env.ALCHEMY_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const METAMASK_ADDRESS = process.env.ETH_DEV_ACCOUNT_ADDRESS
const CONTRACT_ADDRESS = process.env.GammaSwapTrade_ADDRESS;

const { json } = require("hardhat/internal/core/params/argumentTypes");
const { ethers } = require("ethers");
const contract = require("../artifacts/contracts/Trade.sol/TokenSwap.json");
const GammaTokenContractABI = require('../artifacts/contracts/Token.sol/GammaToken.json'); 

// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(network="ropsten", API_KEY);

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

console.log(signer.getGasPrice());

// Contract
const gammaSwapContract = new ethers.Contract("0xc8679C09296fCFa2C55aB129b6BD154937771dC0", contract.abi, signer);
const gammaTokenContract = new ethers.Contract(process.env.GammaToken_ADDRESS, GammaTokenContractABI.abi, signer );

async function main() {

    // Get Wallet Address Nonce
    const nonce = await alchemyProvider.getTransactionCount(METAMASK_ADDRESS, 'latest');

    try {        
        const message = await gammaSwapContract.buy("0x391E3567e8Da8018f592e1855A4459629c0E1d8A", 20, { gasLimit: 250000 });
        const reciept = await message.wait();
        console.log("The message is: " + reciept);
    } catch (error) {
        console.log(error);
    }

    // try {
    //     const getFunctions = gammaTokenContract.functions;
    //     console.log(getFunctions);
    // } catch (error) {
        
    // }
}
main();