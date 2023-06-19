import { ethers } from "hardhat";

async function main() {

  const universalprofileDeployer = await ethers.getContractFactory('UniversalProfileAndOwnerDeployer')
  const universalprofileDeployerInstance = await universalprofileDeployer.deploy({gasPrice: (await ethers.provider.getGasPrice()).add(ethers.utils.parseUnits('1', 'gwei'))})
  await universalprofileDeployerInstance.deployed()

  console.log('universalprofileDeployerInstance address', universalprofileDeployerInstance.address);

}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
