import { ethers } from "hardhat";


const KEY_MANAGER_ADDRESS = "0xc8951DA73CE9451D0BD8eBB6537364630F8b2985"

async function main() {
  const keyManager = await ethers.getContractAt("LSP6KeyManager", KEY_MANAGER_ADDRESS)

  const [Signer] = await ethers.getSigners();
  console.log('Signer', Signer.address)

  const UniversalProfile = await ethers.getContractFactory("UniversalProfile");
  const acceptOwnershipBytecode = UniversalProfile.interface.encodeFunctionData('acceptOwnership');
  const tx = await keyManager.execute(acceptOwnershipBytecode, {gasPrice: await ethers.provider.getGasPrice()});
  await tx.wait();

}



main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
