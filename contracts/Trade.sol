// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import {PoolBank} from "./Pool.sol";
import {GammaToken, ERC20} from "./Token.sol";

contract TokenSwap {

    ERC20 public token;

    constructor(){
        token = GammaToken(address(this));
    }

    event Bought(uint256 amount);
    event Sold(uint256 amount);

    function buy(uint256 amount) payable public returns(uint256){
        uint256 amountTobuy = amount;
        uint256 dexBalance = token.balanceOf(address(this));
        require(address(this).balance > amountTobuy, "Insufficient token balance in pool");

        token.transfer(msg.sender, amountTobuy);
        emit Bought(amountTobuy);

        return dexBalance;
    }

    function sell(uint amountTosell) payable public returns(uint256) {
        require(amountTosell <= 0, "Amount can't be 0");
        require(msg.sender.balance > amountTosell);

        token.transfer(address(this), amountTosell);
        emit Sold(amountTosell);

        uint256 dexBalance = token.balanceOf(address(this));

        return dexBalance;
    }
}