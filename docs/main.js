console.log("Tebere");

requirejs(['../node_modules/web3/dist/web3.min.js'], function(){
  console.log("web3 is installed");

  web3 = new Web3();
  // const rpcURL = 'https://mainnet.infura.io/v3/'[`${process.env.INFURA_KEY}`]
  // const web3URL = new Web3(rpcURL);
  const address = '0x90e63c3d53E0Ea496845b7a03ec7548B70014A91';
  
  // const GammaTokenAbi = require('../artifacts/contracts/Token.sol/GammaToken.json');

  // const contract_address = "0x3E7B1fDF5d6ef11ec168df92df6C745FB8D7FB12";
  // const contract = new web3.eth.Contract(GammaTokenAbi, contract_address);
  
  web3.eth.getBalance(address, (err, wei) => {
    balance = web3.utils.fromWei(wei, 'ether');
    console.log(balance);
  });

  console.log(contract.methods);
})