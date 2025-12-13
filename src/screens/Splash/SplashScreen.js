import React from 'react';
import {Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import Images from '~/assets/images/images';

import styles from './Splash.styles';

const ProductScreen = () => {
  return (
    <View style={styles.container}>
      <FastImage
        source={Images.logo}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.text}>NetFly</Text>
    </View>
  );
};

export default ProductScreen;
