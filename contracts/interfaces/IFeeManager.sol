// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.19;

interface IFeeManager {
    function getServiceFee(
        bytes32 serviceName
    ) external view returns (uint256, address);

    function getFeeReceiverAddress() external view returns (address);
}
