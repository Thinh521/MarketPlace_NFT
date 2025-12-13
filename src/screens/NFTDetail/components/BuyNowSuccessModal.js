import {IPFS_GATEWAY} from '@env';
import React from 'react';
import {View, Text, Modal, StyleSheet, Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {CheckIcon} from '~/assets/icons/icons';
import {Button} from '~/components/ui/Button';

import {TouchableWithoutFeedback} from '@gorhom/bottom-sheet';
import {scale} from '../../../utils/scaling';
import {Colors, FontSizes, FontWeights} from '../../../theme/theme';

const {width, height} = Dimensions.get('window');

const BuyNowSuccessModal = ({visible, onClose, product, navigation}) => (
  <Modal
    transparent
    visible={visible}
    animationType="fade"
    statusBarTranslucent>
    <View style={styles.successModalOverlay}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={StyleSheet.absoluteFillObject} />
      </TouchableWithoutFeedback>

      <View style={styles.successCard}>
        <View style={styles.successIconWrapper}>
          <View style={styles.successIconContainer}>
            <CheckIcon style={styles.successIcon} />
          </View>
        </View>

        <Text style={styles.successTitle}>Purchase Successful!</Text>

        <Text style={styles.successDesc}>
          Congratulations! You've successfully purchased{' '}
          <Text style={styles.successProductName}>{product?.name}</Text>. The
          NFT is now in your collection.
        </Text>

        <View style={styles.successProductCard}>
          <FastImage
            source={{uri: `${IPFS_GATEWAY}${product?.image}`}}
            style={styles.successProductImage}
          />
          <View style={styles.successProductInfo}>
            <Text style={styles.successProductTitle} numberOfLines={1}>
              {product?.name}
            </Text>
            <View style={styles.successProductPriceRow}>
              <MaterialIcon name="ethereum" size={14} color="#627EEA" />
              <Text style={styles.successProductPrice}>
                {product?.price} ETH
              </Text>
            </View>
          </View>
        </View>

        <Button.Main
          title="View in Profile"
          onPress={() => {
            onClose();
            navigation.navigate('BottomTab', {screen: 'Profile'});
          }}
          style={styles.successButton}
          iconLeft={<Icon name="user" size={18} color="white" />}
        />

        <Button.Text
          title="Continue Shopping"
          onPress={() => {
            onClose();
            navigation.navigate('BottomTab', {screen: 'Discover'});
          }}
          style={styles.successCancelButton}
          textStyle={styles.successCancelText}
        />
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  successModalOverlay: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(20),
    backgroundColor: Colors.overlay,
  },
  successCard: {
    width: '100%',
    maxWidth: scale(400),
    borderRadius: scale(24),
    backgroundColor: Colors.background,
    padding: scale(32),
    alignItems: 'center',
    elevation: 25,
  },
  successIconWrapper: {
    marginBottom: scale(24),
  },
  successIconContainer: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 15,
  },
  successIcon: {
    width: scale(40),
    height: scale(40),
  },
  successTitle: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: FontSizes.xlarge,
    fontWeight: FontWeights.bold,
    marginBottom: scale(12),
  },
  successDesc: {
    lineHeight: 22,
    textAlign: 'center',
    color: Colors.textGray,
    fontSize: FontSizes.small,
    marginBottom: scale(24),
  },
  successProductName: {
    color: Colors.primary,
    fontWeight: FontWeights.bold,
  },
  successProductCard: {
    flexDirection: 'row',
    borderRadius: scale(12),
    padding: scale(12),
    width: '100%',
    marginBottom: scale(24),
    gap: scale(12),
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.deepBackground,
  },
  successProductImage: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(8),
  },
  successProductInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  successProductTitle: {
    color: Colors.white,
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.bold,
    marginBottom: scale(6),
  },
  successProductPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
  },
  successProductPrice: {
    color: Colors.ethereum,
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.bold,
  },
  successButton: {
    width: '100%',
    borderRadius: scale(12),
    marginBottom: scale(12),
  },
  successCancelButton: {
    paddingVertical: scale(12),
  },
  successCancelText: {
    color: Colors.textGray,
    fontSize: FontSizes.small,
  },
});

export default BuyNowSuccessModal;
