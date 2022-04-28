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
                const provider = new ethers.provider.Web3Provider(window.ethereum);
                const signer = await provider.getSigner();
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