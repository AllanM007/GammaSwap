// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import {GammaLPToken, ERC20} from './LPToken.sol';
import {GammaToken, ERC20} from './Token.sol';

interface IERC20 {
    function totalSupply() external view returns (uint);
    function balanceOf(address account) external view returns (uint);
    function transfer(address recipient, uint amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint);
    function approve(address spender, uint amount) external returns (bool);
    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) external returns (bool);
    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);
}

contract PoolBank {

    string public name = "PoolBank";

    // creat state variables
    ERC20 public token;
    ERC20 public LPToken;

    address[] public stakers;
    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    event StakeTokens(address account, uint256 amount);
    event UnstakeTokens(address acccount, uint256 amount);
    event WithdrawTokens(address account, uint256 amount);

    // in constructor pass in the address for Gamma LP token

    constructor() {
        LPToken = GammaLPToken(address(0x4155c2E551019C2765D613018c48cf585A375Ed9));
        token = GammaToken(address(0xF6d09bA980C99fFf8e6ffe740139AE36495Bb31c));
    }

    // allow user to stake GammaToken in liquidity pool contract
    function stakeTokens(uint _amount) public returns (bool) {

        // assign token allowance a verifiable variable
        uint256 transAllowance = token.allowance(msg.sender, address(this));
        
        // check if pool contract has enough allowance to send lp token
        require(_amount >= transAllowance, "token allowance not enough");
        
        // Send staker address lptokens matching staking token amount
        token.transferFrom(msg.sender, address(this), _amount);

        // Update the staking balance in map
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        // Add user to stakers array if they haven't staked already
        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        // Update staking status to track
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;

        emit StakeTokens(msg.sender, _amount);

        return true;
    }

    function withdrawTokens(uint _amount) public {

    	// get the users staking balance in usdc
    	uint balance = stakingBalance[msg.sender];

        //deduct amount of tokens from staking balance
        uint new_staking_balance = balance - _amount;

        // require the amount being withdrawn must be less than the staking balance
        require(balance > new_staking_balance, "Insufficient token balance!");

        // transfer gamma lp tokens from this contract to the msg.sender
        token.transfer(msg.sender, _amount);
    
        // reset staking balance map to new balance
        stakingBalance[msg.sender] = balance;

        emit WithdrawTokens(msg.sender, _amount);

    }

    function unstakeTokens() public returns(bool){

    	// get the users staking balance in usdc
    	uint balance = stakingBalance[msg.sender];
    
        // reqire the amount staked needs to be greater then 0
        require(balance > 0, "staking balance can not be 0");
    
        // transfer gamma lp tokens out of this contract to the msg.sender
        token.transfer(msg.sender, balance);
    
        // reset staking balance map to 0
        stakingBalance[msg.sender] = 0;
    
        // update the staking status
        isStaking[msg.sender] = false;

        emit UnstakeTokens(msg.sender, balance);

        return true;
    }

    // Issue liquidity tokens per week as a reward for staking
    function issueInterestToken() public {
        for (uint i=0; i<stakers.length; i++) {
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient];

            uint rewardAmount = balance * 1;
            
            // if there is a balance transfer the SAME amount of bank tokens to the account that is staking as a reward
            if(balance > 0 ) {
                LPToken.transfer(recipient, rewardAmount);
                
            }
            
        }
        
    }
}