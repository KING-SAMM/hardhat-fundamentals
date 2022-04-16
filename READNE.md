___________________________________________________
| This is a hardhat setup guide
---------------------------------------------------
1.  Start an npm project

        npm init

2.  Install hardhat as a development dependency 

        npm install -D hardhat

3.  Create a hardhat project

        npx hardhat

    'npx' is a utility that comes with our node.js installation. It enables us run executables that are local to our project.   
 
4.  At this point hardhat presents us with certain options it needs to initialize our project:

        Create a simple project
        Create an advanced project
        Create a project with typescript
        Create an empty hardhat.config.js

    Select 'Create an empty hardhat.config.js'

5.  Hardhat comes with an ecosystem of plugins that we can install (as development dependencies) to extend its functionality.

        npm install -D @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai

6.  Modify the hardhat.config.js file. We require the dependencies by typing

        require('@nomiclabs/hardhat-waffle');

at the top of the file, after the top comment. In the module.exports statement, alter 

        solidity: '0.7.3',
    
to
    
        solidity: '0.8.0',

NOTE: We don't require hardhat-ethers because hardhat-waffle already requires it.

And that's it!



Dependencies Roll call
----------------------
ethers                      - A javascript library that allows
                              interaction with the blockchain

@nomiclabs/hardhat-ethers   - A plugin that allows the use of the
                              ethers library in hardhat

ethereum-waffle             - A package to test smart
                              contracts      

@nomiclabs/hardhat-waffle   - A plugin that allows the use of the
                              ethereum-waffle library in hardhat   

chai                        - A testing library   