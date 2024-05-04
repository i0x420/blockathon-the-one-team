// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import "./libraries/VRC25.sol";

contract MainToken is VRC25 {
    constructor(uint256 initialSupply) VRC25("Token A", "TA", 18, msg.sender) {
        _mint(msg.sender, initialSupply);
    }

    function _estimateFee(uint256) internal view override returns (uint256) {
        return minFee();
    }

    function mint(uint256 amount) external {
        _mint(msg.sender, amount);
    }
}
