import {IPFS_GATEWAY} from '@env';
import React from 'react';
import {
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import Images from '~/assets/images/images';
import {EditIcon, CheckIcon} from '~/assets/icons/icons';

import {Colors, FontSizes, FontWeights} from '~/theme/theme';
import {scale} from '~/utils/scaling';

const {width} = Dimensions.get('window');

const Product_2Card = ({
  item,
  onPress,
  onEditPress,
  selectMode = false,
  isSelected = false,
  onSelectToggle,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        selectMode && isSelected && styles.productCardSelected,
      ]}
      onPress={selectMode ? () => onSelectToggle(item.id) : onPress}
      activeOpacity={0.9}>
      {!selectMode && onEditPress !== false && (
        <TouchableOpacity style={styles.editButton} onPress={onEditPress}>
          <EditIcon />
        </TouchableOpacity>
      )}
      <FastImage
        source={
          item?.image
            ? {
                uri: `${IPFS_GATEWAY}${item?.image}`,
              }
            : Images.card_1
        }
        style={styles.image}
        resizeMode="cover"
      />
      {selectMode && (
        <View
          style={[
            styles.selectionIndicator,
            isSelected && styles.selectionIndicatorActive,
          ]}>
          {isSelected && <CheckIcon style={styles.checkIcon} />}
        </View>
      )}
      <Text style={styles.name} numberOfLines={1}>
        {item.name}
      </Text>
      <Text style={styles.price}>{item.price} ETH</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: (width - scale(46)) / 2,
    marginRight: scale(12),
    backgroundColor: 'rgba(17, 24, 39, 0.5)',
    borderRadius: scale(16),
    padding: scale(10),
    borderWidth: 1,
    borderColor: Colors.border,
  },
  productCardSelected: {
    borderColor: Colors.primary,
    backgroundColor: 'rgba(1, 197, 186, 0.05)',
  },
  editButton: {
    position: 'absolute',
    top: scale(10),
    right: scale(10),
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: scale(6),
    borderTopRightRadius: scale(8),
    borderBottomLeftRadius: scale(8),
  },
  image: {
    width: '100%',
    height: scale(130),
    borderRadius: scale(8),
    backgroundColor: Colors.deepBackground,
  },
  selectionIndicator: {
    position: 'absolute',
    top: scale(8),
    right: scale(8),
    width: scale(28),
    height: scale(28),
    borderRadius: scale(14),
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderWidth: 2,
    borderColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectionIndicatorActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  checkIcon: {
    width: scale(14),
    height: scale(14),
  },
  name: {
    color: Colors.white,
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.extraBold,
    marginTop: scale(10),
  },
  description: {
    color: Colors.textGray,
    fontSize: FontSizes.small,
    fontWeight: FontWeights.regular,
    marginTop: scale(6),
    lineHeight: 20,
  },
  price: {
    color: Colors.primary,
    fontSize: FontSizes.small,
    fontWeight: FontWeights.extraBold,
    marginTop: scale(6),
  },
});

export default Product_2Card;
