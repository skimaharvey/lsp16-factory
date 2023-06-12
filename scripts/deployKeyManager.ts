
import { ethers } from "hardhat";

const UNIVERSAL_PROFILE_ADDRESS = "0x9d899301580e04495344d96a42959a5F90c59093"

async function main() {
  const KeyManagerFactory = await ethers.getContractFactory("LSP6KeyManager");
  const keyManager = await KeyManagerFactory.deploy(UNIVERSAL_PROFILE_ADDRESS,{gasPrice: (await ethers.provider.getGasPrice()).add(ethers.utils.parseUnits("1", "gwei"))});

  await keyManager.deployed();

  console.log('keyManager', keyManager.address)
}



main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
