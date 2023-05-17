const ethers = require('ethers');

async function getLogs() {
    const provider = new ethers.providers.JsonRpcProvider('https://rpc.testnet.lukso.network');

    const getBlockNumber = await provider.getBlockNumber();
    const startBlockNumber = getBlockNumber - 1000;
    const blockNumberToHexString = ethers.utils.hexValue(getBlockNumber);

    const blockNumberStartToHexString = ethers.utils.hexValue(startBlockNumber);

    console.log(typeof(blockNumberToHexString));

    const params = {
        fromBlock: blockNumberStartToHexString,  // Hexadecimal string for block number. Replace with your values.
        toBlock: blockNumberToHexString,
        address: '0xfB10A65e5f0402b8e9D4Ca84D0F367F0779Cc67F',  // Replace with your contract address.
        topics: []  // Array of topics. Fill with your values.
    };

    const logs = await provider.send('eth_getLogs', [params]);

    console.log(logs);
}

getLogs().catch(console.error);
