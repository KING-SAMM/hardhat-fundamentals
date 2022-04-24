___________________________________________________
| Debugging Smart Contracts
---------------------------------------------------
Import the console.sol utility 

        import 'hardhat/console.sol';

that gives us the power of console.log() within our smart contracts.

        console.log('Sender balance is %s tokens', balances[msg.sender]);

 This is useful during debugging.