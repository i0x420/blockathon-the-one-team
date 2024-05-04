// SPDX-License-Identifier: SEE LICENSE IN LICENSE

pragma solidity 0.8.19;

import "./extensions/VRC725Enumerable.sol";
import "./interfaces/ISocialCollection.sol";
import "./libraries/Initializable.sol";

contract SocialCollection is
    VRC725Enumerable,
    ISocialCollection,
    Initializable
{
    function __init_collection(
        string memory name,
        string memory symbol,
        address issuer
    ) public initializer {
        __VRC725_init(name, symbol, issuer);
    }

    /**
     * @dev Function to mint a new token.
     * @param to Address to which the new token will be minted.
     */
    function mint(uint256 tokenId, address to) external override onlyOwner {
        _safeMint(to, tokenId);
    }
}
