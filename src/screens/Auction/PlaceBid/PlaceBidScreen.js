import {IPFS_GATEWAY} from '@env';
import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Controller, useForm} from 'react-hook-form';
import {showMessage} from 'react-native-flash-message';
import {ethers} from 'ethers';
import {useAppKitAccount} from '@reown/appkit-ethers-react-native';

import {Input} from '~/components/ui/Input';
import {Button} from '~/components/ui/Button';
import SuccessBidModal from './components/SuccessBidModal';
import ConfirmBidBottomSheet from './components/ConfirmBidBottomSheet';

import {AuctionService} from '~/contracts/AuctionService';

import {db} from '~/services/firebase';
import {VALIDATION_RULES} from '~/validations/authValidations';
import {useAuctionCountdown} from '~/hooks/useAuctionCountdown';
import {parseBlockchainError} from '~/utils/errors/blockchainErrors';

import {Colors} from '~/theme/theme';
import styles from './PlaceBid.styles';

const PlaceBidScreen = ({route, navigation}) => {
  const {auction, walletProvider} = route.params;
  const bottomSheetRef = useRef(null);
  const {address} = useAppKitAccount();

  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const timeLeft = useAuctionCountdown(auction.endTime);

  const highestBid = parseFloat(auction.highestBid || 0);
  const reservePrice = parseFloat(auction.reservePrice || 0);
  const minIncrement = auction.minIncrementBp / 10000;

  const minBidAmount =
    highestBid > 0 ? highestBid + highestBid * minIncrement : reservePrice;

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: {errors},
  } = useForm({
    defaultValues: {
      bidAmount: '',
    },
    mode: 'onChange',
  });

  const bidAmount = watch('bidAmount');
  const ethPrice = parseFloat(bidAmount || 0);
  const usdPrice = (ethPrice * 2500).toFixed(2);

  const saveBidToFirebase = async (userAddress, auctionId) => {
    if (!userAddress || !auctionId) return;

    const addressLower = userAddress.toLowerCase();
    const batch = db.batch();

    const bidHistoryRef = db.collection('bid_history').doc(addressLower);
    batch.set(
      bidHistoryRef,
      {
        [auctionId]: true,
        updatedAt: Date.now(),
      },
      {merge: true},
    );

    const userBidRef = db
      .collection('users')
      .doc(addressLower)
      .collection('bids')
      .doc(String(auctionId));

    batch.set(userBidRef, {
      auctionId: String(auctionId),
      refunded: false,
      createdAt: Date.now(),
    });

    await batch.commit();
  };

  const handlePlaceBid = async () => {
    if (!address || !walletProvider) {
      Alert.alert('Wallet Error', 'Please connect your wallet first');
      return;
    }

    setIsProcessing(true);

    try {
      showMessage({
        message: 'Please confirm in your wallet',
        type: 'info',
        duration: 2000,
      });

      await AuctionService.bid({
        walletProvider,
        auctionId: auction.auctionId,
        bidAmount,
      });

      await saveBidToFirebase(address, auction.auctionId);

      bottomSheetRef.current?.close();
      // setTimeout(() => {
      //   setShowSuccessModal(true);
      // }, 500);
    } catch (error) {
      showMessage({
        message: parseBlockchainError(error),
        type: 'danger',
        duration: 5000,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const onSubmit = () => {
    bottomSheetRef.current?.expand();
  };

  const setQuickBid = multiplier => {
    const quickBid = (minBidAmount * multiplier).toFixed(4);
    setValue('bidAmount', quickBid, {shouldValidate: true});
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.background} barStyle="light-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Auction Info Card */}
          <View style={styles.auctionCard}>
            <FastImage
              source={{uri: `${IPFS_GATEWAY}${auction?.image}`}}
              style={styles.auctionImage}
              resizeMode="cover"
            />
            <View style={styles.auctionInfo}>
              <Text style={styles.auctionName}>{auction?.name}</Text>
              <View style={styles.auctionStats}>
                <View style={styles.statItem}>
                  <Icon name="clock" size={14} color={Colors.textGray} />
                  <Text style={styles.statText}>{timeLeft}</Text>
                </View>
                <View style={styles.statItem}>
                  <Icon name="users" size={14} color={Colors.textGray} />
                  <Text style={styles.statText}>
                    {auction.bidCount || 0} bids
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Current Bid Info */}
          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Current Bid</Text>
              <View style={styles.infoValueRow}>
                <MaterialIcon name="ethereum" size={18} color="#627EEA" />
                <Text style={styles.infoValue}>
                  {highestBid > 0
                    ? highestBid.toFixed(4)
                    : reservePrice.toFixed(4)}{' '}
                  ETH
                </Text>
              </View>
            </View>

            {auction.highestBidder &&
              auction.highestBidder !== ethers.ZeroAddress && (
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Leading Bidder</Text>
                  <Text style={styles.infoValue}>
                    {auction.highestBidder.substring(0, 6)}...
                    {auction.highestBidder.substring(38)}
                  </Text>
                </View>
              )}

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Minimum Bid</Text>
              <View style={styles.infoValueRow}>
                <MaterialIcon name="ethereum" size={18} color="#627EEA" />
                <Text style={[styles.infoValue, {color: Colors.primary}]}>
                  {minBidAmount.toFixed(4)} ETH
                </Text>
              </View>
            </View>
          </View>

          {/* Bid Amount Input */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Bid Amount</Text>
            <Text style={styles.sectionSubtitle}>
              Enter your maximum bid. You can always bid higher.
            </Text>

            <Controller
              control={control}
              name="bidAmount"
              rules={VALIDATION_RULES.reservePrice}
              render={({field: {value, onChange, onBlur}}) => (
                <View style={styles.bidInputContainer}>
                  <Input
                    placeholder="0.00"
                    placeholderTextColor={Colors.textGray}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    leftIcon={
                      <MaterialIcon name="ethereum" size={24} color="#627EEA" />
                    }
                    keyboardType="decimal-pad"
                    style={styles.bidInput}
                    error={!!errors.bidAmount}
                    errorMessage={errors.bidAmount?.message}
                  />
                  <Text style={styles.ethLabel}>ETH</Text>
                  {ethPrice > 0 && (
                    <Text style={styles.usdPrice}>≈ ${usdPrice} USD</Text>
                  )}
                </View>
              )}
            />
          </View>

          {/* Quick Bid Buttons */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Bid</Text>
            <View style={styles.quickBidContainer}>
              <TouchableOpacity
                style={styles.quickBidButton}
                onPress={() => setQuickBid(1.05)}>
                <Text style={styles.quickBidLabel}>+5%</Text>
                <Text style={styles.quickBidValue}>
                  {(minBidAmount * 1.05).toFixed(4)} ETH
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.quickBidButton}
                onPress={() => setQuickBid(1.1)}>
                <Text style={styles.quickBidLabel}>+10%</Text>
                <Text style={styles.quickBidValue}>
                  {(minBidAmount * 1.1).toFixed(4)} ETH
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.quickBidButton}
                onPress={() => setQuickBid(1.2)}>
                <Text style={styles.quickBidLabel}>+20%</Text>
                <Text style={styles.quickBidValue}>
                  {(minBidAmount * 1.2).toFixed(4)} ETH
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Warning Box */}
          <View style={styles.warningBox}>
            <Icon name="alert-circle" size={20} color="#F59E0B" />
            <Text style={styles.warningText}>
              If you are outbid, your funds will be available for withdrawal.
              The auction cannot be cancelled once it has active bids.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Action Button */}
      <View style={styles.footer}>
        <Button.Main
          title="View Auction"
          onPress={() => {
            setShowSuccessModal(false);
            navigation.navigate('NoBottomTab', {
              screen: 'AuctionDetail',
              params: {
                auctions: auction,
                auctionId: auction.auctionId,
                walletProvider: walletProvider,
              },
            });
          }}
          style={styles.bidButton}
        />
        <Button.Main
          title="Place Bid"
          onPress={handleSubmit(onSubmit)}
          disabled={isProcessing}
          style={styles.bidButton}
        />
      </View>

      {/* Confirmation Bottom Sheet */}
      <ConfirmBidBottomSheet
        ref={bottomSheetRef}
        auction={auction}
        bidAmount={bidAmount}
        highestBid={highestBid}
        reservePrice={reservePrice}
        isProcessing={isProcessing}
        onConfirm={handlePlaceBid}
      />

      {/* Success Modal */}
      <SuccessBidModal
        visible={showSuccessModal}
        bidAmount={bidAmount}
        onViewAuction={() => {
          setShowSuccessModal(false);
          navigation.navigate('NoBottomTab', {
            screen: 'AuctionDetail',
            params: {auctionId: auction.auctionId},
          });
        }}
        onClose={() => {
          setShowSuccessModal(false);
          navigation.goBack();
        }}
      />
    </SafeAreaView>
  );
};

export default PlaceBidScreen;
