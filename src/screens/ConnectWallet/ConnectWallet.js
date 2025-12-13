import {API_BASE} from '@env';
import React, {useEffect, useRef, useState, useCallback} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Animated,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {showMessage} from 'react-native-flash-message';
import FastImage from 'react-native-fast-image';

import {
  AppKitButton,
  useAppKitAccount,
  useAppKitProvider,
  useAppKit,
} from '@reown/appkit-ethers-react-native';

import Images from '~/assets/images/images';

import {Button} from '~/components/ui/Button';
import {
  ButtonsSkeleton,
  UserHeaderSkeleton,
} from '~/components/CustomSkeleton/ConnectWalletSkeleton';

import {useAuthStore} from '~/stores/useAuthStore';
import {formatAddress} from '~/utils/formatAddress';
import {loginRequest, signatureRequest} from '~/api/authApi';

import {Colors} from '~/theme/theme';
import styles from './ConnectWallet.styles';

const FloatingParticle = ({style, animationDelay = 0, icon = 'circle'}) => {
  const floatAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.loop(
        Animated.sequence([
          Animated.timing(floatAnim, {
            toValue: 1,
            duration: 3000 + animationDelay,
            useNativeDriver: true,
          }),
          Animated.timing(floatAnim, {
            toValue: 0,
            duration: 3000 + animationDelay,
            useNativeDriver: true,
          }),
        ]),
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0.3,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]),
      ),
    ]).start();
  }, []);

  const translateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -30],
  });

  return (
    <Animated.View
      style={[
        style,
        {
          transform: [{translateY}],
          opacity: opacityAnim,
        },
      ]}>
      <LinearGradient
        colors={['rgba(102, 126, 234, 0.2)', 'rgba(118, 75, 162, 0.2)']}
        style={styles.particleGradient}>
        <Icon name={icon} size={24} color="#a78bfa" />
      </LinearGradient>
    </Animated.View>
  );
};

const WalletFeature = ({icon, title, description}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}>
      <Animated.View
        style={[styles.featureCard, {transform: [{scale: scaleAnim}]}]}>
        <View style={styles.featureIconContainer}>
          <MaterialIcon name={icon} size={28} color="#667eea" />
        </View>
        <View style={styles.featureContent}>
          <Text style={styles.featureTitle}>{title}</Text>
          <Text style={styles.featureDescription}>{description}</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

