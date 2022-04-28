const { ethers } = require("hardhat");
const fs = rewuire('fs');

// async function main()
// {
//     const [ deployer ] = await ethers.getSigners();
//     console.log(`Deploying contract with address: ${ deployer.address }`);

//     const balance = deployer.getBalance();
//     console.log(`Account balance: ${ (await balance).toString() } `);

//     const Token = await ethers.getContractFactory("Token");
//     const token = await Token.deploy();
//     console.log(`Token address: ${ token.address }`);
// }

// main()
//     .then(() => process.exit(0))
//     .catch(error => 
//     {
//         console.error(error);
//         process.exit(1);
//     });


const main = async () =>
{
    const [ deployer ] = await ethers.getSigners();
    console.log(`Deploying contract with address: ${ deployer.address }`);

    const balance = deployer.getBalance();
    console.log(`Account balance: ${ (await balance).toString() } `);

    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy();
    console.log(`Token address: ${ token.address }`);
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