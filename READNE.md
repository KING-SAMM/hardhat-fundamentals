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

In the terminal, run

        npx hardhat run scripts/deploy.js

The deploying account (deployer), the account balance and the contract address will be printed to the terminal.

2. Deploying to a Live Network
------------------------------
A list of live networks on the Ethereum blockchain include:

        Mainnet
        Ropsten
        Rinkeby
        Kovan

We will be deploying to rinkeby.

First create an account on Infura. (A great alternative to infura is Alchemy). Login and click 'Create New Project'. Select 'Ethereum' in the PRODUCT field. PROJECT NAME can be anything: we are using 'hardhat'. After project is created, select 'Rinkeby' from the ENDPOINTS dropdown. Then copy the project url, the one that begins with 'https://rinkeby.infura.io/...'. 

Next, open Metamask in your browser. Get the private key of the account from which you will deploy the Token contract. Make sure 'Rinkeby Test Network' is selected, and the account has some test ethereum.

In your code editor, create a .env file in the root directory. Assign your account private key to the variable PRIVATE_KEY. Assign the rinkeby url to the variable PROJECT_URL. Export the two variables. The code should look like this:

        module.exports = {
           PROJECT_URL: 'https://rinkeby.infura.io/v3/a10bbe...5fd40a',
           PRIVATE_KEY: 'xyz80a87ce2abc13...5d58aa0ae'
        }

In the hardhat.config.ks file, import the variables and create a configuration file that looks like this:

     /**
      * @type import('hardhat/config').HardhatUserConfig
      */
     require('@nomiclabs/hardhat-waffle');

     const { PROJECT_URL, PRIVATE_KEY } = require('./.env');

     module.exports = {
       solidity: "0.8.0",
       networks: {
         rinkeby: {
           url: PROJECT_URL,
           accounts: [ `0x${ PRIVATE_KEY }` ]
         }
       }
     };

In the terminal, run

        npx hardhat run scripts/deploy.js --network rinkeby

The deploying account (deployer), the account balance and the contract address will be printed to the terminal.

Verify on the Rinkeby Etherscan
-------------------------------
Copy the Token (contract) address printed to the terminal. Paste it in the search box on the rinkeby etherscan (https://ronkeby.etherscan.io). Details of the transaction will be displayed on the page.

