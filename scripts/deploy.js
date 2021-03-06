const fs = require('fs');

const { ethers } = require("hardhat");

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

    // Include the following when deploying to a live network
    // Create data object containing contract address and ABI
    const data = 
    {
        address: token.address,
        abi: JSON.parse(token.interface.format('json'))
    }

    // Write this data to a file in frontend/src directory
    fs.writeFileSync('frontend/src/Token.json', JSON.stringify(data));
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