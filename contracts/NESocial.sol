// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.19;

import "./interfaces/IFeeManager.sol";
import "./interfaces/IVRC25.sol";
import "./interfaces/IERC721.sol";

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
    mapping(address => bool) _isActiveCommunity;

    event BoostedView(address, bytes32);
    event PostProtected(address, bytes32);
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

        _isActiveCommunity[address(newCollection)] = true;

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

        _isActiveCommunity[communityPFPCollection] = true;

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

    function deactiveCommunityChanel(address community) external onlyAdmin {
        _isActiveCommunity[community] = false;
    }

    function boostView(address community, bytes32 postId) external {
        (uint256 serviceFee, address feeToken) = _feeManager.getServiceFee(
            keccak256("boostView")
        );

        _takeFee(feeToken, serviceFee);

        emit BoostedView(community, postId);
    }

    function protectPost(address community, bytes32 postId) external {
        (uint256 serviceFee, address feeToken) = _feeManager.getServiceFee(
            keccak256("protectPost")
        );

        _takeFee(feeToken, serviceFee);

        emit PostProtected(community, postId);
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

    function isActiveCommunity(address community) external view returns (bool) {
        return _isActiveCommunity[community];
    }

    function getCommunities() external view returns (address[] memory) {
        return _communities;
    }

    function getData() external pure returns (bytes32, bytes32) {
        return (keccak256("protectPost"), keccak256("boostView"));
    }
}
