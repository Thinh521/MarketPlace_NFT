import React, {useEffect, useRef, useCallback} from 'react';
import {
  View,
  Animated,
  TouchableOpacity,
  Text,
  StyleSheet,
  Keyboard,
  Platform,
} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useAuthStore} from '~/stores/useAuthStore';

import {FontSizes, FontWeights, Shadows, Colors} from '~/theme/theme';
import {scale} from '~/utils/scaling';

const CustomTabBar = ({state, descriptors, navigation, config = {}}) => {
  const insets = useSafeAreaInsets();
  const accessToken = useAuthStore(state => state.accessToken);
  const visible = useRef(new Animated.Value(1)).current;
  const iconScales = useRef(
    state.routes.map(() => new Animated.Value(1)),
  ).current;

  const {
    activeColor = Colors.white,
    inactiveColor = Colors.textHighlight,
    backgroundColor = Colors.background,
    centerActiveColor = Colors.primary,
    centerInactiveColor = Colors.deepBackground,
    tabHeight = 76,
    centerButtonSize = 60,
    iconSize = 24,
    iconAnimationScale = 1,
    animationDuration = 250,
    hideOnKeyboard = true,
    onPress = () => {},
    onLongPress = () => {},
  } = config;

  const animateIcons = useCallback(
    newIndex => {
      const animations = iconScales.map((scale, index) =>
        Animated.timing(scale, {
          toValue: index === newIndex ? iconAnimationScale : 1,
          duration: animationDuration,
          useNativeDriver: true,
        }),
      );
      Animated.parallel(animations).start();
    },
    [iconAnimationScale, iconScales, animationDuration],
  );

  const handlePressIn = useCallback(
    index => {
      Animated.timing(iconScales[index], {
        toValue: iconAnimationScale * 1.1,
        duration: animationDuration / 1.5,
        useNativeDriver: true,
      }).start();
    },
    [iconAnimationScale, iconScales, animationDuration],
  );

  const handlePressOut = useCallback(
    (index, isFocused) => {
      Animated.timing(iconScales[index], {
        toValue: isFocused ? iconAnimationScale : 1,
        duration: animationDuration,
        useNativeDriver: true,
      }).start();
    },
    [iconAnimationScale, iconScales, animationDuration],
  );

  useEffect(() => {
    animateIcons(state.index);
  }, [state.index, animateIcons]);

  useEffect(() => {
    if (!hideOnKeyboard) return;

    const showEvent =
      Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow';
    const hideEvent =
      Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide';

    const showListener = Keyboard.addListener(showEvent, () =>
      Animated.timing(visible, {
        toValue: 0,
        duration: animationDuration * 2,
        useNativeDriver: true,
      }).start(),
    );
    const hideListener = Keyboard.addListener(hideEvent, () =>
      Animated.timing(visible, {
        toValue: 1,
        duration: animationDuration * 2,
        useNativeDriver: true,
      }).start(),
    );

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, [hideOnKeyboard, animationDuration]);

  const tabBarHeight = tabHeight + insets.bottom;
  const centerIndex = Math.floor(state.routes.length / 2);

  const handleTabPress = async (index, route) => {
    const {options} = descriptors[route.key];
    const requiresAuth = options?.requiresAuth;

    if (requiresAuth && !accessToken) {
      navigation.navigate('NoBottomTab', {
        screen: 'LoginRequired',
      });
      return;
    }

    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (state.index !== index && !event.defaultPrevented) {
      navigation.dispatch({
        ...CommonActions.navigate({name: route.name, merge: true}),
        target: state.key,
      });
    }

    onPress(index, route);
    animateIcons(index);
  };

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: tabBarHeight,
      backgroundColor,
      borderTopWidth: 1,
      borderTopColor: Colors.border,
      ...Shadows.medium,
      transform: [
        {
          translateY: visible.interpolate({
            inputRange: [0, 1],
            outputRange: [tabBarHeight, 0],
          }),
        },
      ],
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      justifyContent: 'space-around',
    },
    tabItem: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: scale(6),
    },
    iconContainer: {
      position: 'relative',
      justifyContent: 'center',
      alignItems: 'center',
    },
    tabLabel: {
      marginTop: scale(4),
      fontSize: FontSizes.xsmall,
      fontWeight: FontWeights.medium,
      color: inactiveColor,
      textAlign: 'center',
      maxWidth: scale(80),
    },
    activeLabel: {
      color: activeColor,
    },
    badgeContainer: {
      position: 'absolute',
      top: -8,
      left: '20%',
      backgroundColor: '#FF3B30',
      borderRadius: scale(999),
      minWidth: scale(18),
      height: scale(18),
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: scale(6),
      zIndex: 1,
    },
    badgeText: {
      textAlign: 'center',
      color: Colors.white,
      fontSize: FontSizes.xsmall,
      fontWeight: FontWeights.semiBold,
    },
    centerButtonWrapper: {
      marginTop: scale(-20),
    },
    centerButton: {
      borderWidth: 1,
      borderColor: Colors.border,
      width: centerButtonSize,
      height: centerButtonSize,
      borderRadius: scale(16),
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 10,
    },
    centerIcon: {
      transform: [{rotate: '-45deg'}],
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <Animated.View style={styles.container} pointerEvents="auto">
      <View style={styles.content} accessibilityRole="tablist">
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const {options} = descriptors[route.key];
          const label = options.tabBarLabel ?? options.title ?? route.name;
          const Icon = options.tabBarCustomIcon ?? (() => null);
          const isCenter = index === centerIndex;

          const handlePress = () => handleTabPress(index, route);
          const handleLongPress = () => {
            navigation.emit({type: 'tabLongPress', target: route.key});
            onLongPress(index, route);
          };

          const buttonProps = {
            accessibilityRole: 'button',
            accessibilityLabel:
              options.tabBarAccessibilityLabel ?? `${label} tab`,
            activeOpacity: 0.9,
            onPress: handlePress,
            onLongPress: handleLongPress,
            onPressIn: () => handlePressIn(index),
            onPressOut: () => handlePressOut(index, focused),
          };

          if (isCenter) {
            return (
              <TouchableOpacity
                key={route.key}
                style={styles.centerButtonWrapper}
                {...buttonProps}>
                <Animated.View
                  style={[
                    styles.centerButton,
                    {
                      backgroundColor: focused
                        ? centerActiveColor
                        : centerInactiveColor,
                      transform: [
                        {rotate: '45deg'},
                        {scale: iconScales[index]},
                      ],
                    },
                  ]}>
                  <View style={styles.centerIcon}>
                    <Icon
                      size={iconSize}
                      style={{
                        color: focused ? Colors.white : activeColor,
                      }}
                    />
                  </View>
                </Animated.View>
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              key={route.key}
              style={styles.tabItem}
              {...buttonProps}>
              <View style={styles.iconContainer}>
                <Animated.View
                  style={{transform: [{scale: iconScales[index]}]}}>
                  <Icon
                    style={{color: focused ? activeColor : inactiveColor}}
                    size={iconSize}
                  />
                </Animated.View>
              </View>
              <Text
                style={[styles.tabLabel, focused && styles.activeLabel]}
                numberOfLines={1}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </Animated.View>
  );
};

export default CustomTabBar;
