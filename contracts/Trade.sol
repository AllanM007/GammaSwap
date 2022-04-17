// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import {PoolBank} from "./Pool.sol";
import {GammaToken, ERC20} from "./Token.sol";
// import "@nomiclabs/buidler/console.sol";

contract TokenSwap {

    ERC20 public token;

    constructor(){
        token = GammaToken(address(this));
    }

    event Bought(uint256 amount);
    event Sold(uint256 amount);
    event Transfer(address, uint);

    // function buy(uint256 amount) payable public returns(uint256){
    //     uint256 amountTobuy = amount;
    //     require(amountTobuy < 0, "Tokens can be less than 0");
    //     uint256 dexBalance = token.balanceOf(address(this));
    //     require(address(this).balance > amountTobuy, "Insufficient token balance in pool");

    //     token.transfer(msg.sender, amountTobuy);
    //     emit Bought(amountTobuy);

    //     return dexBalance;
    // }

    function transfer(address sender, uint numTokens) public returns (bool) {

        uint traderBalance = address(sender).balance;
        require(numTokens < address(token).balance, "dexBalance insufficient");
        traderBalance += numTokens;
        
        // token.transfer(sender, numTokens);
        emit Transfer(sender, numTokens);

        return true;
    }

    function sell(uint amountTosell) payable public returns(uint256) {
        require(amountTosell > 0, "Amount can't be 0");
        require(msg.sender.balance > amountTosell);

        token.transfer(address(this), amountTosell);
        emit Sold(amountTosell);

        uint256 dexBalance = token.balanceOf(address(this));

        return dexBalance;
    }
}