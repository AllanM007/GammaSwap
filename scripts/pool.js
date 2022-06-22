require("dotenv").config();
const API_KEY = process.env.ALCHEMY_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const METAMASK_ADDRESS = process.env.ETH_DEV_ACCOUNT_ADDRESS
// const CONTRACT_ADDRESS = process.env.GammaSwapTrade_ADDRESS;

const { json } = require("hardhat/internal/core/params/argumentTypes");
const { ethers} = require("ethers");
const contract = require("../artifacts/contracts/Pool.sol/PoolBank.json");
const GammaLPTokenContractABI = require('../artifacts/contracts/LPToken.sol/GammaLPToken.json'); 

// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(network="ropsten", API_KEY);

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

console.log(signer.getGasPrice());

// Contract
const gammaPoolContract = new ethers.Contract("0x508D5f7e65A98Be774Ac3499c892b122d84BAaf6", contract.abi, signer);
const gammaLPTokenContract = new ethers.Contract(process.env.GammaLPToken_ADDRESS, GammaLPTokenContractABI.abi, signer );

async function stakeToken() {

    try {

        const approv = await gammaLPTokenContract.approve('0x508D5f7e65A98Be774Ac3499c892b122d84BAaf6', 20);
        const approvalConfirmation = await approv.wait();

        if (approvalConfirmation.status == 1) {
            const stakeTransaction = await gammaPoolContract.stakeTokens(20, { gasLimit: 250000 });
            const stakeLog = await stakeTransaction.wait();
            
            const stakeObject = stakeLog.events.find(event => event.event === 'StakeTokens');
            
            const [to, value] = stakeObject.args;
            
            console.log(to, value.toString());
              
        } else {
            console.log(`Token transfer approval rejected`);
        }              

    } catch (error) {
        console.log(error);
    }
}

async function withdrawToken() {

    try {

        const withdrawTransaction = await gammaPoolContract.withdrawTokens(5, { gasLimit: 250000 });
        const withdrawLog = await withdrawTransaction.wait();
            
        const withdrawObject = withdrawLog.events.find(event => event.event === 'WithdrawTokens');
            
        const [to, value] = withdrawObject.args;
            
        console.log(to, value.toString());             

    } catch (error) {
        console.log(error);
    }
}

async function unstakeToken() {

    try {

        const unstakeTransaction = await gammaPoolContract.stakeTokens({ gasLimit: 250000 });
        const unstakeLog = await unstakeTransaction.wait();
            
        const unstakeObject = unstakeLog.events.find(event => event.event === 'UnstakeTokens');
            
        const [to, value] = unstakeObject.args;
            
        console.log(to, value.toString());             

    } catch (error) {
        console.log(error);
    }
}

withdrawToken();