import {useState, useRef} from 'react';
import {showMessage} from 'react-native-flash-message';
import {ethers} from 'ethers';
import {Marketplace_ABI} from '~/contracts/abi';
import {CONTRACT_ADDRESSES} from '~/contracts/addresses/AddressMartketPlace';
import {parseBlockchainError} from '~/utils/errors/blockchainErrors';

export const useBuyNow = ({walletProvider}) => {
  const bottomSheetRef = useRef(null);
  const [isBuyLoading, setIsBuyLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleBuyNow = async productDetail => {
    setIsBuyLoading(true);
    try {
      const provider = new ethers.BrowserProvider(walletProvider);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        CONTRACT_ADDRESSES.Marketplace,
        Marketplace_ABI,
        signer,
      );

      const nftAddress = CONTRACT_ADDRESSES.NFT_ADDRESS;
      const marketItemId = productDetail.marketItemId;
      const priceInWei = ethers.parseEther(productDetail.price.toString());

      const tx = await contract.createMarketSale(nftAddress, marketItemId, {
        value: priceInWei,
      });

      const receipt = await tx.wait();
      if (!receipt?.status) throw new Error('Transaction failed');

      bottomSheetRef.current?.close();
      setTimeout(() => setShowSuccessModal(true), 300);
    } catch (e) {
      showMessage({message: parseBlockchainError(e), type: 'danger'});
    } finally {
      setIsBuyLoading(false);
    }
  };

  return {
    bottomSheetRef,
    isBuyLoading,
    showSuccessModal,
    setShowSuccessModal,
    handleBuyNow,
  };
};
