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
const contract_address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
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

  contract.methods.buy(1).call().then(function(res) {
    console.log(res);
  }).catch(function(err) {
    console.log(err);
  });

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