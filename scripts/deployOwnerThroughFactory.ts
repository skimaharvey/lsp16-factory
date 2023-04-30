import { ethers } from "hardhat";
import { Owner__factory } from "../typechain-types";

async function main() {
  const gasPrice = 4500000000;
  const universalFactoryAddress = ''

  const ownerBytesCode = Owner__factory.bytecode;
  const randomSalt = ethers.utils.randomBytes(32);


  const universalFactory = await ethers.getContractAt("LSP16UniversalFactory", universalFactoryAddress);

  const contractAddress = await universalFactory.callStatic.deployCreate2(ownerBytesCode,randomSalt, {gasPrice});

  const tx = await universalFactory.deployCreate2(ownerBytesCode,randomSalt, {gasPrice});

  await tx.wait();

  console.log(
    `Deployed to ${contractAddress}`
  );
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
