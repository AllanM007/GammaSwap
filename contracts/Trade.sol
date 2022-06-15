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

    function sell(uint256 _amountTosell) public returns(bool) {
        
        token.approve(address(this), _amountTosell);
        
        // uint256 dexBalance = token.balanceOf(address(this));
        uint256 _allowance = token.allowance(msg.sender, address(this));

        require(_allowance >= _amountTosell, "Amount not sufficient");

        token.transferFrom(msg.sender, address(this), _amountTosell);
        emit Sold(address(this), _amountTosell);

        return true;
    }
}