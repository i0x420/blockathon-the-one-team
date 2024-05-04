// SPDX-License-Identifier: SEE LICENSE IN LICENSE

pragma solidity 0.8.19;

import "./interfaces/IFeeManager.sol";
import "./libraries/Ownable.sol";

contract FeeManager is Ownable, IFeeManager {
    mapping(bytes32 => uint256) _serviceFee;

    address private _feeReceiver;

    constructor(address feeReceiver) Ownable(msg.sender) {
        _feeReceiver = feeReceiver;
    }

    function configService(
        bytes32 serviceName,
        uint256 serviceFee
    ) external onlyOwner {
        _serviceFee[serviceName] = serviceFee;
    }

    function getServiceFee(
        bytes32 serviceName
    ) external view returns (uint256, address) {
        return (_serviceFee[serviceName], address(this));
    }

    function getFeeReceiverAddress() external view override returns (address) {
        return _feeReceiver;
    }
}
