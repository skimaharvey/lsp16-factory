import { ethers } from "hardhat";

async function main() {
  const gasPrice = await ethers.provider.getGasPrice();

  const MyTokenFactory = await ethers.getContractFactory("MyNFT");

  console.log(`Deploying NFT with gas price ${await ethers.provider.getGasPrice()}...`)

  const myTokenContract = await MyTokenFactory.deploy({gasPrice});

  await myTokenContract.deployed();

  console.log(
    `Deployed to ${myTokenContract.address}`
  );
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
