import React from 'react';
import {View, Animated, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import {Colors} from '~/theme/theme';
import styles from './AnimatedHeader.styles';

const AnimatedHeader = ({
  scrollY,
  title = '',
  leftComponent,
  rightComponents = [],
  showBorder = true,
  inputRange = [0, 150],
  titleAlign = 'left',
}) => {
  const navigation = useNavigation();

  const background = scrollY.interpolate({
    inputRange,
    outputRange: ['transparent', Colors.background],
    extrapolate: 'clamp',
  });

  const titleOpacity = scrollY.interpolate({
    inputRange: [inputRange[1] - 70, inputRange[1]],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        styles.header,
        {
          backgroundColor: background,
          borderBottomWidth: showBorder ? 0.5 : 0,
          borderBottomColor: 'rgba(255,255,255,0.1)',
        },
      ]}>
      {leftComponent ? (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.goBack()}>
          {leftComponent}
        </TouchableOpacity>
      ) : (
        <View style={styles.box} />
      )}

      <Animated.Text
        style={[
          styles.headerTitle,
          {opacity: titleOpacity},
          titleAlign === 'center' && {
            textAlign: 'center',
          },
        ]}
        numberOfLines={1}
        ellipsizeMode="tail">
        {title}
      </Animated.Text>

      <View style={styles.headerActions}>
        {Array.isArray(rightComponents) && rightComponents.length > 0 ? (
          rightComponents.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.headerButton}
              onPress={item.onPress}>
              {item.icon}
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.box} />
        )}
      </View>
    </Animated.View>
  );
};

export default AnimatedHeader;
