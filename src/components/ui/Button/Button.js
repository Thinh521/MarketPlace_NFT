import React from 'react';
import {TouchableOpacity, Text, View, ActivityIndicator} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';

import {Colors} from '~/theme/theme';
import {styles} from './Button.styles';

const createHandlePress = (onPress, disabled, loading) => () => {
  if (disabled || loading) return;
  onPress?.();
};

// ================== MAIN BUTTON ==================
const ButtonMain = ({
  title,
  onPress,
  iconLeft,
  iconRight,
  disabled = false,
  loading = false,
  style,
  textStyle,
  testID,
  accessibilityLabel,
  spaceBetween = false,
  gradientColors = [Colors.secondary, Colors.primary],
  useGradient = false,
  ...props
}) => {
  const handlePress = createHandlePress(onPress, disabled, loading);

  const content = (
    <View
      style={[
        styles.buttonContent,
        spaceBetween && {justifyContent: 'space-between'},
      ]}>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={styles.baseText.color}
          style={styles.loadingIndicator}
        />
      ) : (
        <>
          {iconLeft && (
            <View style={[styles.iconWrapper, styles.iconLeft]}>
              {iconLeft}
            </View>
          )}
          {title && (
            <Text
              style={[
                styles.baseText,
                disabled && styles.disabledText,
                textStyle,
              ]}
              numberOfLines={1}>
              {title}
            </Text>
          )}
          {iconRight && (
            <View style={[styles.iconWrapper, styles.iconRight]}>
              {iconRight}
            </View>
          )}
        </>
      )}
    </View>
  );

  if (useGradient) {
    return (
      <LinearGradient
        colors={
          disabled
            ? [Colors.disabledBackground, Colors.disabledBackground]
            : gradientColors
        }
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={[styles.gradientWrapper, style, disabled && {opacity: 0.6}]}>
        <TouchableOpacity
          onPress={handlePress}
          disabled={disabled || loading}
          testID={testID}
          accessibilityLabel={accessibilityLabel || title}
          accessibilityRole="button"
          accessibilityState={{disabled: disabled || loading}}
          activeOpacity={0.8}
          style={[styles.baseButton, {backgroundColor: 'transparent'}]}
          {...props}>
          {content}
        </TouchableOpacity>
      </LinearGradient>
    );
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled || loading}
      testID={testID}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityRole="button"
      accessibilityState={{disabled: disabled || loading}}
      activeOpacity={0.8}
      style={[styles.baseButton, disabled && styles.disabledButton, style]}
      {...props}>
      {content}
    </TouchableOpacity>
  );
};

// ================== TEXT BUTTON ==================
const ButtonText = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  style,
  textStyle,
  testID,
  accessibilityLabel,
  ...props
}) => {
  const handlePress = createHandlePress(onPress, disabled, loading);
  return (
    <TouchableOpacity
      style={[
        styles.textButtonContainer,
        disabled && styles.disabledTextButton,
        style,
      ]}
      onPress={handlePress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...props}>
      {loading ? (
        <ActivityIndicator size="small" color={styles.textButtonText.color} />
      ) : (
        <Text
          style={[
            styles.textButtonText,
            disabled && styles.disabledTextButtonText,
            textStyle,
          ]}
          numberOfLines={1}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

// ================== ICON BUTTON ==================
const ButtonIcon = ({
  onPress,
  icon,
  disabled = false,
  loading = false,
  style,
  testID,
  accessibilityLabel,
  useGradient = false,
  gradientColors = ['#667eea', '#764ba2'],
  ...props
}) => {
  const handlePress = createHandlePress(onPress, disabled, loading);

  const inner = (
    <View style={styles.iconContainer}>
      {loading ? <ActivityIndicator size="small" color="#fff" /> : icon}
    </View>
  );

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      style={[styles.iconButton, disabled && styles.disabledButton, style]}
      {...props}>
      {useGradient ? (
        <LinearGradient
          colors={gradientColors}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.gradientWrapper}>
          {inner}
        </LinearGradient>
      ) : (
        inner
      )}
    </TouchableOpacity>
  );
};

// ================== IMAGE BUTTON ==================
const ButtonImg = ({
  onPress,
  img,
  disabled = false,
  loading = false,
  style,
  imageStyle,
  testID,
  accessibilityLabel,
  placeholder,
  resizeMode = 'contain',
  useGradient = false,
  gradientColors = ['#667eea', '#764ba2'],
  ...props
}) => {
  const handlePress = createHandlePress(onPress, disabled, loading);

  const inner = loading ? (
    <ActivityIndicator size="small" color="#fff" />
  ) : img ? (
    <FastImage
      source={typeof img === 'string' ? {uri: img} : img}
      style={imageStyle}
      resizeMode={
        FastImage.resizeMode[resizeMode] || FastImage.resizeMode.contain
      }
    />
  ) : (
    placeholder && <View style={imageStyle}>{placeholder}</View>
  );

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      style={[styles.imgButton, disabled && styles.disabledButton, style]}
      {...props}>
      {useGradient ? (
        <LinearGradient colors={gradientColors} style={styles.gradientWrapper}>
          {inner}
        </LinearGradient>
      ) : (
        inner
      )}
    </TouchableOpacity>
  );
};

// Export unified
const Button = {
  Main: ButtonMain,
  Text: ButtonText,
  Icon: ButtonIcon,
  Image: ButtonImg,
};

export default Button;
export {ButtonMain, ButtonText, ButtonIcon, ButtonImg};
