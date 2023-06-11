
import { ethers } from "hardhat";


async function main() {

  const owner = '0x9d899301580e04495344d96a42959a5F90c59093'

  const UPContract = await ethers.getContractFactory("UniversalProfile");
  const upContract = await UPContract.deploy(owner, {gasPrice: (await ethers.provider.getGasPrice()).add(ethers.utils.parseUnits("1", "gwei"))});

  await upContract.deployed();

  console.log('upContract', upContract.address)


}




main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
