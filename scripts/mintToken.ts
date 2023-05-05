import {ethers } from 'hardhat';







(async function() {

    try {
        const erc20TokenAddress = '0x7B5C5158E5AAe4244873Dd75a81E9bbBc4d0fc38';
        const erc20Contract = await ethers.getContractAt('MyToken', erc20TokenAddress);
        const gasPrice = await ethers.provider.getGasPrice();
        const tx = await erc20Contract.mint('0x0eCC079C20DaA9fDE0e26b6d745c0b38479ff200', ethers.utils.parseEther('1000'), {gasPrice})

    } catch (error) {
        console.error('Error:', error);
    }
})();
