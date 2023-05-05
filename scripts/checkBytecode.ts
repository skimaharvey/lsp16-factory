import {ethers } from 'hardhat';







(async function() {

    try {
        const addressToCheckBytecodeFor = '0x3b7235344F490dff8A4491cF7294774b4cC337f4';
        const bytecode = await ethers.provider.getCode(addressToCheckBytecodeFor);
        console.log('Bytecode:', bytecode);
    } catch (error) {
        console.error('Error:', error);
    }
})();
