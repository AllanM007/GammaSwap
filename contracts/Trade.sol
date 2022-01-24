// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "./Pool.sol";

contract TokenSwap {

    //create state variables
    
    IERC20 public token1;
    IERC20 public token2;
    address public trader1;
    address public trader2;
    
    //when deploying pass in owner 1 and owner 2

    constructor (
        address _token1,
        address _token2,
        address _owner1,
        address _owner2
    ) public {
        trader1 = _owner1;
        token1 = IERC20(_token1);
        trader2 = _owner2;
        token2 = IERC20(_token2);
    }

    function swap(uint _amount1, uint amount2) public {}
}