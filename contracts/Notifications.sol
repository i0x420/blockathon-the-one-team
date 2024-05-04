// // SPDX-License-Identifier: SEE LICENSE IN LICENSE
// pragma solidity 0.8.19;

// import "./interfaces/INotification.sol";
// import "./libraries/Ownable.sol";

// contract Notification is INotification, Ownable {
//     /// Define community for handle event
//     struct Community {
//         bool isInit;
//         mapping(address => bool) admins;
//         mapping(address => bool) members;
//     }

//     /// Maping store value
//     mapping(bytes32 => Community) private _communities;

//     /// Declare Event base on GS1 standard
//     event Event(
//         bytes32 indexed community, /// Community key
//         bytes indexed action, /// Action of event
//         address from, /// True caller
//         address indexed to, /// Smart contract emit
//         bytes data /// Data of event
//     );

//     /// Community Registered Event
//     event CommunityRegistered(bytes32 community);

//     /// Set Admins of Community Event
//     event SetAdmins(bytes32 community);

//     /// Set Members of Community Event
//     event SetMembers(bytes32 community);

//     /// Set Member of Community Event
//     event SetMember(bytes32 community, address member);

//     constructor() Ownable(msg.sender) {}

//     modifier onlyInitCommunity(bytes32 communityKey) {
//         require(
//             isInitCommunity(communityKey),
//             "Coin98 Broadcaster: Community not found"
//         );
//         _;
//     }

//     modifier onlyAdmin(bytes32 communityKey) {
//         require(
//             isAdmin(communityKey, _msgSender()),
//             "Coin98 Broadcaster: Unauthorized"
//         );
//         _;
//     }

//     modifier onlyMember(bytes32 communityKey) {
//         require(
//             isMember(communityKey, _msgSender()),
//             "Coin98 Broadcaster: Unauthorized"
//         );
//         _;
//     }

//     /*
//      * @title Register Community
//      * @notice Registed new community in Coin98 System
//      * @param community Key of community (Should not be use before)
//      * @param initAdmins List init admins of Community (admin can update member list)
//      * @param initMembers List init members of Community (member can emit event)
//      */
//     function registerCommunity(
//         bytes32 communityKey,
//         address[] memory initAdmins,
//         address[] memory initMembers
//     ) external override onlyOwner {
//         Community storage communityInfo = _communities[communityKey];
//         require(
//             !communityInfo.isInit,
//             "Coin98 Broadcaster: Community already init"
//         );

//         communityInfo.isInit = true;
//         for (uint i = 0; i < initAdmins.length; i++) {
//             communityInfo.admins[initAdmins[i]] = true;
//         }

//         for (uint i = 0; i < initMembers.length; i++) {
//             communityInfo.members[initMembers[i]] = true;
//         }

//         emit CommunityRegistered(communityKey);
//     }

//     /*
//      * @title Set admin
//      * @notice Owner of contract or admin of community can update admins list of Community
//      * @param community Key of community
//      * @param admins List admins
//      * @param isActive admin status
//      */
//     function setAdmins(
//         bytes32 communityKey,
//         address[] memory members,
//         bool isActive
//     ) external onlyOwner onlyInitCommunity(communityKey) {
//         Community storage communityInfo = _communities[communityKey];

//         for (uint i; i < members.length; i++) {
//             communityInfo.admins[members[i]] = isActive;
//         }

//         emit SetAdmins(communityKey);
//     }

//     /*
//      * @title Set Member
//      * @notice Owner of contract or admin of community can update members list of Community
//      * @param community Key of community
//      * @param members List members
//      * @param isActive member status
//      */
//     function setMembers(
//         bytes32 communityKey,
//         address[] memory members,
//         bool isActive
//     ) external onlyAdmin(communityKey) onlyInitCommunity(communityKey) {
//         Community storage communityInfo = _communities[communityKey];

//         for (uint i; i < members.length; i++) {
//             communityInfo.members[members[i]] = isActive;
//         }

//         emit SetMembers(communityKey);
//     }

//     /*
//      * @title Set Member
//      * @notice Owner of contract or admin of community can update member of Community
//      * @param community Key of community
//      * @param member member
//      * @param isActive member status
//      */
//     function setMember(
//         bytes32 communityKey,
//         address member,
//         bool isActive
//     )
//         external
//         override
//         onlyAdmin(communityKey)
//         onlyInitCommunity(communityKey)
//     {
//         Community storage communityInfo = _communities[communityKey];

//         communityInfo.members[member] = isActive;

//         emit SetMember(communityKey, member);
//     }

//     /*
//      * @title Is Admin
//      * @notice View function for check an address is admin of community
//      * @param community Key of community
//      * @param admin address of admin
//      */
//     function isAdmin(
//         bytes32 communityKey,
//         address admin
//     ) public view returns (bool) {
//         Community storage communityInfo = _communities[communityKey];

//         return communityInfo.admins[admin];
//     }

//     /*
//      * @title Is Member
//      * @notice View function for check an address is member of community
//      * @param community Key of community
//      * @param member address of member
//      */
//     function isMember(
//         bytes32 communityKey,
//         address member
//     ) public view returns (bool) {
//         Community storage communityInfo = _communities[communityKey];

//         return communityInfo.members[member];
//     }

//     /*
//      * @title Is Member
//      * @notice View function for check an address is member of community
//      * @param community Key of community
//      * @param member address of member
//      */
//     function isInitCommunity(
//         bytes32 communityKey
//     ) public view override returns (bool) {
//         Community storage communityInfo = _communities[communityKey];
//         return communityInfo.isInit;
//     }

//     /*
//      * @title Broadcast event
//      * @notice Member of community can pushNoti an event
//      * @param community Key of community
//      * @param action Action of event
//      * @param from Caller
//      * @param to Smart contract handle logic
//      * @param data Data of event
//      */
//     function pushNoti(
//         bytes32 communityKey,
//         bytes memory action,
//         address from,
//         address to,
//         bytes memory data
//     ) external override {
//         if (
//             isInitCommunity(communityKey) &&
//             isMember(communityKey, _msgSender())
//         ) {
//             emit Event(communityKey, action, from, to, data);
//         }
//     }
// }
