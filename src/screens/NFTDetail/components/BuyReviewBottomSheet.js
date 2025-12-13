import {IPFS_GATEWAY} from '@env';
import React, {useState, useMemo, useCallback} from 'react';
import {View, Text, TouchableOpacity, Switch, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

import {Button} from '~/components/ui/Button';

import {Colors, FontSizes, FontWeights} from '~/theme/theme';
import {scale} from '~/utils/scaling';

const BuyReviewBottomSheet = ({
  bottomSheetRef,
  product,
  onConfirm,
  loading,
}) => {
  const [sendToDifferentWallet, setSendToDifferentWallet] = useState(false);
  const snapPoints = useMemo(() => ['65%'], []);
  const ethPrice = parseFloat(product?.price || 0);
  const usdPrice = (ethPrice * 2500).toFixed(2);

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
            <Text style={styles.bottomSheetTitle}>Complete Purchase</Text>
            <Text style={styles.bottomSheetSubtitle}>
              Review your transaction details
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => bottomSheetRef.current?.close()}
            style={styles.closeButton}>
            <Icon name="x" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Product */}
        <View style={styles.reviewCard}>
          <FastImage
            source={{uri: `${IPFS_GATEWAY}${product?.image}`}}
            style={styles.reviewImage}
            resizeMode="contain"
          />
          <View style={styles.reviewInfo}>
            <Text style={styles.reviewCollectionName}>Metafacely NFT</Text>
            <Text style={styles.reviewProductName} numberOfLines={2}>
              {product?.name}
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
              <Text style={styles.reviewPriceValue}>{ethPrice}</Text>
            </View>
            <Text style={styles.reviewUsdPrice}>${usdPrice}</Text>
          </View>
        </View>

        {/* Summary */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <View style={styles.summaryValueRow}>
              <MaterialIcon name="ethereum" size={14} color="#627EEA" />
              <Text style={styles.summaryValue}>{ethPrice}</Text>
            </View>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Gas Fee</Text>
            <Text style={[styles.summaryValue, {color: Colors.white}]}>
              ~0.002 ETH
            </Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabelTotal}>Total</Text>
            <View style={styles.summaryValueRow}>
              <MaterialIcon name="ethereum" size={16} color="#627EEA" />
              <Text style={styles.summaryValueTotal}>
                {(ethPrice + 0.002).toFixed(4)}
              </Text>
            </View>
          </View>
        </View>

        {/* Option */}
        <View style={styles.optionCard}>
          <View style={styles.optionRow}>
            <View style={styles.optionLeft}>
              <Icon name="send" size={18} color={Colors.primary} />
              <Text style={styles.optionText}>Send to Different Wallet</Text>
            </View>
            <Switch
              value={sendToDifferentWallet}
              onValueChange={setSendToDifferentWallet}
              trackColor={{false: '#374151', true: Colors.primary}}
              thumbColor="#FFFFFF"
              ios_backgroundColor="#374151"
            />
          </View>
        </View>

        {/* Confirm */}
        <Button.Main
          title={loading ? 'Processing...' : 'Confirm Purchase'}
          isLoading={loading}
          onPress={onConfirm}
          style={styles.confirmButton}
        />

        <View style={styles.noteContainer}>
          <Icon name="info" size={14} color="#6B7280" />
          <Text style={styles.noteText}>
            You'll be asked to confirm this transaction in your wallet
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
  optionCard: {
    borderRadius: scale(12),
    padding: scale(16),
    marginBottom: scale(20),
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.deepBackground,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
    flex: 1,
  },
  optionText: {
    color: Colors.white,
    fontSize: scale(15),
    fontWeight: '500',
  },
  confirmButton: {
    width: '100%',
    borderRadius: scale(12),
    marginBottom: scale(16),
  },
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

export default BuyReviewBottomSheet;
