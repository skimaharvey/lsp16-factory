// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {_LSP6KEY_ADDRESSPERMISSIONS_PERMISSIONS_PREFIX, _PERMISSION_CHANGEOWNER, _PERMISSION_EDITPERMISSIONS, ALL_REGULAR_PERMISSIONS} from "@lukso/lsp-smart-contracts/contracts/LSP6KeyManager/LSP6Constants.sol";
import {LSP6Utils} from '@lukso/lsp-smart-contracts/contracts/LSP6KeyManager/LSP6Utils.sol';
import {Create2} from "@openzeppelin/contracts/utils/Create2.sol";
import {ILSP14Ownable2Step} from '@lukso/lsp-smart-contracts/contracts/LSP14Ownable2Step/ILSP14Ownable2Step.sol';



// 1st step: deploy the universal profile contract

// 2nd step: deploy the owner contract (the owner that will be set as the owner of the universal profile contract at the end of the deployment process)

// 3rd step: call firstOwner that will be in charge of making the necessary calls that could be needed to set up the universal profile contract
// in this case FirstOwner will be in charge of deploying UPs and KeyManagers and setting up the permissions (we could use delegatecall to do this)


contract UniversalProfileAndOwnerDeployer {

    struct UniversalProfileDeployment {
      uint256 value;
      bytes32 salt;
      bytes byteCode;
    }

    struct OwnerDeployment {
      uint256 value;
      bytes32 salt;
      bytes byteCode; // owner contract bytecode + constructor params to be appended to the constructor before the universal profile address
      bool appendUniversalProfileAddress; // will append the universal profile address to the constructor params if true + the extraConstructorParams
      bytes extraConstructorParams; // params to be appended to the constructor after the universal profile address
    }


    function deployUniversalProfileAndOwner(UniversalProfileDeployment calldata universalProfileDeployment, OwnerDeployment calldata ownerDeployment, address universalProfileFirstOwner, bytes calldata calldaToFirstOwner)
        public
        payable
        returns (address universalProfile, address owner )
    {
        if(msg.value < universalProfileDeployment.value + ownerDeployment.value ) {
            revert("UniversalProfileDeployer: insufficient funds");
        }

        bytes32 universalProfileGeneratedSalt = keccak256(abi.encode(universalProfileDeployment.salt,ownerDeployment,universalProfileFirstOwner, calldaToFirstOwner));

        universalProfile = Create2.deploy(universalProfileDeployment.value, universalProfileGeneratedSalt, abi.encodePacked(universalProfileDeployment.byteCode, abi.encode(universalProfileFirstOwner)));

        // if appendUniversalProfileAddress is true, the universal profile address + extraConstructorParams will be appended to the constructor params
        bytes memory ownerByteCode = ownerDeployment.appendUniversalProfileAddress ? abi.encodePacked(ownerDeployment.byteCode, abi.encode(universalProfile),ownerDeployment.extraConstructorParams) : ownerDeployment.byteCode;

        // here owner refers as the future owner of the UP at the end of the transaction
        owner = Create2.deploy(ownerDeployment.value, ownerDeployment.salt, ownerByteCode);

        uint256 totalValueSent = universalProfileDeployment.value + ownerDeployment.value ;

        (bool success,) = universalProfileFirstOwner.call{value: msg.value - totalValueSent}(abi.encodePacked(calldaToFirstOwner, abi.encodePacked(universalProfile, owner)));
        require(success, "UniversalProfileDeployer: first owner call failed");
    }

}

contract FirstOwner {

    function setUpUniversalProfile(bytes calldata initializationBytes) public {
        address allPermissionsAddress = address(bytes20(initializationBytes));
        address universalProfileAddress = address(bytes20(initializationBytes[20:40]));
        address keyManagerAddress = address(bytes20(initializationBytes[40:]));

        // calculate deployer permissions
        bytes32[] memory deployerPermissionsArray = new bytes32[](2);
        deployerPermissionsArray[0] = _PERMISSION_CHANGEOWNER;
        deployerPermissionsArray[1] = _PERMISSION_EDITPERMISSIONS;
        bytes32 deployerPermissions = LSP6Utils.combinePermissions(deployerPermissionsArray);

        // setDataBatch keys
        bytes32 deloyerKey = bytes32(abi.encodePacked(_LSP6KEY_ADDRESSPERMISSIONS_PERMISSIONS_PREFIX, bytes2(0), address(this)));
        bytes32 allPermissionsKey = bytes32(abi.encodePacked(_LSP6KEY_ADDRESSPERMISSIONS_PERMISSIONS_PREFIX, bytes2(0), allPermissionsAddress));
        bytes32[] memory keys = new bytes32[](2);
        keys[0] = deloyerKey;
        keys[1] = allPermissionsKey;

        // setDataBach values
        bytes[] memory values = new bytes[](2);
        values[0] = abi.encodePacked(deployerPermissions);
        values[1] = abi.encodePacked(ALL_REGULAR_PERMISSIONS);

        // setDataBatch on UP contract
        (bool success, ) = universalProfileAddress.call(abi.encodeWithSignature("setDataBatch(bytes32[],bytes[])", keys, values));
        require(success, "setDataBatch failed");

        // transferOwnership on UP contract
        (bool successTransfer, ) = universalProfileAddress.call(abi.encodeWithSignature("transferOwnership(address)", keyManagerAddress));
        require(successTransfer, "transferOwnership failed");

        // acceptOwnership on keyManager contract
        bytes memory acceptOwnershipBytes = abi.encodeWithSignature("acceptOwnership()");
        (bool successAccept,) = keyManagerAddress.call(abi.encodeWithSignature("execute(bytes)", acceptOwnershipBytes));
        require(successAccept, "acceptOwnership failed");

        // setData on keyManager contract
        bytes memory setDataBytes = abi.encodeWithSignature("setData(bytes32,bytes)", deloyerKey, "");
        (bool successSetData,) = keyManagerAddress.call(abi.encodeWithSignature("execute(bytes)", setDataBytes));
        require(successSetData, "setData failed");
    }
}
