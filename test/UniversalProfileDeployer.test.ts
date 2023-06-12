import { ethers } from "hardhat";
import { expect } from "chai";
import { bytecode } from '../artifacts/@lukso/lsp-smart-contracts/contracts/UniversalProfile.sol/UniversalProfile.json'

describe("UniversalProfileDeployer", function () {
  it("Should deploy a UniversalProfile", async function () {
    const UniversalProfileDeployer = await ethers.getContractFactory("UniversalProfileDeployer");
    const universalProfileDeployer = await UniversalProfileDeployer.deploy();
    await universalProfileDeployer.deployed();

    const UniversalProfile = await ethers.getContractFactory("UniversalProfile");
    const universalProfileBytecode = UniversalProfile.bytecode;

    const KeyManager = await ethers.getContractFactory("LSP6KeyManager");
    const keyManagerBytecode = KeyManager.bytecode;

    const generateTwelveBytesSalt = ethers.utils.randomBytes(12);
    const generateThirtyTwoBytesSalt = ethers.utils.randomBytes(32);

    const [signerWithAllPermissions] = await ethers.getSigners();
    const [universalProfile, keyManager] = await universalProfileDeployer.callStatic.deployUPAndKeyManager(universalProfileBytecode, keyManagerBytecode, signerWithAllPermissions.address, generateTwelveBytesSalt, generateThirtyTwoBytesSalt);

    await universalProfileDeployer.deployUPAndKeyManager(universalProfileBytecode, keyManagerBytecode, signerWithAllPermissions.address, generateTwelveBytesSalt, generateThirtyTwoBytesSalt);

    const universalProfileContract = UniversalProfile.attach(universalProfile);
    const keyManagerContract = KeyManager.attach(keyManager);

    expect(await universalProfileContract.owner()).to.equal(keyManager);

  });
});
