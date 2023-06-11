import { ethers } from "hardhat";
import {bytecode as upBytecode} from '../artifacts/@lukso/lsp-smart-contracts/contracts/UniversalProfile.sol/UniversalProfile.json'
import {bytecode as keyManagerBytecode} from '../artifacts/@lukso/lsp-smart-contracts/contracts/LSP6KeyManager/LSP6KeyManager.sol/LSP6KeyManager.json'

const UP_DEPLOYER_ADDRESS = "0xbcfb13485782cf6631157e6a05B56982fe076f39"

async function main() {

  const UPDeployerContract = await ethers.getContractAt("UniversalProfileDeployer", UP_DEPLOYER_ADDRESS);

  const UniversalProfile = await ethers.getContractFactory("UniversalProfile");
  const universalProfileBytecode = upBytecode

  const KeyManager = await ethers.getContractFactory("LSP6KeyManager");
  // const keyManagerBytecode = KeyManager.bytecode;

  const generateTwelveBytesSalt = ethers.utils.randomBytes(12);
  const generateThirtyTwoBytesSalt = ethers.utils.randomBytes(32);

  const [signerWithAllPermissions] = await ethers.getSigners();
  console.log('signerWithAllPermissions', signerWithAllPermissions.address)

  // const estimateGas = await UPDeployerContract.estimateGas.deployUPAndKeyManager(universalProfileBytecode, keyManagerBytecode, signerWithAllPermissions.address, generateTwelveBytesSalt, generateThirtyTwoBytesSalt);
  // console.log('estimateGas', estimateGas.toString())

  const [universalProfile, keyManager] = await UPDeployerContract.callStatic.deployUPAndKeyManager(universalProfileBytecode, keyManagerBytecode, signerWithAllPermissions.address, generateTwelveBytesSalt, generateThirtyTwoBytesSalt, {gasPrice: (await ethers.provider.getGasPrice()).add(ethers.utils.parseUnits("1", "gwei"))});
  console.log('universalProfile address', universalProfile)
  console.log('keyManager address', keyManager)

  const tx = await UPDeployerContract.deployUPAndKeyManager(universalProfileBytecode, keyManagerBytecode, signerWithAllPermissions.address, generateTwelveBytesSalt, generateThirtyTwoBytesSalt, {gasPrice: (await ethers.provider.getGasPrice()).add(ethers.utils.parseUnits("1", "gwei"))});
  await tx.wait();
  console.log('tx', tx);

}




main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
