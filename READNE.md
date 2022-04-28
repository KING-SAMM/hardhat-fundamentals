_______________________________
| Integrating the Frontend
-------------------------------
To integrate the frontend we need the ABI and the contract address.

In the artifacts/contracts/Token.json file we have the ABI but not the address.

Inside deploy.js at the end of the main function, include the following code to create data object containing contract address and ABI. (When the deploy script is run the address will be available)

     const data = 
     {
         address: token.address,
         abi: JSON.parse(token.interface.format('json'))
     }

Write this data to a file in frontend/src directory

     fs.writeFileSync('frontend/src/Token.json', JSON.stringify(data));

Don't forget to require the fs module at the top of the file. On the terminal run the following commands

     mkdir frontend
     mkdir frontend/src

Run the local hardhat blockchain

     npx hardhat node

Deploy the smart contract on this local blockchain

     npx hardhat run scripts/deploy.js --network localhost

Inside the src folder, create the integration file, integrate.js

     import { ethers, Contract } from 'ethers';
     import Token from './Token.json';

     // Connect to blockchain
     const getBlockchain = () => 
         new Promise((resolve, reject) => 
         {
             window.addEventListener('load', async () => 
             {
                 if(window.ethereum)
                 {
                     await window.ethereum.enable();
                     const provider = new ethers.providers.Web3Provider(window.ethereum);
                     const signer = provider.getSigner();
                     const signerAddress = await signer.getAddress();

                     const token = new Contract(
                         Token.address,
                         Token.abi,
                         signer 
                     );

                     resolve({ signerAddress, token });
                 }

                 resolve({ signerAddress: undefined, token: undefined });
             });
         });

         export default getBlockchain;


Create the App.js file

     import getBlockchain from './integrate.js';
     import { useState, useEffect } from 'react';

     const App = () =>
     {
         const [ token, setToken ] = useState(undefined);

         useEffect(() => {
             const init = async () =>
             {
                 const { token } = await getBlockchain();
                 setToken(token);
             }

             init();
         }, []);

         if (token == undefined)
         {
             return 'Loading...';
         }
    
         return (
             <div className='App'>

             </div>
         );
     }

     export default App;