import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const pvtKey = 'your-private-key'

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    luksoTestnet: {
      url: `https://rpc.testnet.lukso.network`,
      accounts: [pvtKey],
    },
    l3030: {
      url: `https://rpc.execution.3030.devnet.lukso.dev`,
      accounts: [pvtKey],
    },
  }
};

export default config;
