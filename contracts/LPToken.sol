// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GammaLPToken is ERC20 {
    constructor(uint256 totalSupply) ERC20("Gamma-LP", "GMLP"){
        _mint(msg.sender, totalSupply);
    }
}