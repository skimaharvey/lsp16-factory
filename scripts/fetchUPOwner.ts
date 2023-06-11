


const UPAddress = '0xEE0Ee0668933A86BC42b80331dc6eF39D1Ed9414'

async function main() {

  const UPContract = await ethers.getContractAt("UniversalProfile", UPAddress);

  const owner = await UPContract.callStatic.owner();

  const pendingOwner = await UPContract.callStatic.pendingOwner();

  console.log('owner', owner)
  console.log('pendingOwner', pendingOwner)

}




main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
