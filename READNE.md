___________________________________________________
| Creating Smart Contracts
---------------------------------------------------
Every smart contract begins with an "SPDX-License-Identifier: <SPDX-License>" commnent at the top of the file.

Then the "pragma solidity <version>" statement follows.

The Tokens smart contract here created contains a 
        i.      constructor that initializes the owner as the sender and the owner's balance to totalSupply (i.e 1000000) tokens,
        ii.     a transfer function, and
        iii.    a function to view/retrieve the  balance of a specific account.

Run the following command to compile:

        npx hardhat compile

This command downloads the neccessary compiler for the specified version before compiling. This action creates two new directories: 
        artifacts, and 
        cache.

The results of the compilation are in the artifacts directory.

The contract's ABI (Application Binary Interface) resides in the  artifacts/contracts/Token.sol/Token.json file. The contract's abi contains detailed information about the smart contract as well as its bytecode all in json format.