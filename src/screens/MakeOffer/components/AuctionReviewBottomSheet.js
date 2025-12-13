import React from 'react';
import {IPFS_GATEWAY} from '@env';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

import {Button} from '~/components/ui/Button';

import {formatEth, formatUsd} from '~/utils/price';
import {scale} from '~/utils/scaling';

import {Colors, FontSizes, FontWeights} from '~/theme/theme';

const AuctionReviewBottomSheet = ({
  bottomSheetRef,
  snapPoints,
  auction,
  reservePrice,
  auctionDurationSeconds,
  minIncrement,
  isProcessing,
  handleCreateAuction,
}) => {
  const safeDuration = auctionDurationSeconds || 0;
  const days = Math.floor(safeDuration / 86400);
  const hours = Math.floor((safeDuration % 86400) / 3600);

  const renderBackdrop = props => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      opacity={0.7}
    />
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.bottomSheetBackground}
      handleIndicatorStyle={styles.bottomSheetIndicator}>
      <BottomSheetView style={styles.bottomSheetContent}>
        {/* Header */}
        <View style={styles.bottomSheetHeader}>
          <View>
            <Text style={styles.bottomSheetTitle}>Confirm Auction</Text>
            <Text style={styles.bottomSheetSubtitle}>
              Review your auction details
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => bottomSheetRef.current?.close()}
            style={styles.closeButton}>
            <Icon name="x" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Preview */}
        <View style={styles.reviewCard}>
          <FastImage
            source={{uri: `${IPFS_GATEWAY}${auction?.image}`}}
            style={styles.reviewImage}
            resizeMode="cover"
          />
          <View style={styles.reviewInfo}>
            <Text style={styles.reviewCollectionName}>Metafacely NFT</Text>
            <Text style={styles.reviewProductName} numberOfLines={2}>
              {auction?.name}
            </Text>
            <View style={styles.reviewQuantityRow}>
              <Icon name="layers" size={14} color="#9CA3AF" />
              <Text style={styles.reviewQuantity}>Quantity: 1</Text>
            </View>
          </View>
          <View style={styles.reviewPriceContainer}>
            <Text style={styles.reviewPriceLabel}>Price</Text>
            <View style={styles.reviewPriceRow}>
              <MaterialIcon name="ethereum" size={18} color="#627EEA" />
              <Text style={styles.reviewPriceValue}>
                {formatEth(auction?.price)} ETH
              </Text>
            </View>
            <Text style={styles.reviewUsdPrice}>
              {formatUsd(auction?.price)}
            </Text>
          </View>
        </View>

        {/* Summary */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Reserve Price</Text>
            <View style={styles.summaryValueRow}>
              <MaterialIcon name="ethereum" size={14} color="#627EEA" />
              <Text style={styles.summaryValue}>{reservePrice} ETH</Text>
            </View>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Duration</Text>
            <Text style={styles.summaryValue}>
              {days} days {hours} hours
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Min Increment</Text>
            <Text style={styles.summaryValue}>{minIncrement}%</Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Platform Fee</Text>
            <Text style={styles.summaryValue}>2.5%</Text>
          </View>
        </View>

        {/* Action */}
        <Button.Main
          title={isProcessing ? 'Creating...' : 'Confirm & Create'}
          disabled={isProcessing}
          onPress={handleCreateAuction}
          style={styles.confirmButton}
        />

        <View style={styles.noteContainer}>
          <Icon name="info" size={14} color="#6B7280" />
          <Text style={styles.noteText}>
            You'll need to approve the NFT transfer in your wallet
          </Text>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  bottomSheetIndicator: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: 40,
    height: 4,
  },
  bottomSheetContent: {
    padding: scale(24),
    paddingBottom: scale(40),
  },
  bottomSheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: scale(24),
  },
  bottomSheetTitle: {
    color: Colors.white,
    fontSize: FontSizes.xlarge,
    fontWeight: FontWeights.bold,
    marginBottom: scale(4),
  },
  bottomSheetSubtitle: {
    color: Colors.textGray,
    fontSize: FontSizes.small,
  },
  closeButton: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Review Card
  reviewCard: {
    flexDirection: 'row',
    borderRadius: scale(16),
    padding: scale(12),
    marginBottom: scale(20),
    gap: scale(12),
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.deepBackground,
  },
  reviewImage: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(12),
  },
  reviewInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  reviewCollectionName: {
    color: Colors.textGray,
    fontSize: FontSizes.small,
    marginBottom: scale(4),
  },
  reviewProductName: {
    color: Colors.white,
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.bold,
    marginBottom: scale(6),
  },
  reviewQuantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
  },
  reviewQuantity: {
    color: Colors.textGray,
    fontSize: FontSizes.small,
  },
  reviewPriceContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  reviewPriceLabel: {
    color: Colors.textGray,
    fontSize: FontSizes.small,
    marginBottom: scale(4),
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  reviewPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
    marginBottom: scale(2),
  },
  reviewPriceValue: {
    fontSize: scale(18),
    fontWeight: '700',
    color: Colors.ethereum,
  },
  reviewUsdPrice: {
    color: Colors.textGray,
    fontSize: FontSizes.small,
  },

  // Summary
  summaryContainer: {
    borderRadius: scale(12),
    padding: scale(16),
    marginBottom: scale(20),
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.deepBackground,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scale(8),
  },
  summaryLabel: {
    color: Colors.textGray,
    fontSize: FontSizes.small,
  },
  summaryValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
  },
  summaryValue: {
    color: Colors.white,
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.bold,
  },
  summaryValueSmall: {
    color: Colors.textGray,
    fontSize: FontSizes.small,
    fontWeight: FontWeights.semiBold,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: scale(8),
  },
  summaryLabelTotal: {
    color: Colors.white,
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.bold,
  },
  summaryValueTotal: {
    fontSize: scale(18),
    color: Colors.ethereum,
    fontWeight: '700',
  },

  // Confirm Button
  confirmButton: {
    width: '100%',
    borderRadius: scale(12),
    marginBottom: scale(16),
  },

  // Note
  noteContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: scale(8),
    justifyContent: 'center',
    paddingHorizontal: scale(16),
  },
  noteText: {
    textAlign: 'center',
    color: '#6B7280',
    fontSize: scale(12),
    lineHeight: scale(18),
    flex: 1,
  },
});

export default AuctionReviewBottomSheet;
