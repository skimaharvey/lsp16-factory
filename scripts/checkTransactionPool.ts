import {ethers} from 'ethers';



const provider = new ethers.providers.JsonRpcProvider('https://rpc.execution.testnet.lukso.io');


(async function() {
  try {
    const txPoolContent = await provider.send('txpool_content', []);
    console.log('Transaction Pool Content:', JSON.stringify(txPoolContent, null, 2));
  } catch (error) {
    console.error('Error fetching transaction pool content:', error.message);
  }
})();
