// Load http
const http = require("http");
const hostname = '127.0.0.1';
const port = 3000;

// Load web3
const Web3 = require('web3');
// const rpcURL = 'https://mainnet.infura.io/v3/'[`${process.env.INFURA_KEY}`]
const web3 = new Web3(rpcURL);
const address = '0x2A20380DcA5bC24D052acfbf79ba23e988ad0050';

const abi = require('../artifacts/contracts/Token.sol/GammaToken.json');
const contract_address = "0x3E7B1fDF5d6ef11ec168df92df6C745FB8D7FB12";
const contract = new web3.eth.Contract(abi, contract_address);

//Create HTTP server and listen on port 3000 for requests
const server = http.createServer((req, res) => {

  web3.eth.getBalance(address, (err, wei) => {
    balance = web3.utils.fromWei(wei, 'ether');
    console.log(wei);
  })
  
  console.log(contract.methods);

  //Set the response HTTP header with HTTP status and Content type
  res.statusCode = 200;
  // res.setHeader('Content-Type', 'text/plain');
  res.end('./docs/index.html');
});

//listen for request on port 3000, and as a callback function have the port listened on logged
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});