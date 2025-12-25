import React, {useEffect, useRef, useState, useCallback, useMemo} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Animated,
  useWindowDimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {LinearGradient} from 'react-native-linear-gradient';

import Images from '~/assets/images/images';
import {Button} from '~/components/ui/Button';

import {scale} from '~/utils/scaling';
import {FontSizes, FontWeights, Colors} from '~/theme/theme';

const nftBanners = [
  {
    id: '1',
    title: 'Exclusive NFT Drop',
    subtitle: 'Limited Edition',
    description: 'Discover rare 1/1 NFTs from top digital artists worldwide.',
    nft: {
      id: 'nft-001',
      title: 'Apollo Genesis',
      image: Images.banner_1,
      creator: 'Apolo Studio',
      price: '2.4 ETH',
    },
    colors: ['#9333EA', '#DB2777', '#3B82F6'],
  },
  {
    id: '2',
    title: 'Trending Collections',
    subtitle: 'Hot This Week',
    description: 'Explore NFT collections with the highest trading volume.',
    nft: {
      id: 'nft-002',
      title: 'Neon Samurai',
      image: Images.banner_2,
      creator: 'NeoVerse',
      price: '1.1 ETH',
    },
    colors: ['#06B6D4', '#3B82F6', '#8B5CF6'],
  },
  {
    id: '3',
    title: 'Create & Sell',
    subtitle: 'Your Digital Assets',
    description: 'Mint, list, and sell your NFTs in just a few clicks.',
    nft: {
      id: 'nft-003',
      title: 'Abstract Mind',
      image: Images.banner_3,
      creator: 'MindLab',
      price: '0.6 ETH',
    },
    colors: ['#F97316', '#EF4444', '#EC4899'],
  },
];

const CarouselItem = React.memo(({item, index, scrollX, width}) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0.6, 1, 0.6],
    extrapolate: 'clamp',
  });

  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.9, 1, 0.9],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        styles.bannerContainer,
        {
          width,
          opacity,
          transform: [{scale}],
        },
      ]}>
      <LinearGradient
        colors={item.colors}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.gradientBackground}>
        <View style={styles.backgroundCircle1} />
        <View style={styles.backgroundCircle2} />
        <View style={styles.contentContainer}>
          <View style={styles.textContent}>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
            <Text style={styles.title} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={styles.description} numberOfLines={2}>
              {item.description}
            </Text>
            <Button.Main
              title="Explore Now"
              style={styles.ctaButton}
              textStyle={styles.ctaButtonText}
            />
          </View>
          <View style={styles.nftCardContainer}>
            <View style={styles.nftCard}>
              <FastImage
                source={item.nft.image}
                style={styles.nftCardImage}
                resizeMode="cover"
              />
              <View style={styles.nftCardInfo}>
                <Text style={styles.nftCardInfoTitle}>{item.nft.title}</Text>
                <Text style={styles.nftCardInfoPrice}>{item.nft.price}</Text>
              </View>
            </View>
            <View style={[styles.floatingDot, styles.floatingDot1]} />
            <View style={[styles.floatingDot, styles.floatingDot2]} />
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
});

const EnhancedCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const {width: windowWidth} = useWindowDimensions();
  const width = useMemo(() => windowWidth, [windowWidth]);
  const flatListRef = useRef(null);
  const intervalRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  // Memoize viewability config
  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
    minimumViewTime: 100,
  }).current;

  // Memoize callback
  const onViewableItemsChanged = useRef(
    useCallback(({viewableItems}) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index ?? 0);
      }
    }, []),
  ).current;

  const startAutoScroll = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      if (flatListRef.current && nftBanners.length > 0) {
        setCurrentIndex(prev => {
          const nextIndex = (prev + 1) % nftBanners.length;
          flatListRef.current?.scrollToIndex({
            index: nextIndex,
            animated: true,
          });
          return nextIndex;
        });
      }
    }, 5000);
  }, []);

  const stopAutoScroll = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  const handleDotPress = useCallback(
    index => {
      stopAutoScroll();
      setCurrentIndex(index);
      flatListRef.current?.scrollToIndex({index, animated: true});
      setTimeout(startAutoScroll, 3000);
    },
    [startAutoScroll, stopAutoScroll],
  );

  useEffect(() => {
    startAutoScroll();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [startAutoScroll]);

  // Render item memoized
  const renderItem = useCallback(
    ({item, index}) => (
      <CarouselItem item={item} index={index} scrollX={scrollX} width={width} />
    ),
    [scrollX, width],
  );

  // Key extractor memoized
  const keyExtractor = useCallback(item => item.id, []);

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={nftBanners}
        horizontal
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={width}
        decelerationRate="fast"
        bounces={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        scrollEventThrottle={16}
        renderItem={renderItem}
        removeClippedSubviews={true}
        maxToRenderPerBatch={3}
        windowSize={3}
        initialNumToRender={3}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />

      {/* Simplified Dots Indicator */}
      <View style={styles.dotsContainer}>
        {nftBanners.map((_, index) => {
          const isActive = index === currentIndex;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleDotPress(index)}
              activeOpacity={0.8}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
              <View
                style={[
                  styles.dot,
                  isActive ? styles.activeDot : styles.inactiveDot,
                ]}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default EnhancedCarousel;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  bannerContainer: {
    height: scale(200),
    paddingHorizontal: scale(16),
  },
  gradientBackground: {
    flex: 1,
    borderRadius: scale(20),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  backgroundCircle1: {
    position: 'absolute',
    top: -scale(60),
    left: -scale(40),
    width: scale(150),
    height: scale(150),
    borderRadius: scale(75),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  backgroundCircle2: {
    position: 'absolute',
    bottom: -scale(40),
    right: -scale(60),
    width: scale(200),
    height: scale(200),
    borderRadius: scale(100),
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: scale(20),
    justifyContent: 'space-between',
  },
  textContent: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: scale(12),
  },
  subtitle: {
    fontSize: FontSizes.xsmall,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: FontWeights.semiBold,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: scale(4),
  },
  title: {
    fontSize: FontSizes.semiLarge,
    fontWeight: FontWeights.semiBold,
    color: Colors.white,
    marginBottom: scale(4),
    lineHeight: scale(28),
  },
  description: {
    maxWidth: 200,
    lineHeight: 20,
    marginBottom: scale(16),
    fontSize: FontSizes.xsmall,
    color: 'rgba(255, 255, 255, 0.85)',
  },
  ctaButton: {
    width: scale(140),
    backgroundColor: Colors.white,
    borderRadius: scale(999),
    alignSelf: 'flex-start',
  },
  ctaButtonText: {
    color: Colors.title,
  },
  nftCardContainer: {
    position: 'absolute',
    right: scale(20),
    top: scale(32),
    width: scale(100),
    height: scale(140),
  },
  nftCard: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: scale(12),
    padding: scale(8),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  nftCardImage: {
    width: '100%',
    height: scale(80),
    borderRadius: scale(8),
    marginBottom: scale(8),
  },
  nftCardInfo: {
    gap: scale(4),
  },
  nftCardInfoTitle: {
    color: Colors.white,
    fontSize: FontSizes.xsmall,
  },
  nftCardInfoPrice: {
    color: Colors.white,
    fontWeight: FontWeights.bold,
    marginBottom: scale(2),
    fontSize: FontSizes.xsmall,
  },
  nftCardLine: {
    height: scale(6),
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: scale(3),
    width: '80%',
  },
  floatingDot: {
    position: 'absolute',
    borderRadius: 9999,
    backgroundColor: Colors.yellowColor,
  },
  floatingDot1: {
    width: scale(16),
    height: scale(16),
    top: -scale(8),
    right: -scale(8),
  },
  floatingDot2: {
    width: scale(20),
    height: scale(20),
    bottom: -scale(10),
    left: -scale(10),
    backgroundColor: Colors.primary,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(20),
    gap: scale(8),
  },
  dot: {
    height: scale(8),
    borderRadius: scale(4),
  },
  activeDot: {
    width: scale(24),
    backgroundColor: Colors.primary,
  },
  inactiveDot: {
    width: scale(8),
    backgroundColor: '#D1D5DB',
  },
});
