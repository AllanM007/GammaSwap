// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  // const GammaToken = await hre.ethers.getContractFactory("GammaToken");
  // const gammaToken = await GammaToken.deploy("1000000000000000000000000000");

  // await gammaToken.deployed();

  // console.log("Token deployed to:", gammaToken.address);

  const GammaSwapTrade = await hre.ethers.getContractFactory("TokenSwap");

  const gammaSwapTrade = await GammaSwapTrade.deploy();

  console.log("Contract deployed to:", gammaSwapTrade.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
