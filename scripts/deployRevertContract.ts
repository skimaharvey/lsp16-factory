import { ethers } from "hardhat";

async function main() {
  const gasPrice = await ethers.provider.getGasPrice();

  const RevertContractFactory = await ethers.getContractFactory("RevertContract");

  console.log(`Deploying RevertContract with gas price ${await ethers.provider.getGasPrice()}...`)

  const revertContract = await RevertContractFactory.deploy({gasPrice});

  await revertContract.deployed();

  console.log(
    `Deployed to ${revertContract.address}`
  );
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
