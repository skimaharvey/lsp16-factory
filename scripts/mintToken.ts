import {ethers } from 'hardhat';


(async function() {

    try {
        const erc20TokenAddress = '0x8A7aCf6e006B4Ce499Eb95C9c109C5Baa59585cB';
        const erc20Contract = await ethers.getContractAt('MyToken', erc20TokenAddress);
        const gasPrice = await ethers.provider.getGasPrice();
        const tx = await erc20Contract.mint('0x0eCC079C20DaA9fDE0e26b6d745c0b38479ff200', ethers.utils.parseEther('1000'), {gasPrice})

        await tx.wait();

    } catch (error) {
        console.error('Error:', error);
    }
})();
