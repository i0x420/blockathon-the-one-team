// SPDX-License-Identifier: SEE LICENSE IN LICENSE

pragma solidity 0.8.19;

import "../interfaces/INotification.sol";
import {BaseContract} from "../core/BaseChanel.sol";

abstract contract NotificationHelper is BaseContract {
    INotification private NotifyMachine;

    function __Broadcaster_init(address notify) internal {
        NotifyMachine = INotification(notify);
    }

    /**
     * @dev Setup project key for broadcaster
     */
    function projectKey() public pure returns (bytes32) {
        return keccak256(abi.encodePacked(PROJECT_NAME, PROJECT_VERSION));
    }

    /**
     * @dev Emit event
     */
    function _emitEvent(
        bytes memory action,
        address from,
        address to,
        bytes memory data
    ) internal {
        NotifyMachine.pushNoti(projectKey(), action, from, to, data);
    }

    function _setMember(address member, bool isActive) internal {
        NotifyMachine.setMember(projectKey(), member, isActive);
    }
}
