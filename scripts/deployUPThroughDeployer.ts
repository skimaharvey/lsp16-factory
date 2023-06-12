import { ethers } from "hardhat";

const UP_DEPLOYER_ADDRESS = "0xC100520c25c6c51a98EFc0FB5c6553fa92D3FfdB"

async function main() {

  const UPDeployerContract = await ethers.getContractAt("UniversalProfileDeployer", UP_DEPLOYER_ADDRESS);

  const UniversalProfile = await ethers.getContractFactory("UniversalProfile");
  const universalProfileBytecode = UniversalProfile.bytecode;

  const KeyManager = await ethers.getContractFactory("LSP6KeyManager");
  const keyManagerBytecode = KeyManager.bytecode;

  const universalProfileSalt = ethers.utils.randomBytes(32);
  const keyManagerSalt = ethers.utils.randomBytes(32);

  const [signerWithAllPermissions] = await ethers.getSigners();
  console.log('signerWithAllPermissions', signerWithAllPermissions.address)

  const estimateGas = await UPDeployerContract.estimateGas.deployUPAndKeyManager(universalProfileBytecode, keyManagerBytecode, signerWithAllPermissions.address, universalProfileSalt, keyManagerSalt);
  console.log('estimateGas', estimateGas.toString())

  const [universalProfile, keyManager] = await UPDeployerContract.callStatic.deployUPAndKeyManager(universalProfileBytecode, keyManagerBytecode, signerWithAllPermissions.address, universalProfileSalt, keyManagerSalt, {gasPrice: (await ethers.provider.getGasPrice()).add(ethers.utils.parseUnits("1", "gwei"))});
  console.log('universalProfile address', universalProfile)
  console.log('keyManager address', keyManager)

  const tx = await UPDeployerContract.deployUPAndKeyManager(universalProfileBytecode, keyManagerBytecode, signerWithAllPermissions.address, universalProfileSalt, keyManagerSalt, {gasPrice: (await ethers.provider.getGasPrice()).add(ethers.utils.parseUnits("1", "gwei"))});
  await tx.wait();
  console.log('tx', tx);

}




main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
