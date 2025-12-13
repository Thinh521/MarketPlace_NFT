import {ethers} from 'ethers';
import {parseBlockchainError} from '../utils/errors/blockchainErrors';
import {BaseContractService} from './BaseContractService';
import {Marketplace_ABI} from './abi';
import {CONTRACT_ADDRESSES} from './addresses/AddressMartketPlace';

class MarketplaceServiceClass extends BaseContractService {
  constructor() {
    super(Marketplace_ABI, CONTRACT_ADDRESSES.Marketplace);
  }

  /**
   * Sell NFT
   */
  async listNFT({walletProvider, nftAddress, tokenId, price}) {
    const signer = await this._getSigner(walletProvider);
    const contract = this._connect(walletProvider, signer);

    try {
      const priceInWei = ethers.parseEther(price.toString());
      const listingFee = await contract.getListingFee();

      return await this.sendTx(
        contract.createMarketItem,
        nftAddress,
        tokenId,
        priceInWei,
        {value: listingFee},
      );
    } catch (err) {
      throw new Error(parseBlockchainError(err));
    }
  }
}

export const MarketplaceService = new MarketplaceServiceClass();
