// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.19;

/**
 * @dev Create admin role
 * @author Endale
 *
 * setup new admin role and modifier for restrict caller is admin
 */
abstract contract AccessControl {
    mapping(address => bool) _admins;
    mapping(address => bool) _controllers;
    mapping(address => bool) _partners;

    event SetAdmin(address admin, bool isActive);

    constructor() {
        _setAdmin(msg.sender, true);
    }

    /**
     * @dev View function check address is admin
     * @param admin: address
     */
    function isActiveAdmin(address admin) public view returns (bool) {
        return _admins[admin];
    }

    /**
     * @dev Modifier restrict msg.sender is admin
     */
    modifier onlyAdmin() {
        require(
            isActiveAdmin(msg.sender),
            "Access Control: caller is not the admin"
        );
        _;
    }

    /**
     * @dev Virtual function for update admin status
     */
    function setAdmin(address admin, bool isActive) external virtual;

    /**
     * @dev Internal function for update admin status
     */
    function _setAdmin(address admin, bool isActive) internal {
        _admins[admin] = isActive;
    }
}
