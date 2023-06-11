
import { ethers } from "hardhat";
const KEY_MANAGER_ADDRESS = '0xcA5B1657C30D52D75Cf52a70dcf1b87B8a57a36E'

async function main() {

  const keyManager = await ethers.getContractAt("LSP6KeyManager", KEY_MANAGER_ADDRESS);

  const target = await keyManager.callStatic.target();

  console.log('target', target)

}




main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
