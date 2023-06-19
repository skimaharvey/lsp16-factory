
import { ethers } from "hardhat";
import { bytecode as universalProfileByteCode } from '../artifacts/@lukso/lsp-smart-contracts/contracts/UniversalProfile.sol/UniversalProfile.json'
import {bytecode as ownerBytecode } from '../artifacts/@lukso/lsp-smart-contracts/contracts/LSP6KeyManager/LSP6KeyManager.sol/LSP6KeyManager.json'

const UP_AND_OWNER_DEPLOYER_ADDRESS =  '0x37d586a523B8953c37ffA019e8748CDcb416bBd3'
const ALL_PERMISSIONS_SIGNER = '0x0eCC079C20DaA9fDE0e26b6d745c0b38479ff200'
const UNIVERSAL_PROFILE_FIRST_OWNER_ADDRESS = '0x50b1950b351F8422fdEA736Bf262164B618E69eF'



const UNIVERSAL_PROFILE_DEPLOYMENT = {
  value: 0,
  salt: ethers.utils.keccak256(ethers.utils.toUtf8Bytes('universalprofile')),
  byteCode: universalProfileByteCode
}

const OWNER_DEPLOYMENT = {
  value: 0,
  salt: ethers.utils.keccak256(ethers.utils.toUtf8Bytes('owner')),
  byteCode: ownerBytecode,
  appendUniversalProfileAddress: true,
  extraConstructorParams: '0x'
}


async function main() {
  const universalprofileDeployer = await ethers.getContractAt('UniversalProfileAndOwnerDeployer', UP_AND_OWNER_DEPLOYER_ADDRESS)

  const [universalprofile, owner] = await universalprofileDeployer.callStatic.deployUniversalProfileAndOwner(
    UNIVERSAL_PROFILE_DEPLOYMENT,
    OWNER_DEPLOYMENT,
    UNIVERSAL_PROFILE_FIRST_OWNER_ADDRESS,
    ALL_PERMISSIONS_SIGNER
    )
  console.log('universalprofile', universalprofile);
  console.log('owner', owner);

  const tx = await universalprofileDeployer.deployUniversalProfileAndOwner(
    UNIVERSAL_PROFILE_DEPLOYMENT,
    OWNER_DEPLOYMENT,
    UNIVERSAL_PROFILE_FIRST_OWNER_ADDRESS,
    ALL_PERMISSIONS_SIGNER,
    {gasPrice: (await ethers.provider.getGasPrice()).add(ethers.utils.parseUnits('1', 'gwei'))}
    )

  await tx.wait()
  console.log('tx hash', tx.hash);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
