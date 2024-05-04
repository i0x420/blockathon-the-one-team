// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.19;

// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";

import "./VRC725.sol";

contract ERC721 is VRC725 {
    constructor(string memory name, string memory symbol, address issuer) {
        __VRC725_init(name, symbol, issuer);
    }
}
