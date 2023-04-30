import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const pvtKey = '0xbbc6703446945a0d6e1d40d50664da1c37bf51a1383ce165af96ccaa62c8f56e'

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
