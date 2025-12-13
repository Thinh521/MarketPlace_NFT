import React, {useState} from 'react';
import {View, TouchableOpacity, Text, Pressable} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/core';

import Images from '~/assets/images/images';
import {BellIcon, SearchIcon, FilterLineIcon} from '~/assets/icons/icons';

import {Input} from '../ui/Input';

import styles from './Header.styles';

const Header = ({showSearch = true, title = ''}) => {
  const navigation = useNavigation();
  const [searchText] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.logoContainer}>
          <FastImage
            source={Images.logo}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.appName}>{title}</Text>
        </View>

        <TouchableOpacity>
          <BellIcon />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>

      {showSearch && (
        <Pressable
          style={styles.searchContainer}
          onPress={() => {
            navigation.navigate('NoBottomTab', {
              screen: 'SearchAndFilter',
            });
          }}>
          <Input
            placeholder="Search NFT, creator, collection, ..."
            value={searchText}
            editable={false}
            pointerEvents="none"
            leftIcon={SearchIcon}
            rightIcon={FilterLineIcon}
            autoCapitalize="none"
          />
        </Pressable>
      )}
    </View>
  );
};

export default Header;
