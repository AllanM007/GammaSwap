//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";

contract GammaToken is ERC2O {
    constructor(uint256 totalSupply) ERC20("GammaToken", "GM"){
        _mint(msg.sender, totalSupply);
    }
}
