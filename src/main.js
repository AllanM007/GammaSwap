const Web3 = require('web3');
const rpcURL = require('');
const GammaTokenAbi = require('artifacts/contracts/Token.sol/GammaToken.json');

const address = "";
const contract = new web3.eth.Contract(GammaTokenAbi, address);

if (typeof window.ethereum !== 'undefined') {
  console.log('MetaMask is installed!');
}

function EthButtonClick() {
  getAccount();
}

async function getAccount() {
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];
  console.log(account);
  document.querySelector('#showAccount').innerHTML = account;
}

const web3 = new Web3(rpcURL);
const account = '0x90e63c3d53E0Ea496845b7a03ec7548B70014A91';

web3.eth.getBalance(address, (err, wei) => {
  balance = web3.utils.fromWei(wei, 'ether');
  console.log(balance);
})

console.log(contract.methods);