import React from 'react';
import {View, Text, Modal, StyleSheet, Dimensions} from 'react-native';

import {CheckIcon} from '~/assets/icons/icons';

import {Button} from '~/components/ui/Button';

import {Colors, FontSizes, FontWeights} from '~/theme/theme';
import {scale} from '~/utils/scaling';

const {width, height} = Dimensions.get('window');

const SuccessBidModal = ({visible, bidAmount, onViewAuction, onClose}) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.successModalOverlay}>
        <View style={styles.successCard}>
          <View style={styles.successIconWrapper}>
            <View style={styles.successIconContainer}>
              <CheckIcon style={styles.successIcon} />
            </View>
          </View>

          <Text style={styles.successTitle}>Bid Placed Successfully!</Text>

          <Text style={styles.successDesc}>
            Your bid of{' '}
            <Text style={styles.successBidAmount}>{bidAmount} ETH</Text> has
            been placed. You'll be notified if you're outbid.
          </Text>

          <Button.Main
            title="View Auction"
            onPress={onViewAuction}
            style={styles.successButton}
          />

          <Button.Text
            title="Close"
            onPress={onClose}
            style={styles.successCancelButton}
            textStyle={styles.successCancelText}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  successModalOverlay: {
    width,
    height,
    backgroundColor: Colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(20),
  },
  successCard: {
    width: '100%',
    maxWidth: scale(400),
    borderRadius: scale(24),
    backgroundColor: Colors.background,
    padding: scale(32),
    alignItems: 'center',
  },
  successIconWrapper: {
    marginBottom: scale(24),
  },
  successIconContainer: {
    width: scale(80),
    height: scale(80),
    borderRadius: 999,
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
  successBidAmount: {
    color: Colors.primary,
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

export default SuccessBidModal;
