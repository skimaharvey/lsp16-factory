import {ethers } from 'hardhat';


(async function() {

    try {
        const erc20TokenAddress = '0x8A7aCf6e006B4Ce499Eb95C9c109C5Baa59585cB';
        const erc20Contract = await ethers.getContractAt('MyToken', erc20TokenAddress);
        const gasPrice = await ethers.provider.getGasPrice();
        const tx = await erc20Contract.transfer('0x7975Bc26b6be137Af7417e8977C7966D731c88fD', ethers.utils.parseEther('100'), {gasPrice})

    } catch (error) {
        console.error('Error:', error);
    }
})();
