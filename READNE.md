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