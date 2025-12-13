import {IPFS_GATEWAY} from '@env';
import React, {useState, useRef, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Animated,
  Alert,
  RefreshControl,
} from 'react-native';
import {ethers} from 'ethers';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Feather';
import {useFocusEffect} from '@react-navigation/core';
import {showMessage} from 'react-native-flash-message';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAppKitAccount} from '@reown/appkit-ethers-react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {BackIcon, ShareLineIcon} from '~/assets/icons/icons';

import {Button} from '~/components/ui/Button';
import AnimatedHeader from '~/components/AnimatedHeader';

import {AuctionService} from '~/contracts/AuctionService';

import {useAuctionCountdown} from '~/hooks/useAuctionCountdown';

import {scale} from '~/utils/scaling';
import {formatAddress} from '~/utils/formatAddress';
import {parseBlockchainError} from '~/utils/errors/blockchainErrors';

import {Colors} from '~/theme/theme';
import styles from './AuctionDetail.styles';

const AuctionDetailScreen = ({route, navigation}) => {
  const {address} = useAppKitAccount();
  const {auctions, auctionId, walletProvider} = route.params;
  const scrollY = useRef(new Animated.Value(0)).current;

  const [auction, setAuction] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSettling, setIsSettling] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [showBidHistory, setShowBidHistory] = useState(true);

  const timeLeft = useAuctionCountdown(auction?.endTime);

  // Fetch auction data
  const fetchAuctionData = async () => {
    try {
      const data = await AuctionService.getAuctionById(
        walletProvider,
        auctionId,
      );
      setAuction(data);
    } catch (e) {
      console.log('Fetch auction error:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchAuctionData(auctionId);
    }, [auctionId]),
  );

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchAuctionData();
    setIsRefreshing(false);
  };

  const handleSettleAuction = async () => {
    Alert.alert('Settle Auction', 'This will finalize the auction.', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Settle',
        onPress: async () => {
          setIsSettling(true);
          try {
            showMessage({
              message: 'Settling auction...',
              type: 'info',
              duration: 2000,
            });

            await AuctionService.settleAuction({
              walletProvider,
              auctionId,
            });

            showMessage({
              message: 'Auction settled successfully',
              type: 'success',
            });

            await fetchAuctionData();
          } catch (error) {
            showMessage({
              message: parseBlockchainError(error),
              type: 'danger',
            });
          } finally {
            setIsSettling(false);
          }
        },
      },
    ]);
  };

  const handleCancelAuction = () => {
    Alert.alert('Cancel Auction', 'Are you sure you want to cancel?', [
      {text: 'No', style: 'cancel'},
      {
        text: 'Yes',
        onPress: async () => {
          setIsCancelling(true);
          try {
            AuctionService.cancelAuction({
              walletProvider,
              auctionId,
            });

            showMessage({
              message: 'Auction cancelled successfully',
              type: 'success',
            });
            navigation.goBack();
          } catch (err) {
            showMessage({
              message: parseBlockchainError(err),
              type: 'danger',
            });
          } finally {
            setIsCancelling(false);
          }
        },
      },
    ]);
  };

  const isAuctionActive = () => {
    const now = Math.floor(Date.now() / 1000);
    return !auction?.settled && auction?.endTime > now;
  };

  const isAuctionEnded = () => {
    const now = Math.floor(Date.now() / 1000);
    return auction?.endTime <= now;
  };

  const canSettle = () => {
    return isAuctionEnded() && !auction?.settled;
  };

  const canCancel = () => {
    return (
      auction?.seller?.addressWallet?.toLowerCase() ===
        address?.toLowerCase() &&
      auction?.highestBidder === ethers.ZeroAddress &&
      !auction?.settled
    );
  };

  const canBid = () => {
    return isAuctionActive();
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Loading auction...</Text>
      </SafeAreaView>
    );
  }

  if (!auctions) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Auction not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <LinearGradient
      colors={['#111827', '#001656', '#0F1026']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.gradientBackground}>
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={Colors.background}
          barStyle="light-content"
        />

        <AnimatedHeader
          scrollY={scrollY}
          title={`Auction #${auctionId}`}
          leftComponent={<BackIcon />}
          rightComponents={[
            {icon: <ShareLineIcon />, onPress: () => console.log('Share')},
          ]}
        />

        <Animated.ScrollView
          contentContainerStyle={{paddingBottom: scale(100)}}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: false},
          )}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
            />
          }>
          {/* NFT Image */}
          <View style={styles.imageContainer}>
            <FastImage
              source={{uri: `${IPFS_GATEWAY}${auctions?.image}`}}
              style={styles.nftImage}
              resizeMode="cover"
            />
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>{auctions?.name}</Text>
            <View>
              <View style={styles.timeCard}>
                <Icon name="clock" size={24} color={Colors.primary} />
                <View style={styles.timeInfo}>
                  <Text style={styles.timeLabel}>
                    {isAuctionEnded() ? 'Auction Ended' : 'Time Remaining'}
                  </Text>
                  <Text style={styles.timeValue}>{timeLeft}</Text>
                </View>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  auctions?.settled && styles.statusBadgeSettled,
                  !isAuctionActive() &&
                    !auctions.settled &&
                    styles.statusBadgeEnded,
                ]}>
                <Text style={styles.statusText}>
                  {auctions?.settled
                    ? 'Settled'
                    : isAuctionActive()
                    ? 'Live'
                    : 'Ended'}
                </Text>
              </View>
            </View>

            {/* Current Bid Section */}
            <View style={styles.bidSection}>
              <Text style={styles.sectionTitle}>
                {auction.highestBid > 0 ? 'Current Bid' : 'Reserve Price'}
              </Text>
              <View style={styles.bidRow}>
                <MaterialIcon name="ethereum" size={32} color="#627EEA" />
                <Text style={styles.bidValue}>
                  {auction.highestBid > 0
                    ? auction.highestBid
                    : auction.reservePrice}{' '}
                  ETH
                </Text>
              </View>

              {auction.highestBidder &&
                auction.highestBidder !== ethers.ZeroAddress && (
                  <View style={styles.bidderInfo}>
                    <Text style={styles.bidderLabel}>Leading bidder:</Text>
                    <Text style={styles.bidderAddress}>
                      {formatAddress(auction.highestBidder)}
                    </Text>
                  </View>
                )}
            </View>

            {/* Auction Details */}
            <View style={styles.section}>
              <TouchableOpacity
                style={styles.sectionHeader}
                onPress={() => setShowBidHistory(!showBidHistory)}>
                <Text style={styles.sectionTitle}>Auction Details</Text>
                <Icon
                  name={showBidHistory ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color={Colors.white}
                />
              </TouchableOpacity>

              {showBidHistory && (
                <View style={styles.detailsList}>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Seller</Text>
                    <Text style={styles.detailValue}>
                      {formatAddress(auctions?.seller?.addressWallet)}
                    </Text>
                  </View>

                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Reserve Price</Text>
                    <View style={styles.detailValueRow}>
                      <MaterialIcon name="ethereum" size={14} color="#627EEA" />
                      <Text style={styles.detailValue}>
                        {auction.reservePrice} ETH
                      </Text>
                    </View>
                  </View>

                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Min Increment</Text>
                    <Text style={styles.detailValue}>
                      {(auction.minIncrementBp / 100).toFixed(1)}%
                    </Text>
                  </View>

                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Token ID</Text>
                    <Text style={styles.detailValue}>#{auction.tokenId}</Text>
                  </View>

                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>End Time</Text>
                    <Text style={styles.detailValue}>
                      {new Date(auction.endTime * 1000).toLocaleString()}
                    </Text>
                  </View>
                </View>
              )}
            </View>

            {/* Info Box */}
            <View style={styles.infoBox}>
              <Icon name="info" size={20} color={Colors.primary} />
              <Text style={styles.infoText}>
                {canSettle()
                  ? 'This auction has ended and can be settled.'
                  : isAuctionActive()
                  ? 'Place your bid before the auction ends. If outbid, you can withdraw your funds.'
                  : 'This auction has ended.'}
              </Text>
            </View>
          </View>
        </Animated.ScrollView>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          {canBid() && (
            <Button.Main
              title="Place Bid"
              style={styles.bidButton}
              onPress={() =>
                navigation.navigate('PlaceBid', {
                  auction: auctions,
                  walletProvider: walletProvider,
                  address: address,
                })
              }
            />
          )}

          {canSettle() && (
            <Button.Main
              title={isSettling ? 'Settling...' : 'Settle Auction'}
              style={styles.settleButton}
              isLoading={isSettling}
              onPress={handleSettleAuction}
            />
          )}

          {canCancel() && (
            <Button.Main
              title={isCancelling ? 'Cancelling...' : 'Cancel Auction'}
              style={styles.cancelButton}
              textStyle={styles.cancelButtonText}
              isLoading={isCancelling}
              onPress={handleCancelAuction}
            />
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default AuctionDetailScreen;
