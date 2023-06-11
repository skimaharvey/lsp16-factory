import { ethers } from "hardhat";

async function main() {
  const UPDeployerFactory = await ethers.getContractFactory("UniversalProfileDeployer");
  const UPDeployer = await UPDeployerFactory.deploy({gasPrice: (await ethers.provider.getGasPrice()).add(ethers.utils.parseUnits("1", "gwei"))});

  await UPDeployer.deployed();

  console.log("UPDeployer deployed to:", UPDeployer.address);
  // deployed locally at 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
  // deployed on Testnet at 0xbcfb13485782cf6631157e6a05B56982fe076f39
}





main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
