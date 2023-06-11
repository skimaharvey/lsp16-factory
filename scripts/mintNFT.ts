import {ethers } from 'hardhat';


(async function() {

    try {
        const nftContractAddress = '0x9006dd915576ff0F44034Fe3D09fd4825dB5b6CB';
        const erc20Contract = await ethers.getContractAt('MyNFT', nftContractAddress);
        const gasPrice = await ethers.provider.getGasPrice();
        const tx = await erc20Contract.safeMint('0x4FAea6Ed258f979DfeF9e77F1dE41f3E916908f5', {gasPrice})

        await tx.wait();

    } catch (error) {
        console.error('Error:', error);
    }
})();
