import { ethers } from "hardhat";
import {bytecode as ownerBytecode} from '../artifacts/contracts/Owner.sol/Owner.json'

async function main() {
  const gasPrice = 45000000000;
  const universalFactoryAddress = '0xe06F38A2b56B47E91C5e09b11E22a1556D392D37'

  const randomSalt = ethers.utils.hexlify(ethers.utils.randomBytes(32));
  console.log(`Random salt: ${randomSalt}`)


  const universalFactory = await ethers.getContractAt("LSP16UniversalFactory", universalFactoryAddress);

  const contractAddress = await universalFactory.callStatic.deployCreate2(ownerBytecode,randomSalt);

  const tx = await universalFactory.deployCreate2(ownerBytecode,randomSalt, {gasPrice});

  await tx.wait();

  console.log(
    `Deployed to ${contractAddress}`
  );
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
