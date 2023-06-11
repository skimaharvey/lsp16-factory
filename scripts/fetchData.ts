import { ethers } from "hardhat";


const UPAddress = '0xEE0Ee0668933A86BC42b80331dc6eF39D1Ed9414'
const KEY_DATA_PREFIX = '0x4b80742de2bf82acb3630000'
const UP_DEPLOYER = '0x0eCC079C20DaA9fDE0e26b6d745c0b38479ff200'

async function main() {
  const [signerWithAllPermissions] = await ethers.getSigners();
  console.log('signerWithAllPermissions', signerWithAllPermissions.address)

  const UPContract = await ethers.getContractAt("UniversalProfile", UPAddress);
  const bytes = await UPContract.callStatic.getData(KEY_DATA_PREFIX + UP_DEPLOYER.slice(2));
  console.log('bytes', bytes)


}



main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
