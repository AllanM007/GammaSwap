// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "./Pool.sol";

contract TokenSwap {
    
    IERC20 public token1;
    IERC20 public token2;
    address public trader1;
    address public trader2;

    event Bought(uint256 amount);
    event Sold(uint256 amount);

    function buy(uint _amount) payable public returns(uint256) {
        require(_amount < 0, "Token amount can't be less than 0");
        require(address(this).balance > _amount, "Insufficient token balance in pool");

        token1.transfer(msg.sender, _amount);
        emit Bought(_amount);

        uint256 dexBalance = token1.balanceOf(address(this));

        return dexBalance;
    }

    function sell(uint _amount) payable public returns(uint256) {
        require(_amount <= 0, "Amount can't be 0");
        require(msg.sender.balance > _amount);

        token2.transfer(address(this), _amount);
        emit Sold(_amount);

        uint256 dexBalance = token2.balanceOf(address(this));

        return dexBalance;
    }
}