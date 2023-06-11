import {ethers } from 'hardhat';


(async function() {

    try {
        const erc20TokenAddress = '0xD5F39656f163F11385f3352b2e9e1540c4DB664d';
        const erc20Contract = await ethers.getContractAt('MyToken', erc20TokenAddress);
        const gasPrice = await ethers.provider.getGasPrice();
        const tx = await erc20Contract.mint('0x4FAea6Ed258f979DfeF9e77F1dE41f3E916908f5', ethers.utils.parseEther('1000'), {gasPrice})

        await tx.wait();

    } catch (error) {
        console.error('Error:', error);
    }
})();
