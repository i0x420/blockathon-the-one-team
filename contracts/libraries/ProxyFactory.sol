// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.19;

import "./Clones.sol";

abstract contract ProxyFactory {
    address private _implement;

    event SetImplement(address implement);

    /**
     * @dev Internal function to update implement address
     */
    function _setImplement(address implement) internal {
        _implement = implement;
    }

    /**
     * @dev Internal function to create new instance from implement
     */
    function _cloneProxy(bytes32 salt) internal returns (address newInstance) {
        newInstance = Clones.cloneDeterministic(_implement, salt);
    }

    /**
     * @dev View function calculate an instance address
     */
    function getInstanceAddress(bytes32 salt) public view returns (address) {
        return Clones.predictDeterministicAddress(_implement, salt);
    }

    /**
     * @dev View function return implement address
     */
    function getImplement() public view returns (address) {
        return _implement;
    }

    /**
     * @dev Virtual function for update implement address
     */
    function setImplement(address implement) external virtual;
}
