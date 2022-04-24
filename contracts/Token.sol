// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import 'hardhat/console.sol';

contract Token
{
    string public name = 'My Hardhat Token';
    string public symbol = 'MHT';
    uint public totalSupply = 1000000;
    address public owner;
    mapping(address => uint) balances;

    constructor()
    {
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    function transfer(address to, uint amount) external 
    {
        console.log('Sender balance is %s tokens', balances[msg.sender]);
        console.log('Trying to send %s tokens to %s', amount, to);
        
        // The sender's balance must have sufficient funds
        require(balances[msg.sender] >= amount, "Not enough tokens");

        // Important! Update balances before sending the funds
        // Update sender's balance: decrement by amount
        balances[msg.sender] -= amount;

        // Update recipient's balance: increment by amount
        balances[to] += amount;
    }

    function balanceOf(address account) external view returns (uint)
    {
        return balances[account];
    }
}