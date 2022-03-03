// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

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

    // create 2 state variables
    address public usdc;
    address public GammaToken;

    address[] public stakers;
    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    // in constructor pass in the address for USDC token and your custom token
    // that will be used to pay interest
    constructor() {
        usdc = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;
        // GammaToken = 0x3e7b1fdf5d6ef11ec168df92df6c745fb8d7fb12;
        GammaToken = 0x3E7B1fDF5d6ef11ec168df92df6C745FB8D7FB12;
    }

    // allow user to stake usdc tokens in contract
    function stakeTokens(uint _amount) public {

        // Transfer usdc tokens to contract for staking
        IERC20(usdc).transferFrom(msg.sender, address(this), _amount);

        // Update the staking balance in map
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        // Add user to stakers array if they haven't staked already
        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        // Update staking status to track
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    function withdrawTokens(uint _amount) public {

    	// get the users staking balance in usdc
    	uint balance = stakingBalance[msg.sender];

        //deduct amount of tokens from staking balance
        uint new_staking_balance = balance - _amount;

        // require the amount being withdrawn must be less than the staking balance
        require(balance > new_staking_balance, "Insufficient token balance!");

        // transfer usdc tokens out of this contract to the msg.sender
        IERC20(usdc).transfer(msg.sender, _amount);
    
        // reset staking balance map to new balance
        stakingBalance[msg.sender] = balance;
    }

    function unstakeTokens() public {

    	// get the users staking balance in usdc
    	uint balance = stakingBalance[msg.sender];
    
        // reqire the amount staked needs to be greater then 0
        require(balance > 0, "staking balance can not be 0");
    
        // transfer usdc tokens out of this contract to the msg.sender
        IERC20(usdc).transfer(msg.sender, balance);
    
        // reset staking balance map to 0
        stakingBalance[msg.sender] = 0;
    
        // update the staking status
        isStaking[msg.sender] = false;
    }

    // Issue liquidity tokens as a reward for staking
    function issueInterestToken() public {
        for (uint i=0; i<stakers.length; i++) {
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient];
            
            // if there is a balance transfer the SAME amount of bank tokens to the account that is staking as a reward
            if(balance >0 ) {
                IERC20(GammaToken).transfer(recipient, balance);
                
            }
            
        }
        
    }
}