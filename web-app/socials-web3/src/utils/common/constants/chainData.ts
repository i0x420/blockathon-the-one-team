import { pickBy, mapValues, transform } from 'lodash';

export enum CHAIN_KIND {
  EVM = 'evm',
  COSMWASM = 'cosmwasm',
  SOLANA = 'solana',
  UNKNOWN = 'unknown',
}

export enum LIST_CHAIN_SUPPORT {
  goerli = '5',
  holesky = '17000',
  bnbTestnet = '97',
  ether = 'ether',
  binanceSmart = 'binanceSmart',
  tomo = 'tomo',
  solana = 'solana',
  solanaDev = 'solanaDev',
  matic = 'matic',
  sei = 'sei',
  seiMainnet = 'seiMainnet',
  sepolia = '11155111',
  injective = 'injective',
  injectiveTestnet = 'injective-888',
}

export const CHAIN_DATA = {
  // MAINNET CHAINS
  ether: {
    kind: CHAIN_KIND.EVM,
    key: 'ether',
    numChainId: 1,
    decimals: 18,
    chainId: '0x1',
    numLoad: 0,
    bufferGas: 1.2,
    isSupportedEIP1559: true,
    isToken: true,
    isBridge: true,
    isSupportedNFT: true,
    trcToken: 'ERC20',
    nftToken: 'ERC721',
    balances: '0x38bb7b9b87bdfbed883aaf50a2f411d330fe32d6',
    multisend: '0xaEC945e04baF28b135Fa7c640f624f8D90F1C3a6',
    stake: '0x836bf46520C373Fdc4dc7E5A3bAe735d13bD44e3',
    isSupportedV2: true,
    isWeb3: true,
    isFee: true,
    image: 'app_ethereum',
    id: 'ethereum',
    name: 'Ethereum',
    shortName: 'Ethereum',
    symbol: 'ETH',
    chain: 'ether',
    trcName: 'ETH ERC20 ERC721',
    rpcURL: 'https://mainnet.infura.io/v3/92d53cee52834368b0fabb42fa1b5570',
    scan: 'https://etherscan.io',
    scanContract: 'address',
  },
  binanceSmart: {
    kind: CHAIN_KIND.EVM,
    key: 'binanceSmart',
    numChainId: 56,
    decimals: 18,
    chainId: '0x38',
    numLoad: 1,
    bufferGas: 1.2,
    isBridge: true,
    isToken: true,
    isSupportedNFT: true,
    nftToken: 'BEP721',
    trcToken: 'BEP20',
    symbolSpecial: 'BSC',
    balances: '0xA6762c710852681c4593C10c4304C5211FB2122c',
    multisend: '0x2E1D30460265bFEBedacf5bb6f9A80F0E74B7498',
    nftMint: '0x366660dCa241AFeE67c1f3da9Cb93aa465641956',
    stake: '0x08ac9c38ce078b9b81e5ab5bf8aafc3d2db94385',
    subName: 'BSC',
    isSupportedV2: true,
    isWeb3: true,
    isFee: true,
    image: 'app_binance',
    id: 'binancecoin',
    name: 'BNB Smart Chain',
    shortName: 'BSC',
    symbol: 'BNB',
    chain: 'binanceSmart',
    trcName: 'BNB BEP20',
    rpcURL: 'https://bsc.blockpi.network/v1/rpc/public',
    scan: 'https://bscscan.com',
    scanContract: 'address',
  },
  solana: {
    kind: 'solana',
    key: 'solana',
    chainId: 'solana',
    numLoad: 1,
    decimals: 9,
    bufferGas: 1,
    isToken: true,
    trcToken: 'SPL',
    nftToken: 'SPL NFT',
    multisend: true,
    isBridge: true,
    isSupportedNFT: true,
    numChainId: 'solana',
    image: 'app_solana',
    id: 'solana',
    name: 'Solana',
    shortName: 'Solana',
    symbol: 'SOL',
    chain: 'solana',
    trcName: 'SOL SPL',
    rpcURL: 'http://rpc.solscan.com',
    scan: 'https://solscan.io',
    launchpadProgramId: 'Qm8YDspQzpZAPEusCMx9uKVnRHwfFHGvWNLq3g823Nk',
    scanAddr: 'account',
    scanTxs: 'tx',
  },
  matic: {
    kind: CHAIN_KIND.EVM,
    key: 'matic',
    numChainId: 137,
    chainId: '0x89',
    numLoad: 2,
    bufferGas: 1.3,
    isToken: true,
    trcToken: 'PRC20',
    nftToken: 'PRC721',
    isSupportedV2: true,
    isSupportedNFT: true,
    isFee: true,
    isWeb3: true,
    balances: '0x963e1BcD1f82724bD8Fa16a3B6962D100fB287FC',
    multisend: '0x67807b9f5B9757C0c79347F0b3f360C15c5E6aFF',
    nftMint: '0xC285B7E09A4584D027E5BC36571785B515898246',
    id: 'matic-network',
    name: 'Polygon',
    image: 'app_polygon',
    symbol: 'MATIC',
    chain: 'matic',
    trcName: 'MATIC PRC20',
    rpcURL: 'https://polygon.blockpi.network/v1/rpc/public',
    scan: 'https://polygonscan.com',
    // socketRPC: "wss://muddy-radial-snowflake.matic.discover.quiknode.pro/d4092cccf1b6b45bb39dc82c4afd241ebeb26d45/"
    scanContract: 'address',
  },
  seiMainnet: {
    kind: CHAIN_KIND.COSMWASM,
    key: 'seiMainnet',

    decimals: 6,
    prefix: 'sei',
    numPath: 118,
    nftToken: 'CW721',
    numLoad: 3,
    bufferGas: 1.2,
    isMemo: true,
    isFactory: true,
    numChainId: 'pacific-1',
    chainId: 'pacific-1',
    id: 'sei',
    name: 'Sei Mainnet',
    image: 'app_sei',
    symbol: 'sei',
    minimalDenom: 'usei',
    denom: 'usei',
    chain: 'seiMainnet',
    trcName: 'usei',
    scan: 'https://www.seiscan.app/pacific-1',
    rpcURL: 'https://sei-rpc.brocha.in',
    scanTxs: 'txs',
    scanAddr: 'accounts',
    scanContract: 'contracts',
    scanBlocks: 'blocks',
    routerLink: 'sei',
  },
  tomo: {
    kind: CHAIN_KIND.EVM,
    key: 'tomo',
    decimals: 18,
    numPath: 889,
    numChainId: 88,
    chainId: '0x58',
    numLoad: 2,
    bufferGas: 1.2,
    isBridge: true,
    isToken: true,
    isSupportedNFT: true,
    trcToken: 'VRC25',
    nftToken: 'VRC725',
    isWeb3: true,
    isFee: true,
    image: 'app_vic',
    balances: '0xf7eEe3A8363731C611A24CdDfCBcaDE9C153Cfe8',
    // multisend: '0x5C93F4B35d3dD97Ef481881aA33d00F76806FdAD',
    nftMint: '0xAE12C5930881c53715B369ceC7606B70d8EB229f',
    id: 'tomochain',
    name: 'Viction',
    shortName: 'Viction',
    symbol: 'VIC',
    chain: 'tomo',
    trcName: 'VRC25',
    rpcURL: 'https://rpc2.tomochain.com/',
    scan: 'https://www.vicscan.xyz',
    scanContract: 'token',
  },
  injective: {
    kind: CHAIN_KIND.COSMWASM,
    key: 'injective',
    prefix: 'inj',

    decimals: 18,
    bufferGas: 1.5,
    numPath: 118,
    id: 'injective-1',
    numChainId: 'injective-1',
    chainId: 'injective-1',
    name: 'Injective',
    chain: 'injective',
    denom: 'inj',
    minimalDenom: 'inj',
    symbol: 'INJ',
    nftToken: 'CW721',
    image: 'app_injective',
    scan: 'https://explorer.injective.network',
    // rpcURL: 'https://tm.injective.network',
    rpcURL: 'https://injective-rpc.publicnode.com:443',
    restURL: 'https://sentry.lcd.injective.network:443',
    scanTxs: 'transaction',
    scanAddr: 'account',
    scanContract: 'contract',
    scanBlocks: 'block',
  },

  // TESTNET CHAINS
  solanaDev: {
    kind: 'solana',
    key: 'solanaDev',
    chainId: 'solanaDev',
    numLoad: 1,
    numChainId: 'solanaDev',
    decimals: 9,
    bufferGas: 1,
    isToken: true,
    trcToken: 'SPL',
    nftToken: 'SPL NFT',
    multisend: true,
    isBridge: true,
    isSupportedNFT: true,
    image: 'app_solana',
    id: 'solana',
    name: 'Solana Devnet',
    shortName: 'Solana Dev',
    symbol: 'SOL',
    chain: 'solanaDev',
    trcName: 'SOL SPL',
    // rpcURL: 'https://api.devnet.solana.com',
    rpcURL: 'https://api.devnet.solana.com',
    scan: 'https://solscan.io',
    // launchpadProgramId: 'Qm8YDspQzpZAPEusCMx9uKVnRHwfFHGvWNLq3g823Nk',
    scanAddr: 'account',
    scanTxs: 'tx',
  },
  '11155111': {
    kind: CHAIN_KIND.EVM,
    key: '11155111',
    numChainId: 11155111,
    decimals: 18,
    chainId: '0xaa36a7',
    numLoad: 0,
    bufferGas: 1.5,
    isSupportedEIP1559: true,
    isToken: true,
    isBridge: true,
    isSupportedNFT: true,
    trcToken: 'ERC20',
    nftToken: 'ERC721',
    balances: '0x38bb7b9b87bdfbed883aaf50a2f411d330fe32d6',
    multisend: '0xaEC945e04baF28b135Fa7c640f624f8D90F1C3a6',
    stake: '0x836bf46520C373Fdc4dc7E5A3bAe735d13bD44e3',
    isSupportedV2: true,
    isWeb3: true,
    isFee: true,
    image: 'app_ethereum',
    id: 'ethereum',
    name: 'Ethereum Sepolia',
    shortName: 'Ethereum',
    symbol: 'ETH',
    chain: '11155111',
    trcName: 'ETH ERC20 ERC721',
    // rpcURL: 'https://rpc.sepolia.org',
    rpcURL: 'https://eth-sepolia.public.blastapi.io',
    scan: 'https://sepolia.etherscan.io/',
    scanContract: 'address',
  },
  '17000': {
    kind: CHAIN_KIND.EVM,
    key: '17000',
    numChainId: 17000,
    decimals: 18,
    chainId: '0x4268',
    numLoad: 0,
    bufferGas: 1.1,
    isSupportedEIP1559: true,
    isToken: true,
    isBridge: true,
    isSupportedNFT: true,
    trcToken: 'ERC20',
    nftToken: 'ERC721',
    balances: '0x38bb7b9b87bdfbed883aaf50a2f411d330fe32d6',
    multisend: '0xaEC945e04baF28b135Fa7c640f624f8D90F1C3a6',
    stake: '0x836bf46520C373Fdc4dc7E5A3bAe735d13bD44e3',
    isSupportedV2: true,
    isWeb3: true,
    isFee: true,
    image: 'app_ethereum',
    id: 'ethereum',
    name: 'Holesky',
    shortName: 'Ethereum',
    symbol: 'ETH',
    chain: '17000',
    trcName: 'ETH ERC20 ERC721',
    rpcURL: 'https://ethereum-holesky.publicnode.com',
    scan: 'https://holesky.etherscan.io/',
    scanContract: 'address',
  },
  '5': {
    kind: CHAIN_KIND.EVM,
    key: '5',
    numChainId: 5,
    decimals: 18,
    chainId: '0x5',
    numLoad: 0,
    bufferGas: 1.2,
    isSupportedEIP1559: true,
    isToken: true,
    isBridge: true,
    isSupportedNFT: true,
    trcToken: 'ERC20',
    nftToken: 'ERC721',
    balances: '0x38bb7b9b87bdfbed883aaf50a2f411d330fe32d6',
    multisend: '0xaEC945e04baF28b135Fa7c640f624f8D90F1C3a6',
    stake: '0x836bf46520C373Fdc4dc7E5A3bAe735d13bD44e3',
    isSupportedV2: true,
    isWeb3: true,
    isFee: true,
    image: 'app_ethereum',
    id: 'ethereum',
    name: 'Ethereum goerli',
    shortName: 'Ethereum',
    symbol: 'ETH',
    chain: '5',
    trcName: 'ETH ERC20 ERC721',
    rpcURL: 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    scan: 'https://goerli.etherscan.io/',
    launchpadFactory: '0xB3E382CA0562C4440f346768b9b20bA813d21FDb',
    launchpadMintableKey: '0x8a77C6d87B5E5Ea7e779C7d14cA50315Bfc4C019',
    launchpadTransferableKey: '0x1C40CBda91e1E0504805eCf038F2e067D11DdBE9',
    scanContract: 'address',
  },
  97: {
    kind: CHAIN_KIND.EVM,
    key: '97',
    numChainId: 97,
    decimals: 18,
    chainId: '0x61',
    numLoad: 1,
    bufferGas: 1.2,
    isBridge: true,
    isToken: true,
    isSupportedNFT: true,
    nftToken: 'BEP721',
    trcToken: 'BEP20',
    symbolSpecial: 'BSC',
    balances: '0xA6762c710852681c4593C10c4304C5211FB2122c',
    multisend: '0x2E1D30460265bFEBedacf5bb6f9A80F0E74B7498',
    nftMint: '0x2418400d29F8B774E49e93C5cb54460ae5Ecd788',
    stake: '0x08ac9c38ce078b9b81e5ab5bf8aafc3d2db94385',
    subName: 'BSC',
    isSupportedV2: true,
    isWeb3: true,
    isFee: true,
    image: 'app_binance',
    id: 'binancecoin',
    name: 'BNB Smart Chain testnet',
    shortName: 'BSC',
    symbol: 'BNB',
    chain: '97',
    trcName: 'BNB BEP20',
    rpcURL: 'https://data-seed-prebsc-1-s1.binance.org:8545',
    scan: 'https://testnet.bscscan.com/',
    launchpadFactory: '0x31313099814980854c55C131bDEa6736e93feE8b',
    launchpadMintableKey:
      '0x444f313053c893c305c4a5f333f3b033d548405c830016c4b623e787aa045145',
    scanContract: 'address',
  },
  sei: {
    kind: 'cosmwasm',
    key: 'sei',
    decimals: 6,
    prefix: 'sei',
    numPath: 118,
    nftToken: 'CW721',
    numLoad: 3,
    bufferGas: 1.2,
    isMemo: true,
    isFactory: true,
    numChainId: 'atlantic-2',
    chainId: 'atlantic-2',
    id: 'seiTestnet',
    name: 'Sei Testnet',
    image: 'app_sei',
    symbol: 'sei',
    minimalDenom: 'usei',
    chain: 'sei',
    trcName: 'usei',
    scan: 'https://www.seiscan.app/atlantic-2',
    rpcURL: 'https://sei-testnet-rpc.polkachu.com',
    denom: 'usei',
    scanTxs: 'txs',
    scanAddr: 'accounts',
    scanContract: 'contracts',
    scanBlocks: 'blocks',
    routerLink: 'seiTestnet',
  },
  'injective-888': {
    kind: CHAIN_KIND.COSMWASM,
    key: 'injective-888',
    prefix: 'inj',

    decimals: 18,
    numPath: 118,
    id: 'injective-888',
    numChainId: 'injective-888',
    bufferGas: 1.2,
    chainId: 'injective-888',
    name: 'Injective Testnet',
    chain: 'injective-888',
    denom: 'inj',
    minimalDenom: 'inj',
    symbol: 'INJ',
    nftToken: 'CW721',
    image: 'app_injective',
    scan: 'https://testnet.explorer.injective.network',
    rpcURL: 'https://testnet.sentry.tm.injective.network:443',
    restURL: 'https://testnet.sentry.lcd.injective.network:443',
    scanTxs: 'transaction',
    scanAddr: 'account',
    scanContract: 'contract',
    scanBlocks: 'block',
  },
};

export const CHAIN_TO_CHAIN_ID = pickBy(mapValues(CHAIN_DATA, 'chainId'));
export const CHAIN_ID_TO_CHAIN = transform(
  CHAIN_TO_CHAIN_ID,
  (result: { [key: string]: string }, value, key) => {
    result[value] = key;
  },
  {},
);

export const CHAIN_TYPE = pickBy(mapValues(CHAIN_DATA, 'key'));

export const CHAINS_SUPPORTED = [
  CHAIN_TYPE.binanceSmart,
  CHAIN_TYPE.matic,
  CHAIN_TYPE.ether,
  CHAIN_TYPE.sei,
  CHAIN_TYPE.seiMainnet,
  CHAIN_TYPE.tomo,
  CHAIN_TYPE.injective,
  CHAIN_TYPE.solana,
  CHAIN_TYPE['97'],
  CHAIN_TYPE['11155111'],
  CHAIN_TYPE.solanaDev,
];
