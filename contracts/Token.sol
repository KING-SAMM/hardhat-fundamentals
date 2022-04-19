// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract Token
{
    string public name = 'My Hardhat Token';
    string public symbol = 'MHT';
    uint256 public totalSupply = 1000000;
    address public owner;
    mapping(address => uint) balances;

    constructor()
    {
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    function transfer(address to, uint256 amount) external 
    {
        // The sender's balance must have sufficient funds
        require(balances[msg.sender] >= amount, "Not enough tokens");

        // Important! Update balances before sending the funds
        // Update sender's balance: decrement by amount
        balances[msg.sender] -= amount;

        // Update recipient's balance: increment by amount
        balances[to] += amount;
    }

    function balanceOf(address account) external view returns (uint256)
    {
        return balances[account];
    }
}