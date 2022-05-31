// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import {PoolBank} from "./Pool.sol";
import {GammaToken, ERC20} from "./Token.sol";
// import "@nomiclabs/buidler/console.sol";

contract TokenSwap {

    ERC20 public token;
    mapping(address => uint256) balanceOf;

    constructor(){
        token = GammaToken(address(this));
    }

    event Bought(address account, uint256 amount);
    event Sold(address account, uint256 amount);
    event Transfer(address, uint);

    function buy(address _account, uint256 _amount) payable public returns(uint256){

        uint256 dexBalance = token.balanceOf(address(this));
        require(address(this).balance > _amount, "Insufficient token balance in pool");

        token.transfer(_account, _amount);
        emit Bought(_account, _amount);

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

    function sell(address payable _account, uint amountTosell) payable public returns(uint256) {
        
        require(balanceOf[_account] > amountTosell, "Token balance not sufficient");

        _account.transfer(amountTosell);
        emit Sold(_account, amountTosell);

        uint256 dexBalance = token.balanceOf(address(this));

        return dexBalance;
    }
}