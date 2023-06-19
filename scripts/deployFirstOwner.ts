import { ethers } from "hardhat";


async function main() {
  const firstOwner = await ethers.getContractFactory('FirstOwner')
  const firstOwnerInstance = await firstOwner.deploy({gasPrice: (await ethers.provider.getGasPrice()).add(ethers.utils.parseUnits('1', 'gwei'))})
  await firstOwnerInstance.deployed()

  console.log('firstOwnerInstance address', firstOwnerInstance.address);

}




main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
