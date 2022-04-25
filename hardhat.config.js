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
