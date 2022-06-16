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
const gammaSwapContract = new ethers.Contract("0x86D00C262ed816b329ADC799bB1EFF01E38d5324", contract.abi, signer);
const gammaTokenContract = new ethers.Contract(process.env.GammaToken_ADDRESS, GammaTokenContractABI.abi, signer );

async function sellToken() {
    
    // const signedTransaction = signer.signTransaction(tx, METAMASK_PRIVATE_KEY)

    const recipientAddr = '0x391E3567e8Da8018f592e1855A4459629c0E1d8A';
    
    const buyNum = 49899999;
    const fmtInt = ethers.utils.parseUnits(buyNum.toString(), 18);

    try {
        
        const approv = await gammaTokenContract.approve('0x86D00C262ed816b329ADC799bB1EFF01E38d5324', 20);
        return approvalConfirmation = await approv.wait();

        // const message = await gammaSwapContract.sell( 20, { gasLimit: 250000 });
        // await message.wait();

        //contract.coins(1).then(res => console.log(res)).catch(err=> console.log("error", err));
    } catch (error) {
        console.log(error);
    }
}

sellToken().then(data => {
    console.log(data)
    process.exit();
}).catch(err => console.error(err));