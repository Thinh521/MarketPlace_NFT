import '@walletconnect/react-native-compat';

import {REOWN_PROJECT_ID} from '@env';
import {createAppKit, defaultConfig} from '@reown/appkit-ethers-react-native';

const metadata = {
  name: 'NFT Marketplace',
  description: 'A marketplace for buying and selling NFTs',
  url: 'https://nftmarketplace.com',
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
  redirect: {
    native: 'nftmarketplace://',
    universal: 'https://nftmarketplace.com',
  },
};

const config = defaultConfig({metadata});

const chains = [
  {
    chainId: 5080,
    name: 'Pione Zero',
    currency: 'PIONE',
    explorerUrl: 'https://zeroscan.org',
    rpcUrl: 'https://rpc.zeroscan.org',
  },
  {
    chainId: 1,
    name: 'Ethereum',
    currency: 'ETH',
    explorerUrl: 'https://etherscan.io',
    rpcUrl: 'https://cloudflare-eth.com',
  },
  {
    chainId: 137,
    name: 'Polygon',
    currency: 'MATIC',
    explorerUrl: 'https://polygonscan.com',
    rpcUrl: 'https://polygon-rpc.com',
  },
];

if (!global.__APPKIT_INITIALIZED__) {
  createAppKit({
    projectId: REOWN_PROJECT_ID,
    chains,
    config,
    enableAnalytics: true,
  });
  global.__APPKIT_INITIALIZED__ = true;
}
