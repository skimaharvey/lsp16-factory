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
  it('cheap version', async function () {
    const UniversalProfileDeployer = await ethers.getContractFactory("UniversalProfileDeployer");
    const universalProfileDeployer = await UniversalProfileDeployer.deploy();
    const UP_DEPLOYER_ADDRESS = universalProfileDeployer.address;
    await universalProfileDeployer.deployed();


    const UPDeployerContract = await ethers.getContractAt("UniversalProfileDeployer", UP_DEPLOYER_ADDRESS);

    const UniversalProfile = await ethers.getContractFactory("UniversalProfile");

    const universalProfileBytecode = UniversalProfile.bytecode + '0x95b9c15517fC36324c8ba45406a5767494d6df7e'.slice(2);

    const saltForUP = ethers.utils.hexlify(ethers.utils.randomBytes(32));
    console.log('saltForUP', saltForUP)
    const saltForKeyManager = ethers.utils.hexlify(ethers.utils.randomBytes(32));
    console.log('saltForKeyManager', saltForKeyManager)

    const KeyManager = await ethers.getContractFactory("LSP6KeyManager");
    const UPByteCodeHash = ethers.utils.keccak256(UniversalProfile.bytecode);
    const futureUPAddress =  await UPDeployerContract.callStatic.calculateAddress(UPByteCodeHash, saltForUP)
    console.log('futureUPAddress', futureUPAddress)
    const keyManagerBytecode = KeyManager.bytecode + futureUPAddress.slice(2);

    const [signerWithAllPermissions] = await ethers.getSigners();
    console.log('signerWithAllPermissions', signerWithAllPermissions.address)

    // const estimateGas = await UPDeployerContract.estimateGas.deployUPAndKeyManagerCheaper(universalProfileBytecode, keyManagerBytecode, signerWithAllPermissions.address, saltForUP, saltForKeyManager);
    // console.log('estimateGas', estimateGas.toString())

    // const [universalProfile, keyManager] = await UPDeployerContract.callStatic.deployUPAndKeyManagerCheaper(universalProfileBytecode, keyManagerBytecode, signerWithAllPermissions.address,saltForUP, saltForKeyManager, {gasPrice: (await ethers.provider.getGasPrice()).add(ethers.utils.parseUnits("1", "gwei"))});
    // console.log('universalProfile address', universalProfile)
    // console.log('keyManager address', keyManager)

    const tx = await UPDeployerContract.deployUPAndKeyManagerCheaper(universalProfileBytecode, keyManagerBytecode, signerWithAllPermissions.address, saltForUP, saltForKeyManager, {gasPrice: (await ethers.provider.getGasPrice()).add(ethers.utils.parseUnits("1", "gwei"))});
    await tx.wait();
    console.log('tx', tx);
  })
});
