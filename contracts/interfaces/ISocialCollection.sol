// SPDX-License-Identifier: SEE LICENSE IN LICENSE

pragma solidity 0.8.19;
import "./IVRC725.sol";

interface ISocialCollection is IVRC725 {
    /**
     * @dev Function to mint a new token.
     * @param to Address to which the new token will be minted.
     */
    function mint(uint256 tokenId, address to) external;
}
