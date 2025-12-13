import {IPFS_GATEWAY} from '@env';
import React, {forwardRef, useCallback} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Button} from '~/components/ui/Button';

import {Colors, FontSizes, FontWeights} from '~/theme/theme';
import {scale} from '~/utils/scaling';

const ConfirmBidBottomSheet = forwardRef(
  (
    {auction, bidAmount, highestBid, reservePrice, isProcessing, onConfirm},
    ref,
  ) => {
    const snapPoints = ['70%'];

    const renderBackdrop = useCallback(
      props => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.7}
        />
      ),
      [],
    );

    return (
      <BottomSheet
        ref={ref}
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
              <Text style={styles.bottomSheetTitle}>Confirm Bid</Text>
              <Text style={styles.bottomSheetSubtitle}>
                Review your bid details
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => ref.current?.close()}
              style={styles.closeButton}>
              <Icon name="x" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* Preview */}
          <View style={styles.reviewCard}>
            <FastImage
              source={{uri: `${IPFS_GATEWAY}${auction?.image}`}}
              style={styles.reviewImage}
            />
            <View style={styles.reviewInfo}>
              <Text style={styles.reviewProductName}>{auction?.name}</Text>
              <Text style={styles.reviewAuctionInfo}>
                Auction #{auction?.auctionId}
              </Text>
            </View>
          </View>

          {/* Summary */}
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Your Bid</Text>
              <View style={styles.summaryValueRow}>
                <MaterialIcon name="ethereum" size={16} color="#627EEA" />
                <Text style={styles.summaryValue}>{bidAmount} ETH</Text>
              </View>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Current Bid</Text>
              <View style={styles.summaryValueRow}>
                <MaterialIcon name="ethereum" size={14} color="#627EEA" />
                <Text style={styles.summaryValueSmall}>
                  {highestBid > 0
                    ? highestBid.toFixed(4)
                    : reservePrice.toFixed(4)}{' '}
                  ETH
                </Text>
              </View>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Gas Fee (est.)</Text>
              <Text style={styles.summaryValueSmall}>~0.002 ETH</Text>
            </View>

            <View style={styles.summaryDivider} />

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabelTotal}>Total</Text>
              <View style={styles.summaryValueRow}>
                <MaterialIcon name="ethereum" size={18} color="#627EEA" />
                <Text style={styles.summaryValueTotal}>
                  {(parseFloat(bidAmount || 0) + 0.002).toFixed(4)} ETH
                </Text>
              </View>
            </View>
          </View>

          <Button.Main
            title={isProcessing ? 'Processing...' : 'Confirm Bid'}
            isLoading={isProcessing}
            onPress={onConfirm}
            style={styles.confirmButton}
          />

          <View style={styles.noteContainer}>
            <Icon name="info" size={14} color="#6B7280" />
            <Text style={styles.noteText}>
              If outbid, you can withdraw your funds anytime
            </Text>
          </View>
        </BottomSheetView>
      </BottomSheet>
    );
  },
);

const styles = StyleSheet.create({
  // Bottom Sheet
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
  reviewProductName: {
    color: Colors.white,
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.bold,
    marginBottom: scale(6),
  },
  reviewTokenId: {
    color: Colors.textGray,
    fontSize: FontSizes.small,
  },
  reviewAuctionInfo: {
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
    color: Colors.ethereum,
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

export default ConfirmBidBottomSheet;
