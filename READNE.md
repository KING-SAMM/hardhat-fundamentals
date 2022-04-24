_______________________________
| This is a hardhat setup guide
-------------------------------
Start an npm project

        npm init

Install hardhat as a development dependency

        npm install -D hardhat

Create a hardhat project

        npx hardhat
'npx' is a utility that comes with our node.js installation. It enables us run executables that are local to our project.

At this point hardhat presents us with certain options it needs to initialize our project:

        Create a simple project
        Create an advanced project
        Create a project with typescript
        Create an empty hardhat.config.js

Select 'Create an empty hardhat.config.js'

Hardhat comes with an ecosystem of plugins that we can install (as development dependencies) to extend its functionality.

        npm install -D @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai

Modify the hardhat.config.js file. We require the dependencies by typing

        require('@nomiclabs/hardhat-waffle');

at the top of the file, after the top comment. In the module.exports statement, alter

        solidity: '0.7.3',
to

        solidity: '0.8.0',

NOTE: We don't require hardhat-ethers because hardhat-waffle already requires it.

And that's it!

Dependencies Roll call
----------------------
ethers                    - A javascript library that allows
                            interaction with the blockchain

@nomiclabs/hardhat-ethers - A plugin that allows the use of the 
                            ethers library in hardhat

ethereum-waffle           - A package to test smart contracts

@nomiclabs/hardhat-waffle - A plugin that allows the use of the 
                            ethereum-waffle library in hardhat

chai                      - A testing library



____________________________________________________
| Creating Smart Contracts
----------------------------------------------------
Every smart contract begins with an "SPDX-License-Identifier: " commnent at the top of the file.

Then the "pragma solidity <version>" statement follows.

The Tokens smart contract here created contains a 
        i. constructor that initializes the owner as the sender and the owner's balance to totalSupply (i.e 1000000) tokens, 
        ii. a transfer function, and 
        iii. a function to view/retrieve the balance of a specific account.

Run the following command to compile:

    npx hardhat compile

This command downloads the neccessary compiler for the specified version before compiling. This action creates two new directories: artifacts, and cache.

The results of the compilation are in the artifacts directory.

The contract's ABI (Application Binary Interface) resides in the artifacts/contracts/Token.sol/Token.json file. The contract's abi contains detailed information about the smart contract as well as its bytecode all in json format.





____________________________________________________
| Testing Smart Contracts
----------------------------------------------------
Create a new directory called test inside our project root directory and create a new file called Token.js.

    const [owner] = await ethers.getSigners();
    
A Signer in ethers.js is an object that represents an Ethereum account. It's used to send transactions to contracts and other accounts. Here we're getting a list of the accounts in the node we're connected to, which in this case is Hardhat Network, and only keeping the first one.

The ethers variable is available in the global scope. If you like your code always being explicit, you can add this line at the top:

    const Token = await ethers.getContractFactory("Token");

A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts, so Token here is a factory for instances of our token contract.

    const hardhatToken = await Token.deploy();

Calling deploy() on a ContractFactory will start the deployment, and return a Promise that resolves to a Contract. This is the object that has a method for each of your smart contract functions.

    const ownerBalance = await hardhatToken.balanceOf(owner.address);

Once the contract is deployed, we can call our contract methods on hardhatToken and use them to get the balance of the owner account by calling balanceOf().

Remember that the owner of the token who gets the entire supply is the account that makes the deployment, and when using the hardhat-ethers plugin ContractFactory and Contract instances are connected to the first signer by default. This means that the account in the owner variable executed the deployment, and balanceOf() should return the entire supply amount.

    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);

Here we're again using our Contract instance to call a smart contract function in our Solidity code. totalSupply() returns the token's supply amount and we're checking that it's equal to ownerBalance, as it should.

To do this we're using Chai (opens new window)which is an assertions library. These asserting functions are called "matchers", and the ones we're using here actually come from Waffle (opens new window). This is why we're using the hardhat-waffle plugin, which makes it easier to assert values from Ethereum. Check out this section (opens new window)in Waffle's documentation for the entire list of Ethereum-specific matchers.

