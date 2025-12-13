import React from 'react';
import {StatusBar, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/core';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Images from '~/assets/images/images';
import {InformationLineIcon, WalletLineIcon} from '~/assets/icons/icons';

import {Button} from '~/components/ui/Button';

import {Colors} from '~/theme/theme';
import {scale} from '~/utils/scaling';
import styles from './LoginRequired.styles';

const LoginRequiredScreen = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#111827', '#001656', '#0F1026']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.gradientBackground}>
      <SafeAreaView style={styles.container}>
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor="transparent"
        />
        <View style={styles.contentContainer}>
          <View style={[styles.logoContainer]}>
            <FastImage
              source={Images.logo}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.nameApp}>Netfly</Text>
            <View style={styles.taglineContainer}>
              <View style={styles.taglineBadge}>
                <Icon
                  name="check-decagram"
                  size={scale(14)}
                  color={Colors.primary}
                />
                <Text style={styles.taglineText}>NFT Marketplace</Text>
              </View>
            </View>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>
              Discover, collect and sell extraordinary NFTs on the world's most
              trusted marketplace
            </Text>
          </View>
          <View style={styles.illustrationContainer}>
            <FastImage
              source={Images.LoginRequired}
              style={styles.illustration}
              resizeMode="contain"
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button.Main
              title="Connect Wallet"
              style={styles.connectButton}
              iconLeft={<WalletLineIcon style={styles.walletIcon} />}
              onPress={() => {
                navigation.navigate('NoBottomTab', {
                  screen: 'ConnectWallet',
                });
              }}
            />
            <Text style={styles.supportedWallets}>
              Supports MetaMask, WalletConnect & more
            </Text>
          </View>
          <View style={styles.footerInfo}>
            <InformationLineIcon style={styles.informationIcon} />
            <Text style={styles.footerText}>
              Connect your wallet to start exploring
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginRequiredScreen;
