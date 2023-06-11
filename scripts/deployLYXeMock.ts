import { ethers } from "hardhat";

async function main() {
  const LYXeMockFactory = await ethers.getContractFactory(
    "ReversibleICOToken"
  );

  const lyxeMockContract = await LYXeMockFactory.deploy("LYXe", "LYXe", []);
  await lyxeMockContract.deployed();
  console.log("lyxeMockContract deployed to:", lyxeMockContract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
