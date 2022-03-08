// Load http
const http = require("http");
const fs = require("fs");
const { parse } = require('querystring');
const hostname = '127.0.0.1';
const port = 3000;

require('dotenv').config()

// Load web3
const Tx = require('ethereumjs-tx').Transaction;
const Web3 = require('web3');
// const rpcURL = 'https://ropsten.infura.io/v3/' + `${process.env.INFURA_KEY}`
const rpcURL = process.env.ALCHEMY_URL
const web3 = new Web3(rpcURL);
const address = '0xC26880A0AF2EA0c7E8130e6EC47Af756465452E8';

// load contract parameters
const abi = require('../artifacts/contracts/Trade.sol/TokenSwap.json');
const contract_address = "0xca8f50B3a0e82333a67b43072E7aC2aBb039c3A5";

// const abi = [{"constant":true,"inputs":[],"name":"mintingFinished","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"mint","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"finishMinting","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"},{"name":"_releaseTime","type":"uint256"}],"name":"mintTimelocked","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[],"name":"MintFinished","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]
// const contract_address = '0xd26114cd6EE289AccF82350c8d8487fedB8A0C07'

const contract = new web3.eth.Contract(abi, contract_address);

//load test account details
const account1 = "0x38134439548De25F835116cA7d76C443D262f8fa";
const account2 = "0x0D5Fa1C2967904fEB4A7A626bd83E4eF898824EB";

const privateKey1 = Buffer.from(process.env.PRIVATE_KEY_1, 'hex')
const privateKey2 = Buffer.from(process.env.PRIVATE_KEY_2, 'hex')

//Create HTTP server and listen on port 3000 for requests
const server = http.createServer((req, res) => {

  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      var postData = parse(body)
      console.log(
        postData.swapFrom
      );
      res.end(body);
    });
  }

  // get address balance
  web3.eth.getBalance(address, (err, wei) => {
    balance = web3.utils.fromWei(wei, 'ether');
    console.log(balance);
  })

  // contract.methods.buy(1).call().then(function(res) {
  //   console.log(res);
  // }).catch(function(err) {
  //   console.log(err);
  // });

  //generate transfer transaction
  // web3.eth.getTransactionCount(account1, (err, txCount) => {
  //   const data = 'postData';
    
  //   const txObject = {
  //     nonce:    web3.utils.toHex(txCount),
  //     // to:       account2,
  //     // value:    web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
  //     data: data,
  //     gasLimit: web3.utils.toHex(200000),
  //     gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
  //   }
    
  //   // sign the transaction
  //   const tx = new Tx(txObject, { chain: 'ropsten' });
  //   tx.sign(privateKey1)
    
  //   const serializedTx = tx.serialize()
  //   const raw = '0x' + serializedTx.toString('hex')
    
  //   // broadcast the transaction to the chain
  //   web3.eth.sendSignedTransaction(raw, (err, txHash) => {
  //     console.log('txHash:', txHash)
  //   })
  // });

  //Set the response HTTP header with HTTP status and Content type
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  fs.readFile('./docs/index.html', null, function (error, data) {
    if (error) {
        res.writeHead(404);
        res.write('Whoops! File not found!');
    } else {
        res.write(data);
    }
    res.end();
});
});

//listen for request on port 3000, and as a callback function have the port listened on logged
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});