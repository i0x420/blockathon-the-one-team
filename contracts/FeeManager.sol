// SPDX-License-Identifier: SEE LICENSE IN LICENSE

pragma solidity 0.8.19;

import "./interfaces/IFeeManager.sol";
import "./libraries/Ownable.sol";

contract FeeManager is Ownable, IFeeManager {
    mapping(bytes32 => mapping(address => uint256)) private _serviceFee;
    mapping(bytes32 => address) private _mainPayment;

    address private _feeReceiver;

    constructor(address feeReceiver) Ownable(msg.sender) {
        _feeReceiver = feeReceiver;
    }

    function configService(
        bytes32 serviceName,
        address serviceToken,
        uint256 serviceFee
    ) external onlyOwner {
        require(serviceToken != address(0), "Unsupported token");
        _serviceFee[serviceName][serviceToken] = serviceFee;
        _mainPayment[serviceName] = serviceToken;
    }

    function getServiceFee(
        bytes32 serviceName
    ) external view returns (uint256, address) {
        return (
            _serviceFee[serviceName][_mainPayment[serviceName]],
            _mainPayment[serviceName]
        );
    }

    function getFeeReceiverAddress() external view override returns (address) {
        return _feeReceiver;
    }
}
