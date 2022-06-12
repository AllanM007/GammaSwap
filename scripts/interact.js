require("dotenv").config();
const API_KEY = process.env.ALCHEMY_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const METAMASK_ADDRESS = process.env.ETH_DEV_ACCOUNT_ADDRESS
const CONTRACT_ADDRESS = process.env.GammaSwapTrade_ADDRESS;

const { json } = require("hardhat/internal/core/params/argumentTypes");
const { ethers} = require("ethers");
const contract = require("../artifacts/contracts/Trade.sol/TokenSwap.json");
const GammaTokenContractABI = require('../artifacts/contracts/Token.sol/GammaToken.json'); 

// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(network="ropsten", API_KEY);

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

console.log(signer.getGasPrice());

// Contract
const gammaSwapContract = new ethers.Contract("0x51a9092F31FBF5D9351a111FB252ec944611Ce9B", contract.abi, signer);
const gammaTokenContract = new ethers.Contract(process.env.GammaToken_ADDRESS, GammaTokenContractABI.abi, signer );

async function main() {
    
    // const signedTransaction = signer.signTransaction(tx, METAMASK_PRIVATE_KEY)

    const recipientAddr = '0x391E3567e8Da8018f592e1855A4459629c0E1d8A';
    
    const buyNum = 100000;
    const fmtInt = ethers.utils.parseUnits(buyNum.toString(), 18);

    try {        
        const message = await gammaSwapContract.buy( fmtInt, { gasLimit: 250000 });
        await message.wait();

        //contract.coins(1).then(res => console.log(res)).catch(err=> console.log("error", err));
        console.log(`The message is: ${message.toString()}`);

        // Get Wallet Address Nonce
        // const nonce = await alchemyProvider.getTransactionCount(METAMASK_ADDRESS, 'latest');
        
        // const tx = {
        //     'to': "0x391E3567e8Da8018f592e1855A4459629c0E1d8A",
        //     'nonce': nonce,
        //     'gasLimit': 500000,
        //     value: ethers.utils.parseEther('0.0000000001'),
        // }

        // const createReciept = await signer.sendTransaction(tx);
        // await createReciept.wait();
        // console.log(`The transaction hash is ${createReciept.hash}`);
    } catch (error) {
        console.log(error);
    }

    // try {
    //     const transferGamma = gammaTokenContract.functions.transfer('0x391E3567e8Da8018f592e1855A4459629c0E1d8A', 20, { gasLimit: 250000 });
    //     const reciept = transferGamma.wait();
    //     console.log(reciept);
    // } catch (error) {
    //     console.log(error);
    // }
}
main();