// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import { UniversalProfile } from '@lukso/lsp-smart-contracts/contracts/UniversalProfile.sol';

contract FirstOwnerDelegator is UniversalProfile {

  address private _keyManager;
  address thisContract = address(this);

  constructor() UniversalProfile(address(0)) {

  }

  function _executeCall(address, uint256, bytes memory) internal pure override returns (bytes memory) {
    revert("FirstOwnerDelegator: selfdestruct is not allowed");
  }


  function giveOwnershipToKeyManager(bytes32[] memory keys_, bytes[] memory values_) external {
    if(thisContract == address(this)) {
      revert("FirstOwnerDelegator: only delegate calls are allowed");
    }

    _setOwner(_keyManager);
    for (uint256 i = 0; i < keys_.length; i++) {
      _setData(keys_[i], values_[i]);
    }
  }


  function setUpUniversalProfile(bytes calldata initializationBytes) public {
    bytes memory datas = initializationBytes[0: initializationBytes.length - 40];
    address universalProfile = address(bytes20(initializationBytes[initializationBytes.length - 40: initializationBytes.length - 20]));
    address keyManager = address(bytes20(initializationBytes[initializationBytes.length - 20: initializationBytes.length]));
    _keyManager = keyManager;

    (bool success,) = universalProfile.call(abi.encodeWithSignature("execute(uint256,address,uint256,bytes)",4, address(this),0,datas));
    require(success, "FirstOwnerDelegator: execute call failed");
  }


}