Using a different account
--------------------------
If you need to send a transaction from an account (or Signer in ethers.js speak) other than the default one to test your code, you can use the connect() method in your ethers.js Contract to connect it to a different account.





____________________________________________________
| Debugging Smart Contracts
----------------------------------------------------
Hardhat Network allows you to print logging messages and contract variables by calling console.log() from your Solidity code.

Import the console.sol utility within the contract.

    import 'hardhat/console.sol';

It gives us the power of console.log() within our smart contracts.

    console.log('Sender balance is %s tokens', balances[msg.sender]);

For example, add some console.log to the transfer() function as if you were using it in JavaScript:

    function transfer(address to, uint256 amount) external {
      console.log("Sender balance is %s tokens", balances[msg.sender]);
      console.log("Trying to send %s tokens to %s", amount, to);

      require(balances[msg.sender] >= amount, "Not enough tokens");

      balances[msg.sender] -= amount;
      balances[to] += amount;
    }

This is useful for debugging.

The logging output will show when you run your tests:

     $ npx hardhat test

        Token contract
          Deployment
            ✓ Should set the right owner
            ✓ Should assign the total supply of tokens to the owner
         Transactions
      Sender balance is 1000 tokens
      Trying to send 50 tokens to 0xead9c93b79ae7c1591b1fb5323bd777e86e150d4
      Sender balance is 50 tokens
      Trying to send 50 tokens to 0xe5904695748fe4a84b40b3fc79de2277660bd1d3
            ✓ Should transfer tokens between accounts (373ms)
            ✓ Should fail if sender doesn’t have enough tokens
      Sender balance is 1000 tokens
      Trying to send 100 tokens to 0xead9c93b79ae7c1591b1fb5323bd777e86e150d4
      Sender balance is 900 tokens
      Trying to send 100 tokens to 0xe5904695748fe4a84b40b3fc79de2277660bd1d3
            ✓ Should update balances after transfers (187ms)


        5 passing (2s)


console.log
-----------
1.  You can use it in calls and transactions. It works with view functions, but not in pure ones.

2.  It always works, regardless of the call or transaction failing or being successful.

3.  To use it you need to import hardhat/console.sol.

4.  You can call console.log with up to 4 parameters in any order of following types: 

        uint 
        string 
        bool 
        address

5.  There's also the single parameter API for the types above, and additionally bytes, bytes1... up to bytes32: 

        console.logInt(int i) 
        console.logUint(uint i) 
        console.logString(string memory s) 
        console.logBool(bool b) 
        console.logAddress(address a) 
        console.logBytes(bytes memory b) 
        console.logBytes1(bytes1 b) 
        console.logBytes2(bytes2 b) 
        ... 
        console.logBytes32(bytes32 b)

6.  console.log implements the same formatting options that can be found in Node.js' console.log, which in turn uses util.format. Example:

        console.log("Changing owner from %s to %s", currentOwner, newOwner)

7.  console.log is implemented in standard Solidity and then detected in Hardhat Network. This makes its compilation work with any other tools (like Remix, Waffle or Truffle).

8.  console.log calls can run in other networks, like mainnet, kovan, ropsten, etc. They do nothing in those networks, but do spend a minimal amount of gas.

9.  console.log output can also be viewed for testnets and mainnet via Tenderly.

10. console.log works by sending static calls to a well-known contract address. At runtime, Hardhat Network detects calls to that address, decodes the input data to the calls, and writes it to the console.





___________________________________________________
| Deploying Smart Contracts
---------------------------------------------------
1. Deploying to the Hardhat Network (default)
---------------------------------------------
Create scripts/deploy.js in the root directory

        mkdir scripts
        touch scripts/deploy.js

Include the main test function

        async function main()
        {

        }

Call the function with the following code

        main()
             .then(() => process.exit(0))
             .catch(error => 
             {
                console.error(error);
                process.exit(1);
             });

Alternative Pattern
-------------------
An alternative async / await patter that cam be used:

        const main = async() =>
        {

        }

        const callMain = async () => 
        {
        try 
        {
                await main();
                process.exit(0);
        } 
        catch (error) 
        {
                console.error(error);
                process.exit(1);
        }
        }

        callMain();