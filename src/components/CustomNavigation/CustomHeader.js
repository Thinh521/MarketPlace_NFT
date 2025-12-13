import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {BackIcon} from '~/assets/icons/icons';
import {Button} from '../ui/Button';

import {scale} from '~/utils/scaling';
import {Colors, FontSizes, FontWeights} from '~/theme/theme';

const CustomHeader = ({
  title = '',
  subTitle = '',
  navigation,
  rightComponent = null,
}) => {
  return (
    <View style={styles.header}>
      <Button.Icon
        icon={<BackIcon />}
        style={styles.leftButton}
        onPress={() => navigation?.goBack?.()}
      />

      <View style={styles.center}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>

        {!!subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
      </View>

      {rightComponent && <View style={styles.right}>{rightComponent}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingVertical: scale(20),
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.background,
  },
  leftButton: {
    width: scale(44),
    height: scale(44),
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  center: {
    flex: 1,
    marginLeft: scale(12),
    overflow: 'hidden',
  },
  title: {
    color: Colors.white,
    fontSize: FontSizes.semiLarge,
    fontWeight: FontWeights.extraBold,
  },
  subTitle: {
    marginTop: scale(2),
    color: Colors.textGray,
    fontSize: FontSizes.small,
  },
  right: {
    width: scale(40),
    height: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomHeader;