// Main screen
const ConnectWalletScreen = () => {
  const {isConnected, address, chainId, balance} = useAppKitAccount();
  const {walletProvider} = useAppKitProvider();
  const {disconnect} = useAppKit();

  const user = useAuthStore(state => state.user);
  const setAuth = useAuthStore(state => state.setAuth);
  const clearAuth = useAuthStore(state => state.clearAuth);

  const [authenticating, setAuthenticating] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    if (isConnected) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ).start();

      if (!user) {
        authenticate();
      }
    }
  }, [isConnected, address]);

  const getChainName = id => {
    const chains = {
      1: 'Ethereum Mainnet',
      137: 'Polygon',
      56: 'BSC',
      42161: 'Arbitrum',
    };
    return chains[id] || `Chain ${id}`;
  };

  // Handele login logic
  const authenticate = useCallback(async () => {
    if (!isConnected || !address) {
      showMessage({message: 'Vui lòng kết nối ví trước', type: 'danger'});
      return;
    }

    if (!walletProvider) {
      showMessage({message: 'Vui lòng kết nối ví trước', type: 'danger'});
      return;
    }

    try {
      setAuthenticating(true);

      // Lấy nonce từ server
      let nonce;
      try {
        const res = await loginRequest(address);
        nonce = res?.data?.nonce;
        if (!nonce) throw new Error('Invalid nonce');
      } catch (error) {
        console.error('Login API error:', error);
        showMessage({
          message: 'Đăng nhập thất bại',
          description: 'Không thể kết nối tới server. Vui lòng thử lại sau.',
          type: 'danger',
        });
        return;
      }

      // Ký message
      let signature;
      try {
        if (walletProvider.signer?.signMessage) {
          signature = await walletProvider.signer.signMessage(String(nonce));
        } else if (walletProvider.request) {
          signature = await walletProvider.request({
            method: 'personal_sign',
            params: [String(nonce), address],
          });
        } else {
          throw new Error('Wallet không hỗ trợ ký message');
        }
      } catch (error) {
        console.error('Sign message error:', error);
        showMessage({
          message: 'Không thể ký message',
          description: 'Vui lòng thử lại hoặc kiểm tra ví của bạn.',
          type: 'danger',
        });
        return;
      }

      // Gửi chữ ký lên server để xác thực
      let res;
      try {
        res = await signatureRequest(address, signature);
        if (!res?.user || !res?.accessToken) throw new Error('No user data');
      } catch (error) {
        console.error('Signature verify error:', error);
        showMessage({
          message: 'Xác thực thất bại',
          description: 'Không thể xác thực. Vui lòng thử lại sau.',
          type: 'danger',
        });
        return;
      }

      const {user: userData, accessToken} = res;

      // Lưu token + user
      setAuth({
        user: userData,
        accessToken: accessToken,
      });

      showMessage({
        message: 'Đăng nhập thành công!',
        description: `Xin chào, ${userData.fullName}`,
        type: 'success',
      });
    } catch (err) {
      console.error('Authenticate unexpected error:', err);
      showMessage({
        message: 'Lỗi',
        description: 'Đã xảy ra lỗi. Vui lòng thử lại.',
        type: 'danger',
      });
    } finally {
      setAuthenticating(false);
    }
  }, [address, isConnected, walletProvider]);

  // Handele Logout + Disconnect wallet
  const handleLogout = async () => {
    try {
      clearAuth();
      await disconnect();
      showMessage({
        message: 'Đã đăng xuất thành công',
        description: 'Ví đã được ngắt kết nối',
        type: 'success',
      });
    } catch (e) {
      console.warn('Logout error:', e);
      showMessage({
        message: 'Đã đăng xuất',
        description:
          'Có lỗi khi ngắt kết nối ví, nhưng đã xóa dữ liệu đăng nhập',
        type: 'warning',
      });
    }
  };

  return (
    <View style={{flex: 1}}>
      <LinearGradient
        colors={['#111827', '#001656', '#0F1026']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={StyleSheet.absoluteFillObject}>
        <StatusBar
          backgroundColor={Colors.background}
          translucent={false}
          barStyle="light-content"
        />
      </LinearGradient>

      <SafeAreaView style={styles.container}>
        <FloatingParticle
          icon="hexagon"
          style={styles.particle1}
          animationDelay={0}
        />
        <FloatingParticle
          icon="circle"
          style={styles.particle2}
          animationDelay={500}
        />
        <FloatingParticle
          icon="triangle"
          style={styles.particle3}
          animationDelay={1000}
        />
        <FloatingParticle
          icon="square"
          style={styles.particle4}
          animationDelay={1500}
        />

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1, paddingBottom: 160}}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View>
              <View style={styles.logoSection}>
                <View style={styles.logoBackground}>
                  <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    colors={['#016DB0', '#01FFCA']}
                    style={styles.logoGradient}>
                    <MaterialIcon name="wallet" size={45} color="#fff" />
                  </LinearGradient>
                </View>
                <View style={styles.logoRing} />
                <View style={[styles.logoRing, styles.logoRingOuter]} />
              </View>

              <Text style={styles.title}>Kết nối Ví Web3</Text>
              <Text style={styles.subtitle}>
                Kết nối ví của bạn để trải nghiệm đầy đủ tính năng blockchain
              </Text>
            </View>

            {!isConnected ? (
              <>
                <View style={styles.featuresContainer}>
                  <WalletFeature
                    icon="shield-check"
                    title="Bảo mật tuyệt đối"
                    description="Mã hóa end-to-end"
                  />
                  <WalletFeature
                    icon="lightning-bolt"
                    title="Giao dịch nhanh"
                    description="Xử lý trong giây lát"
                  />
                  <WalletFeature
                    icon="account-multiple"
                    title="Multi-chain"
                    description="Hỗ trợ nhiều mạng"
                  />
                </View>

                <View style={styles.connectButtonContainer}>
                  <AppKitButton balance="show" />
                </View>
              </>
            ) : (
              <View style={styles.connectedContainer}>
                <View style={styles.connectedGradient}>
                  <Text style={styles.connectedTitle}>
                    Đã kết nối thành công!
                  </Text>

                  {authenticating ? (
                    <UserHeaderSkeleton />
                  ) : (
                    <View style={styles.userHeader}>
                      <LinearGradient
                        colors={['#016DB0', '#01FFCA']}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 1}}
                        style={styles.userAvatar}>
                        <FastImage
                          source={
                            user?.avatar
                              ? {
                                  uri: `${API_BASE}/api/upload/${user.avatar}`,
                                }
                              : Images.avatar
                          }
                          style={styles.avatar}
                          resizeMode="cover"
                        />
                      </LinearGradient>
                      <View style={{flex: 1}}>
                        <Text style={styles.userName}>
                          {user?.fullName || 'Không có thông tin'}
                        </Text>
                        <Text style={styles.userAddress}>
                          {formatAddress(address) || 'Không có địa chỉ'}
                        </Text>
                      </View>
                    </View>
                  )}

                  <View style={styles.infoCard}>
                    <View style={styles.infoHeader}>
                      <MaterialIcon name="wallet" size={20} color="#667eea" />
                      <Text style={styles.infoLabel}>Địa chỉ ví</Text>
                    </View>
                    <View style={styles.addressContainer}>
                      <Text style={styles.addressText}>
                        {formatAddress(address)}
                      </Text>
                      <TouchableOpacity style={styles.copyButton}>
                        <Icon name="copy" size={16} color="#a78bfa" />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {balance && (
                    <View style={styles.infoCard}>
                      <View style={styles.infoHeader}>
                        <MaterialIcon
                          name="ethereum"
                          size={20}
                          color="#627eea"
                        />
                        <Text style={styles.infoLabel}>Số dư</Text>
                      </View>
                      <Text style={styles.balanceAmount}>
                        {parseFloat(balance).toFixed(4)} ETH
                      </Text>
                    </View>
                  )}

                  {chainId && (
                    <View style={[styles.infoCard, {marginBottom: 26}]}>
                      <View style={styles.infoHeader}>
                        <MaterialIcon name="web" size={20} color="#f59e0b" />
                        <Text style={styles.infoLabel}>Mạng</Text>
                      </View>
                      <Text style={styles.chainText}>
                        {getChainName(chainId)}
                      </Text>
                    </View>
                  )}

                  <View style={{width: '100%', alignItems: 'center'}}>
                    <AppKitButton balance="show" />
                  </View>

                  {/* Authenticate area */}
                  <View style={{flex: 1, alignItems: 'center'}}>
                    {authenticating ? (
                      <View style={{width: '100%'}}>
                        <ButtonsSkeleton />
                      </View>
                    ) : user ? (
                      <View style={{width: '100%'}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginTop: 20,
                            gap: 10,
                          }}>
                          <Button.Main
                            title="logout"
                            iconLeft={
                              <Icon
                                name="log-out"
                                size={18}
                                color={Colors.white}
                              />
                            }
                            textStyle={{color: Colors.white}}
                            onPress={handleLogout}
                            style={{
                              flex: 1,
                              backgroundColor: '#E74C3C',
                              borderRadius: 10,
                            }}
                          />
                          <Button.Main
                            title="Re-auth"
                            iconLeft={
                              <Icon
                                name="refresh-cw"
                                size={18}
                                color={Colors.white}
                              />
                            }
                            textStyle={{color: Colors.white}}
                            onPress={authenticate}
                            style={{
                              flex: 1,
                              borderRadius: 10,
                            }}
                          />
                        </View>
                      </View>
                    ) : (
                      <Button.Main
                        title="Xác thực & Đăng nhập"
                        useGradient
                        gradientColors={['#016DB0', '#01FFCA']}
                        textStyle={{color: Colors.white}}
                        onPress={authenticate}
                        style={{
                          flex: 1,
                          marginTop: 20,
                        }}
                      />
                    )}
                  </View>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ConnectWalletScreen;
