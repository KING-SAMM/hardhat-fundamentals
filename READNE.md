___________________________________________________
| Debugging Smart Contracts
---------------------------------------------------
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

6.  console.log implements the same formatting options that can be found in Node.js' console.log, which in turn uses util.format.
Example: 
        
        console.log("Changing owner from %s to %s", currentOwner, newOwner)

7.  console.log is implemented in standard Solidity and then detected in Hardhat Network. This makes its compilation work with any other tools (like Remix, Waffle or Truffle).

8.  console.log calls can run in other networks, like mainnet, kovan, ropsten, etc. They do nothing in those networks, but do spend a minimal amount of gas.

9.  console.log output can also be viewed for testnets and mainnet via Tenderly.

10. console.log works by sending static calls to a well-known contract address. At runtime, Hardhat Network detects calls to that address, decodes the input data to the calls, and writes it to the console.