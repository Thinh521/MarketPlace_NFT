import {BaseContractService} from './BaseContractService';
import {AuctionHouse_ABI, NFT_ABI} from './abi';
import {CONTRACT_ADDRESSES} from './addresses/AddressMartketPlace';
import {ethers} from 'ethers';

class AuctionServiceClass extends BaseContractService {
  constructor() {
    super(AuctionHouse_ABI, CONTRACT_ADDRESSES.AuctionHouse);
  }

  /**
   * Fetch a single auction info
   */
  async getAuctionById(walletProvider, auctionId) {
    const provider = new ethers.BrowserProvider(walletProvider);
    const contract = new ethers.Contract(this.address, this.abi, provider);

    const data = await contract.auctions(auctionId);

    return {
      auctionId: auctionId.toString(),
      seller: data.seller,
      nft: data.nft,
      tokenId: data.tokenId.toString(),
      endTime: Number(data.endTime),
      minIncrementBp: Number(data.minIncrementBp),
      reservePrice: ethers.formatEther(data.reservePrice),
      highestBidder: data.highestBidder,
      highestBid: ethers.formatEther(data.highestBid),
      settled: data.settled,
    };
  }

  /**
   * Create auction
   */
  async createAuction({
    walletProvider,
    ownerAddress,
    tokenId,
    reservePrice,
    auctionDurationSeconds,
    minIncrement,
  }) {
    const signer = await this._getSigner(walletProvider);
    const auctionContract = this._connect(walletProvider, signer);

    // NFT contract để approve
    const nftContract = new ethers.Contract(
      CONTRACT_ADDRESSES.NFT_ADDRESS,
      NFT_ABI,
      signer,
    );

    // Check approve
    const approved = await nftContract.getApproved(tokenId);
    const isAll = await nftContract.isApprovedForAll(
      ownerAddress,
      this.address,
    );

    if (approved.toLowerCase() !== this.address.toLowerCase() && !isAll) {
      const tx = await nftContract.approve(this.address, tokenId);
      await tx.wait();
    }

    const reserveWei = ethers.parseEther(reservePrice.toString());

    return await this.sendTx(
      auctionContract.createAuction,
      CONTRACT_ADDRESSES.NFT_ADDRESS,
      tokenId,
      reserveWei,
      auctionDurationSeconds,
      Math.floor(minIncrement * 100),
    );
  }

  /**
   * Place Bid
   */
  async bid({walletProvider, auctionId, bidAmount}) {
    const signer = await this._getSigner(walletProvider);
    const contract = this._connect(walletProvider, signer);

    const bidWei = ethers.parseEther(bidAmount.toString());

    return await this.sendTx(contract.bid, auctionId, {value: bidWei});
  }

  /**
   * Settle Auction
   */
  async settleAuction({walletProvider, auctionId}) {
    const signer = await this._getSigner(walletProvider);
    const contract = this._connect(walletProvider, signer);

    return await this.sendTx(contract.settle, auctionId);
  }

  /**
   * Cancel Auction
   */
  async cancelAuction({walletProvider, auctionId}) {
    const signer = await this._getSigner(walletProvider);
    const contract = this._connect(walletProvider, signer);

    return await this.sendTx(contract.cancel, auctionId);
  }
}

export const AuctionService = new AuctionServiceClass();
