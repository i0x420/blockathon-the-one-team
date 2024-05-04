export const socialABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "feeManager",
        type: "address"
      }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    name: "NewCommunity",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "OwnershipTransferred",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "",
        type: "address"
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    name: "PostCreated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "admin",
        type: "address"
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isActive",
        type: "bool"
      }
    ],
    name: "SetAdmin",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "implement",
        type: "address"
      }
    ],
    name: "SetImplement",
    type: "event"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32"
      },
      {
        internalType: "bytes",
        name: "callData",
        type: "bytes"
      }
    ],
    name: "createCommunityChanel",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "community",
        type: "address"
      },
      {
        internalType: "bytes32",
        name: "postId",
        type: "bytes32"
      }
    ],
    name: "createPost",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "community",
        type: "address"
      }
    ],
    name: "deactiveCommunity",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "service",
        type: "bytes32"
      }
    ],
    name: "getFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getImplement",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32"
      }
    ],
    name: "getInstanceAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "admin",
        type: "address"
      }
    ],
    name: "isActiveAdmin",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "communityPFPCollection",
        type: "address"
      }
    ],
    name: "registerCommunityChanel",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "admin",
        type: "address"
      },
      {
        internalType: "bool",
        name: "isActive",
        type: "bool"
      }
    ],
    name: "setAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "implement",
        type: "address"
      }
    ],
    name: "setImplement",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "getCommunities",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
] as const;
