// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.19;

import "./interfaces/IFeeManager.sol";
import "./interfaces/IVRC25.sol";

import "./libraries/Ownable.sol";
import "./libraries/Clones.sol";
import "./libraries/SafeVRC25.sol";

import "./libraries/ERC721.sol";

import "./libraries/ProxyFactory.sol";

import "./libraries/AccessControl.sol";

contract NESocial is Ownable, ProxyFactory, AccessControl {
    using SafeVRC25 for IVRC25;

    IFeeManager private _feeManager;

    address[] private _communities;
    mapping(address => bool) isActiveCommunity;

    event PostCreated(address, bytes32);

    event NewCommunity(address);

    constructor(address feeManager) Ownable(msg.sender) {
        _feeManager = IFeeManager(feeManager);
    }

    function createCommunityChanel(
        bytes32 salt,
        bytes memory callData
    ) public onlyOwner {
        (uint256 serviceFee, address feeToken) = _feeManager.getServiceFee(
            keccak256("createCommunityChanel")
        );
        _takeFee(feeToken, serviceFee);
        address newCollection = Clones.cloneDeterministic(getImplement(), salt);
        (bool success, ) = address(newCollection).call(callData);
        require(success, "Fail to init collection");

        _communities.push(address(newCollection));

        isActiveCommunity[address(newCollection)] = true;

        emit NewCommunity(address(newCollection));
    }

    function registerCommunityChanel(
        address communityPFPCollection
    ) public onlyOwner {
        (uint256 serviceFee, address feeToken) = _feeManager.getServiceFee(
            keccak256("registerCommunityChanel")
        );
        _takeFee(feeToken, serviceFee);

        require(
            IERC165(communityPFPCollection).supportsInterface(
                type(IERC721).interfaceId
            ),
            "Invalid ERC721"
        );
        _communities.push(communityPFPCollection);

        isActiveCommunity[communityPFPCollection] = true;

        emit NewCommunity(communityPFPCollection);
    }

    /**
     * @dev Internal function to transfer protocol fees to the fee receiver address.
     * @param paymentToken The address of the token used for payment.
     * @param amount The amount of tokens to be transferred as fees.
     */
    function _takeFee(address paymentToken, uint256 amount) internal {
        address feeAddress = _feeManager.getFeeReceiverAddress();
        if (amount > 0) {
            if (paymentToken == address(0)) {
                require(msg.value >= amount, "Insufficient amount");
                (bool sent, ) = payable(feeAddress).call{value: amount}("");
                require(sent, "Fail to send protocol fee");
            } else {
                IVRC25 token = IVRC25(paymentToken);
                token.safeTransferFrom(_msgSender(), feeAddress, amount);
            }
        }
    }

    function deactiveCommunity(address community) external onlyAdmin {
        isActiveCommunity[community] = false;
    }

    function createPost(address community, bytes32 postId) external onlyAdmin {
        (uint256 serviceFee, address feeToken) = _feeManager.getServiceFee(
            keccak256("createPost")
        );
        _takeFee(feeToken, serviceFee);

        emit PostCreated(community, postId);
    }

    function getFee(bytes32 service) external view returns (uint256) {
        (uint256 serviceFee, ) = _feeManager.getServiceFee(service);
        return serviceFee;
    }

    function setImplement(
        address implement
    ) external virtual override onlyOwner {
        _setImplement(implement);
    }

    function setAdmin(address admin, bool isActive) external virtual override {
        _setAdmin(admin, isActive);
    }
}
