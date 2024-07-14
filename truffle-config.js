// truffle-config.js

const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

module.exports = {
  networks: {
    core_mainnet: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC, 'https://rpc.coredao.org'),
      network_id: 1720970756413, // Correct network ID
      gas: 5500000,              // Gas limit
      gasPrice: 1000000000       // 1 Gwei (adjust as needed)
    },
  },

  // Set default mocha options here, use special reporters, etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.20",    // Fetch exact version from solc-bin
    }
  }
};
