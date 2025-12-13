import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Text, Animated} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Button} from '../ui/Button';
import {ErrorLineIcon} from '~/assets/icons/icons';

import {Colors, FontSizes, FontWeights} from '~/theme/theme';
import {scale} from '~/utils/scaling';

const ERROR_PRESETS = {
  network: {
    title: 'Connection error',
    subtitle: 'Please check your internet connection and try again.',
  },
  not_found: {
    title: 'Not found',
    subtitle: 'The requested content could not be found.',
  },
  server: {
    title: 'Server error',
    subtitle: 'The server is not responding. Please try again later.',
  },
  default: {
    title: 'Something went wrong',
    subtitle: 'Please try again later.',
  },
};

const CustomError = ({
  type = 'default',
  title,
  subtitle,
  buttonText,
  onRetry,
  containerStyle,
  icon: IconComponent,
  showButton = true,
  loading = false,
}) => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  const preset = ERROR_PRESETS[type] || ERROR_PRESETS.default;

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

  const handlePress = () => {
    if (loading) return;

    if (onRetry) onRetry();
    else navigation.goBack();
  };

  // Fallback icon
  const IconView = IconComponent || ErrorLineIcon;

  return (
    <View style={[styles.errorContainer, containerStyle]}>
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
            <IconView style={styles.errorIcon} />
          </View>
        </View>

        <Text style={styles.title}>{title || preset.title}</Text>

        {(subtitle || preset.subtitle) && (
          <Text style={styles.subtitleTitle}>
            {subtitle || preset.subtitle}
          </Text>
        )}

        {showButton && (
          <Button.Main
            title={
              loading
                ? 'Please wait...'
                : buttonText || (onRetry ? 'Retry' : 'Go back')
            }
            onPress={handlePress}
            style={styles.retryButton}
            disabled={loading}
          />
        )}
      </Animated.View>
    </View>
  );
};

export default CustomError;

const styles = StyleSheet.create({
  errorContainer: {
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
  errorIcon: {
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
  retryButton: {
    width: scale(180),
  },
});
