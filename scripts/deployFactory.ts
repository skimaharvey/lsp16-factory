import { ethers } from "hardhat";

async function main() {
  const gasPrice = 4500000000;

  const LSP16UniversalFactory = await ethers.getContractFactory("LSP16UniversalFactory");
  const universalFactory = await LSP16UniversalFactory.deploy({gasPrice});

  await universalFactory.deployed();

  console.log(
    `Deployed to ${universalFactory.address}`
  );
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
