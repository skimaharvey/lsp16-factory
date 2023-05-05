// Sources flattened with hardhat v2.14.0 https://hardhat.org

// File contracts/RevertContract.sol

// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.4;

/**
 * @title Owner
 * @dev Set & change owner
 */
contract RevertContract {

   error CustomError(string message);


    function revertHere() external pure {
        revert("This is a revert message");
    }

    function requireOver1(uint256 _value) external pure {
        require(_value > 1, "Value must be over 1");
    }

    function revertCustomError() external pure {
      revert CustomError("This is a custom error message");
    }

}
