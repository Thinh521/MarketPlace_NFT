import React from 'react';
import {
  BSCFillIcon,
  EthFillIcon,
  PolygonFillIcon,
  SolanaFillIcon,
} from '../assets/icons/icons';

export const BLOCKCHAIN_OPTIONS = [
  {
    label: 'Ethereum',
    value: 'Ethereum',
    icon: <EthFillIcon style={{width: 20}} />,
  },
  {
    label: 'Polygon',
    value: 'Polygon',
    icon: <PolygonFillIcon style={{width: 20}} />,
  },
  {
    label: 'Binance Smart Chain',
    value: 'BSC',
    icon: <BSCFillIcon style={{width: 20}} />,
  },
  {
    label: 'Solana',
    value: 'Solana',
    icon: <SolanaFillIcon style={{width: 20}} />,
  },
];
