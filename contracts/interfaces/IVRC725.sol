// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.19;

import {IERC4494} from "./IERC4494.sol";
import {IERC721} from "./IERC721.sol";
import {IERC721Metadata} from "./IERC721Metadata.sol";

interface IVRC725 is IERC721, IERC4494, IERC721Metadata {
    function permitForAll(
        address owner,
        address spender,
        uint256 deadline,
        bytes memory signature
    ) external;

    function nonceByAddress(address owner) external view returns (uint256);
}
