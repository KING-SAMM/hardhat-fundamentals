___________________________________________________
| Testing Smart Contracts
---------------------------------------------------
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
-------------------------
If you need to send a transaction from an account (or Signer in ethers.js speak) other than the default one to test your code, you can use the connect() method in your ethers.js Contract to connect it to a different account.