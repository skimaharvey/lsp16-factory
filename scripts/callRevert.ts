import {ethers } from 'hardhat';







(async function() {

    try {
        const revertContractAddress = '0xd4A8623c881B183Fc49f3F766aB0a41B2a141929';
        const revertContract = await ethers.getContractAt('RevertContract', revertContractAddress);
        await revertContract.revertHere({gasPrice: await ethers.provider.getGasPrice()});

    } catch (error) {
        console.error('Error:', error);
    }
})();
