import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

import {FontWeights, Colors} from '~/theme/theme';
import {scale} from '~/utils/scaling';

const SectionTitle = ({
  leftText,
  rightText,
  gradient = ['#016DB0', '#01FFCA'],
  showButton = false,
  onPressButton,
  reversed = false,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {!reversed && <Text style={styles.leftText}>{leftText} </Text>}

      <View style={styles.gradientWrapper}>
        <MaskedView
          maskElement={<Text style={styles.gradientText}>{rightText}</Text>}>
          <LinearGradient
            colors={gradient}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.gradient}>
            <Text style={[styles.gradientText, {opacity: 0}]} numberOfLines={0}>
              {rightText}
            </Text>
          </LinearGradient>
        </MaskedView>
      </View>

      {showButton && (
        <TouchableOpacity onPress={onPressButton} style={styles.button}>
          <Feather name="chevron-down" size={18} color={Colors.primary} />
        </TouchableOpacity>
      )}

      {reversed && <Text style={styles.leftText}> {leftText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scale(20),
    flexWrap: 'wrap',
  },
  leftText: {
    fontSize: 24,
    fontWeight: FontWeights.extraBold,
    color: Colors.white,
    letterSpacing: 2,
    textAlign: 'center',
  },
  gradientWrapper: {
    maxWidth: '80%',
    alignSelf: 'center',
  },
  gradientText: {
    fontSize: 24,
    fontWeight: FontWeights.extraBold,
    letterSpacing: 2,
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  gradient: {
    flexShrink: 1,
    alignSelf: 'center',
  },
  button: {
    width: scale(30),
    height: scale(30),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
    backgroundColor: '#064462',
    marginLeft: scale(6),
  },
});

export default SectionTitle;
