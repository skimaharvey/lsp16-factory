import { ethers } from "hardhat";

async function main() {
  const gasPrice = await ethers.provider.getGasPrice();

  const FirstOwnerDelegatorFactory = await ethers.getContractFactory(
    "FirstOwnerDelegator"
  );
  const firstOwnerDelegator = await FirstOwnerDelegatorFactory.deploy({
    gasPrice: gasPrice.add(ethers.utils.parseUnits("5", "gwei")),
  });

  await firstOwnerDelegator.deployed();

  console.log("firstOwnerDelegator", firstOwnerDelegator.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
