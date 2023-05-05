import {ethers} from 'ethers';

const provider = new ethers.providers.JsonRpcProvider('https://rpc.testnet.lukso.network');

const privateKey = '0xbbc6703446945a0d6e1d40d50664da1c37bf51a1383ce165af96ccaa62c8f56e';
const wallet = new ethers.Wallet(privateKey, provider);
const walletAddress = wallet.address;

console.log('Wallet address:', walletAddress);


const recipientAddress = '0xeC21Ad25A3fB6483930C2e7BC7E8a48338B3a2BB';
const amountToSend = ethers.utils.parseEther('0.1');



(async function() {
    console.log('nonce:', await provider.getTransactionCount(walletAddress));
    const transaction = {
      to: recipientAddress,
      value: amountToSend,
      gasLimit: 50000,
      gasPrice: ethers.utils.parseUnits('4.5', 'gwei'),
      chainId: 4201, // will fail if network is not pre-eip155 enabled
      nonce: await provider.getTransactionCount(walletAddress),
  };

    const balance = await provider.getBalance(walletAddress);
    console.log('Balance:', ethers.utils.formatEther(balance));
    try {
        const signedTransaction = await wallet.signTransaction(transaction);
        const transactionResponse = await provider.sendTransaction(signedTransaction);
        console.log('Transaction hash:', transactionResponse.hash);
    } catch (error) {
        console.error('Error:', error);
    }
})();
