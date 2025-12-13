import {NFT_ABI} from './abi';
import {showMessage} from 'react-native-flash-message';
import {BaseContractService} from './BaseContractService';
import {CONTRACT_ADDRESSES} from './addresses/AddressMartketPlace';
import {parseBlockchainError} from '../utils/errors/blockchainErrors';

class NFTServiceClass extends BaseContractService {
  constructor() {
    super(NFT_ABI, CONTRACT_ADDRESSES.NFT_ADDRESS);
  }

  /**
   * Mint NFT
   */
  async mintToken(walletProvider, tokenURI) {
    const signer = await this._getSigner(walletProvider);
    const contract = this._connect(walletProvider, signer);

    try {
      const gas = await contract.mintToken.estimateGas(tokenURI);

      showMessage({message: 'Vui lòng xác nhận trong ví', type: 'info'});

      const tx = await contract.mintToken(tokenURI, {
        gasLimit: (gas * BigInt(120)) / BigInt(100),
      });

      const receipt = await tx.wait();
      if (!receipt?.status) throw new Error('Mint failed');

      let tokenId = null;
      for (const log of receipt.logs) {
        try {
          const parsed = contract.interface.parseLog(log);
          if (parsed.name === 'Transfer') {
            tokenId = parsed.args.tokenId.toString();
            break;
          }
        } catch {}
      }

      showMessage({message: 'Mint thành công!', type: 'success'});
      return {success: true, tokenId, txHash: tx.hash};
    } catch (err) {
      throw new Error(parseBlockchainError(err));
    }
  }

  /**
   * Update NFT
   */
  async updateTokenURI(walletProvider, owner, tokenId, newTokenURI) {
    const signer = await this._getSigner(walletProvider);
    const contract = this._connect(walletProvider, signer);

    const currentOwner = await contract.ownerOf(tokenId);
    if (currentOwner.toLowerCase() !== owner.toLowerCase()) {
      throw new Error('Bạn không phải chủ NFT');
    }

    const gas = await contract.setTokenURI.estimateGas(tokenId, newTokenURI);

    showMessage({message: 'Vui lòng xác nhận trong ví', type: 'info'});

    return await this.sendTx(contract.setTokenURI, tokenId, newTokenURI, {
      gasLimit: (gas * BigInt(120)) / BigInt(100),
    });
  }
}

export const NFTService = new NFTServiceClass();
