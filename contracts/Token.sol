// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract Token
{
    string public name = 'My Hardhat Token';
    string public symbol = 'MHT';
    uint public totalSupply = 1000000;
    address public owner;
    mapping(address => uint) balance;

    constructor()
    {
        balance[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    function transfer(address to, uint amount) external 
    {
        // The sender's balance must have sufficient funds
        require(balance[msg.sender] >= amount, "Not enough tokens");

        // Important! Update balances before sending the funds
        // Update sender's balance: decrement by amount
        balance[msg.sender] -= amount;

        // Update recipient's balance: increment by amount
        balance[to] += amount;
    }

    function balanceOf(address account) external view returns (uint)
    {
        return balance[account];
    }
}