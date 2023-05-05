import { ethers } from "hardhat";

async function main() {
  const gasPrice = await ethers.provider.getGasPrice();

  const LSP16UniversalFactory = await ethers.getContractFactory("LSP16UniversalFactory");

  console.log(`Deploying LSP16UniversalFactory with gas price ${await ethers.provider.getGasPrice()}...`)

  const universalFactory = await LSP16UniversalFactory.deploy();

  await universalFactory.deployed();

  console.log(
    `Deployed to ${universalFactory.address}`
  );
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
