// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import {PoolBank} from "./Pool.sol";
import {GammaToken, ERC20} from "./Token.sol";
// import "@nomiclabs/buidler/console.sol";

contract TokenSwap {

    ERC20 public token;
    address tokenAddr;
    mapping(address => uint256) balanceOf;

    constructor(){
        token = GammaToken(address(0xF6d09bA980C99fFf8e6ffe740139AE36495Bb31c));
    }

    event Bought(address account, uint256 amount);
    event Sold(address account, uint256 amount);
    event Transfer(address, uint);

    function buy(uint256 _amount) payable public returns(uint256){

        uint256 dexBalance = token.balanceOf(address(this));
        require(dexBalance > _amount, "Insufficient token balance");

        token.transfer(msg.sender, _amount);
        emit Bought(msg.sender, _amount);

        return dexBalance;
    }

    // function transfer(address sender, uint numTokens) public returns (bool) {

    //     uint traderBalance = address(sender).balance;
    //     require(numTokens < address(token).balance, "dexBalance insufficient");
    //     traderBalance += numTokens;
        
    //     // token.transfer(sender, numTokens);
    //     emit Transfer(sender, numTokens);

    //     return true;
    // }

    function sell(uint amountTosell) payable public returns(uint256) {
        
        uint256 dexBalance = token.balanceOf(address(this));
        address payable _accountAddress = payable(msg.sender);

        require(token.balanceOf(_accountAddress) > amountTosell, "Token balance not sufficient");

        _accountAddress.transfer(amountTosell);
        emit Sold(msg.sender, amountTosell);

        return dexBalance;
    }
}