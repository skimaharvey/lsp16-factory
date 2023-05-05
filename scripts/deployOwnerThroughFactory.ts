import { ethers } from "hardhat";
import {bytecode as ownerBytecode} from '../artifacts/contracts/Owner.sol/Owner.json'

async function main() {
  const gasPrice = await ethers.provider.getGasPrice();
  const universalFactoryAddress = '0x03BB0cBbc9dd38b5e7dD32e42c89fB00B61fCCB1'

  const randomSalt = ethers.utils.hexlify(ethers.utils.randomBytes(32));
  console.log(`Random salt: ${randomSalt}`)


  const universalFactory = await ethers.getContractAt("LSP16UniversalFactory", universalFactoryAddress);

  const contractAddress = await universalFactory.callStatic.deployCreate2(ownerBytecode,randomSalt, {gasPrice});

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
