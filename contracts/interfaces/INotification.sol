// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.19;

interface INotification {
    function isInitCommunity(bytes32 communityKey) external view returns (bool);

    function registerCommunity(
        bytes32 communityKey,
        address[] memory initAdmins,
        address[] memory initMembers
    ) external;

    function pushNoti(
        bytes32 community,
        bytes memory action,
        address from,
        address to,
        bytes memory data
    ) external;

    function setMember(
        bytes32 community,
        address member,
        bool isActive
    ) external;
}
