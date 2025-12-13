import {API_BASE, IPFS_GATEWAY} from '@env';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import Images from '~/assets/images/images';
import {
  FlashIcon,
  FireIcon,
  HeartLineIcon,
  CheckIcon,
  HeartIcon,
} from '~/assets/icons/icons';

import {Colors, FontSizes, FontWeights} from '~/theme/theme';
import {scale} from '~/utils/scaling';

const {width} = Dimensions.get('window');

const ProductCard = ({product, layout = 'grid', onPress}) => {
  const isSlider = layout === 'slider';

  return (
    <TouchableOpacity
      style={[styles.card, isSlider && styles.cardSlider]}
      activeOpacity={0.85}
      onPress={onPress}>
      <View
        style={[
          styles.imageContainer,
          isSlider && styles.imageContainerSlider,
        ]}>
        <FastImage
          source={
            product?.image
              ? {
                  uri: `${IPFS_GATEWAY}${product?.image}`,
                }
              : Images.card_1
          }
          style={styles.image}
          resizeMode="cover"
        />

        {/* Badge */}
        <View style={styles.badgeContainer}>
          {product.tags?.map(tag => {
            const tagName = tag.name?.toLowerCase();

            if (tagName === 'hot') {
              return (
                <View key={tag.id} style={[styles.badge, styles.badgeFeatured]}>
                  <FireIcon style={styles.tagHotIcon} />
                  <Text style={[styles.badgeText, {color: Colors.purpleColor}]}>
                    Hot
                  </Text>
                </View>
              );
            }

            if (tagName === 'Trending') {
              return (
                <View key={tag.id} style={[styles.badge, styles.badgeRare]}>
                  <FlashIcon style={styles.tagTrendIcon} />
                  <Text style={[styles.badgeText, {color: Colors.pinkColor}]}>
                    Trending
                  </Text>
                </View>
              );
            }
            return null;
          })}
        </View>
      </View>

      <View style={[styles.content, isSlider && styles.contentSlider]}>
        <Text
          style={[styles.title, isSlider && styles.titleSlider]}
          numberOfLines={isSlider ? 2 : 1}>
          {product.name}
        </Text>

        <View style={styles.priceStock}>
          <Text style={styles.price}>{product.price} ETH</Text>
          <Text style={styles.stock}>
            In stock:{' '}
            {product.instock != null ? product.instock : product.supply}
          </Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.artist}>
            <View style={styles.avatarContainer}>
              <FastImage
                source={
                  product?.creator?.avatar
                    ? {
                        uri: `${API_BASE}/api/upload/${product.creator.avatar}`,
                      }
                    : Images.avatar
                }
                style={styles.avatar}
                resizeMode="cover"
              />
              <View style={styles.checkBadge}>
                <CheckIcon style={styles.checkIcon} />
              </View>
            </View>
            <Text
              style={[styles.artistName, isSlider && styles.artistNameSlider]}
              numberOfLines={1}>
              {product?.creator?.fullName || 'No name'}
            </Text>
          </View>

          <View style={styles.likesContainer}>
            {product.isLike ? (
              <HeartIcon style={styles.heartIcon} />
            ) : (
              <HeartLineIcon style={styles.heartIcon} />
            )}
            {product.likeCount > 0 && (
              <Text style={styles.likes}>{product.likeCount}</Text>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  cardSlider: {
    width: width * 0.7,
    marginRight: scale(16),
  },
  imageContainer: {
    height: scale(140),
    backgroundColor: Colors.deepBackground,
  },
  imageContainerSlider: {
    height: scale(160),
    backgroundColor: Colors.deepBackground,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badgeContainer: {
    position: 'absolute',
    top: scale(8),
    left: scale(8),
    flexDirection: 'row',
    gap: scale(6),
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    minHeight: 22,
  },
  tagHotIcon: {
    width: 10,
    height: 10,
    color: Colors.purpleColor,
    marginRight: 4,
  },
  tagTrendIcon: {
    width: 10,
    height: 10,
    color: Colors.pinkColor,
    marginRight: 4,
  },
  badgeRare: {
    backgroundColor: Colors.badgePink,
  },
  badgeFeatured: {
    backgroundColor: Colors.badgePurple,
  },
  badgeDate: {
    backgroundColor: Colors.primary,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  content: {
    padding: scale(10),
  },
  contentSlider: {
    padding: scale(14),
  },
  title: {
    color: Colors.white,
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.medium,
    marginBottom: scale(8),
    lineHeight: 22,
  },
  priceStock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: scale(8),
    marginBottom: scale(8),
    borderBottomWidth: 1,
    borderBlockColor: Colors.border,
  },
  price: {
    color: Colors.yellowColor,
    fontSize: FontSizes.small,
  },
  stock: {
    color: Colors.textGray,
    fontSize: FontSizes.small,
  },
  titleSlider: {
    fontSize: FontSizes.semiLarge,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  artist: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatarContainer: {
    position: 'relative',
    width: 18,
    height: 18,
  },
  checkBadge: {
    position: 'absolute',
    bottom: -4,
    right: -6,
    backgroundColor: Colors.accent,
    borderRadius: 999,
    padding: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: {
    width: scale(8),
    height: scale(8),
  },
  avatar: {
    width: scale(20),
    height: scale(20),
    borderRadius: 999,
  },
  artistName: {
    color: Colors.textGray,
    fontSize: FontSizes.xsmall,
  },
  artistNameSlider: {
    maxWidth: 'auto',
  },
  likesContainer: {
    gap: scale(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
  heartIcon: {
    width: scale(14),
    height: scale(14),
  },
  likes: {
    color: Colors.white,
    fontSize: FontSizes.xsmall,
  },
});

export default React.memo(ProductCard);
