import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";

const pvtKey = '0xbbc6703446945a0d6e1d40d50664da1c37bf51a1383ce165af96ccaa62c8f56e'
const pvtKeyMainnet = '0xd8406bf2f8048957fd35c67f9f32b75516d1601b7aa8cb367a50ebd5a69bebbe'

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.5.0",
      },

      {
        version: "0.8.15"
      },
    ],
  },
  networks: {
    hardhat: {
      blockGasLimit: 32999064,
      // url: `http://localhost:8545`,
      // accounts: [`0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`],
    },
    luksoTestnet: {
      url: `https://rpc.testnet.lukso.network`,
      accounts: [pvtKey],
    },
    luksoMainnet: {
      url: `https://rpc.mainnet.lukso.network`,
      accounts: [pvtKeyMainnet],
    },
    l3030: {
      url: `https://rpc.execution.3030.devnet.lukso.dev`,
      accounts: [pvtKey],
    },
    localhost: {
      url: `http://localhost:8545`,
      accounts: [`0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`],
    }
  },
  etherscan: {
    apiKey: 'no-api-key-needed',
    customChains: [
      {
        network: "luksoTestnet",
        chainId: 4201,
        urls: {
          apiURL: "https://explorer.execution.testnet.lukso.network/api",
          browserURL: "https://explorer.execution.testnet.lukso.network/",
        },
      },
    ],
  },
};

export default config;
