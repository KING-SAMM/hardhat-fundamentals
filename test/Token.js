const { expect } = require('chai');
// const { ethers } = require('hardhat');

describe('Token contract', () => 
{
    let Token, token, owner, addr1, addr2;
  
    // This runs before each test
    beforeEach(async () => {
        // Get the ContractFactory and Signers here.
        Token = await ethers.getContractFactory("Token");
        [owner, addr1, addr2] = await ethers.getSigners();
    
        // To deploy our contract, we just have to call Token.deploy() and await
        // for it to be deployed(), which happens once its transaction has been
        // mined.
        token = await Token.deploy();
    });
    
    // You can nest describe calls to create subsections.
    describe("Deployment", () => {
        // `it` is another Mocha function. This is the one you use to define your
        // tests. It receives the test name, and a callback function.

        // If the callback function is async, Mocha will `await` it.
        // Test 1
        it("Should set the right owner", async () => {
            // Expect receives a value, and wraps it in an Assertion object. These
            // objects have a lot of utility methods to assert values.

            // This test expects the owner variable stored in the contract to be equal
            // to our Signer's owner.
            expect(await token.owner()).to.equal(owner.address);
        });

        // Test 2
        it("Should assign the total supply of tokens to the owner", async () => {
            const ownerBalance = await token.balanceOf(owner.address);
            expect(await token.totalSupply()).to.equal(ownerBalance);
        });
    });


    // Another group of tests...
    describe('Transactions', () => 
    {
        // Test 1: Call the transfer method to be sure it works
        it('Should transfer tokens between accounts', async () => 
        {
            // Transfer from 1st address (this is default) (i.e owner) to addr1.address
            await token.transfer(addr1.address, 50);

            // Check balance
            const addr1Balance = await token.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(50);
                
            // Transfer from addr1.address to addr2.address
            await token.connect(addr1).transfer(addr2.address, 50);

            // Check balance
            const addr2Balance = await token.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(50);

        });

        // Test 2: Failing assertions
        it('Should fail if sender does not have enough tokens', async () => 
        {
            const initialOwnerBalance = await token.balanceOf(owner.address);

            // Test revert
            await expect(
                token.connect(addr1).transfer(owner.address, 1)
            ).to.be.revertedWith('Not enough tokens');

            expect(
                await token.balanceOf(owner.address)
            ).to.equal(initialOwnerBalance);
        });

        // Test 3: Update balances after transfers
        it('Should update balances after transfers', async () => 
        {
            // ===== Owner Balance Assertion =====
            // From initial owner balance...
            const initialOwnerBalance = await token.balanceOf(owner.address);

            //...transfer 100 and 50 tokens to addresses 1 & 2 
            await token.transfer(addr1.address, 100);
            await token.transfer(addr2.address, 50);

            // Get final owner balance
            const finalOwnerBalance = await token.balanceOf(owner.address);

            // We expect the final owner balance to be decreased 
            // by total amount transfered
            expect(finalOwnerBalance)
                .to.equal(initialOwnerBalance.sub(150));

            // ===== Address 1 Balance Assertion =====
            const addr1Balance = await token.balanceOf(addr1.address);
            expect(addr1Balance)
                .to.equal(100);

            // ===== Address 2 Balance Assertion =====
            const addr2Balance = await token.balanceOf(addr2.address);
            expect(addr2Balance)
                .to.equal(50);
        });
    });
});

