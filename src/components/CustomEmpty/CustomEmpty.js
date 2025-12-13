import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';

import {BoxLineIcon, SearchIcon, ShoppingLineIcon} from '~/assets/icons/icons';

import {Colors, FontSizes, FontWeights} from '~/theme/theme';
import {scale} from '~/utils/scaling';

const EMPTY_PRESET = {
  noData: {
    icon: BoxLineIcon,
    title: 'No data available',
    subtitle: 'There is currently no data to display.',
  },
  noProduct: {
    icon: ShoppingLineIcon,
    title: 'No products found',
    subtitle: 'Please check back later when new products are available.',
  },
  noSearch: {
    icon: SearchIcon,
    title: 'No results',
    subtitle: 'Try searching with different keywords.',
  },
  default: {
    icon: BoxLineIcon,
    title: 'Nothing here',
    subtitle: 'We couldn’t find any matching content.',
  },
};

const CustomEmpty = ({type = 'default', title, subtitle, containerStyle}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  const preset = EMPTY_PRESET[type] || EMPTY_PRESET.default;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const IconView = preset.icon;

  return (
    <View style={[styles.emptyContainer, containerStyle]}>
      <Animated.View
        style={[
          styles.contentWrapper,
          {
            opacity: fadeAnim,
            transform: [{scale: scaleAnim}],
          },
        ]}>
        <View style={styles.iconContainer}>
          <View style={styles.iconBackground}>
            <IconView style={styles.icon} />
          </View>
        </View>

        <Text style={styles.title}>{title || preset.title}</Text>

        {subtitle !== undefined ? (
          <Text style={styles.subtitleTitle}>{subtitle}</Text>
        ) : (
          preset.subtitle && (
            <Text style={styles.subtitleTitle}>{preset.subtitle}</Text>
          )
        )}
      </Animated.View>
    </View>
  );
};

export default CustomEmpty;

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scale(40),
    paddingHorizontal: scale(24),
  },
  contentWrapper: {
    width: '100%',
    alignItems: 'center',
    maxWidth: scale(400),
  },
  iconContainer: {
    marginBottom: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBackground: {
    width: scale(100),
    height: scale(100),
    borderRadius: scale(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    backgroundColor: Colors.overlayLight,
    borderColor: Colors.borderLightTransparent,
  },
  icon: {
    width: scale(50),
    height: scale(50),
  },
  title: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.bold,
    marginBottom: scale(8),
    paddingHorizontal: scale(16),
  },
  subtitleTitle: {
    textAlign: 'center',
    color: Colors.textHighlight,
    fontSize: FontSizes.small,
    marginBottom: scale(26),
    paddingHorizontal: scale(24),
    lineHeight: 20,
  },
});
