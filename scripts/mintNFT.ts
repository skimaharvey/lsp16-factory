import {ethers } from 'hardhat';


(async function() {

    try {
        const nftContractAddress = '0xfB10A65e5f0402b8e9D4Ca84D0F367F0779Cc67F';
        const erc20Contract = await ethers.getContractAt('MyNFT', nftContractAddress);
        const gasPrice = await ethers.provider.getGasPrice();
        const tx = await erc20Contract.safeMint('0x0eCC079C20DaA9fDE0e26b6d745c0b38479ff200', {gasPrice})

        await tx.wait();

    } catch (error) {
        console.error('Error:', error);
    }
})();
