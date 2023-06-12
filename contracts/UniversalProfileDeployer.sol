// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {_LSP6KEY_ADDRESSPERMISSIONS_PERMISSIONS_PREFIX, _PERMISSION_CHANGEOWNER, _PERMISSION_EDITPERMISSIONS, ALL_REGULAR_PERMISSIONS} from "@lukso/lsp-smart-contracts/contracts/LSP6KeyManager/LSP6Constants.sol";
import {LSP6Utils} from '@lukso/lsp-smart-contracts/contracts/LSP6KeyManager/LSP6Utils.sol';
import {Create2} from "@openzeppelin/contracts/utils/Create2.sol";
import {ILSP14Ownable2Step} from '@lukso/lsp-smart-contracts/contracts/LSP14Ownable2Step/ILSP14Ownable2Step.sol';



contract UniversalProfileDeployer {

    function deployUPAndKeyManager(bytes calldata universalProfileByteCode,  bytes calldata keyManagerByteCode, address allPermissionsAddress, bytes32 universalProfleProvidedSalt, bytes32 keyManagerProvidedSalt)
        public
        payable
        virtual
        returns (address universalProfile, address keyManager)
    {   // generate salt for the UP contract
        bytes32 universalProfileGeneratedSalt = keccak256(abi.encodePacked(allPermissionsAddress, keyManagerByteCode, universalProfleProvidedSalt));

        // deploy UP contract
        universalProfile = Create2.deploy(msg.value, universalProfileGeneratedSalt, abi.encodePacked(universalProfileByteCode,abi.encode(address(this))));

        // deploy keyManager contract
        keyManager = Create2.deploy(0, keyManagerProvidedSalt, abi.encodePacked(keyManagerByteCode,abi.encode(universalProfile)));

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
        (bool success, ) = universalProfile.call(abi.encodeWithSignature("setDataBatch(bytes32[],bytes[])", keys, values));
        require(success, "setDataBatch failed");

        // transferOwnership on UP contract
        (bool successTransfer, ) = universalProfile.call(abi.encodeWithSignature("transferOwnership(address)", keyManager));
        require(successTransfer, "transferOwnership failed");

        // acceptOwnership on keyManager contract
        bytes memory acceptOwnershipBytes = abi.encodeWithSignature("acceptOwnership()");
        (bool successAccept,) = keyManager.call(abi.encodeWithSignature("execute(bytes)", acceptOwnershipBytes));
        require(successAccept, "acceptOwnership failed");

        // setData on keyManager contract
        bytes memory setDataBytes = abi.encodeWithSignature("setData(bytes32,bytes)", deloyerKey, "");
        (bool successSetData,) = keyManager.call(abi.encodeWithSignature("execute(bytes)", setDataBytes));
        require(successSetData, "setData failed");
    }

}
