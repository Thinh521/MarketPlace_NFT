import {API_BASE} from '@env';
import React, {useCallback, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Animated,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import {ethers} from 'ethers';
import {useQuery} from '@tanstack/react-query';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Feather';
import {useFocusEffect} from '@react-navigation/core';
import {showMessage} from 'react-native-flash-message';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAppKitProvider} from '@reown/appkit-ethers-react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import Images from '~/assets/images/images';
import {EditIcon, PlusIcon, CheckIcon, RightIcon} from '~/assets/icons/icons';

import {Button} from '~/components/ui/Button';
import ProductList from '~/components/Product/ProductList';
import CustomError from '~/components/CustomError/CustomError';
import CustomEmpty from '~/components/CustomEmpty/CustomEmpty';
import Product_2List from '~/components/Product_2/Product_2List';
import CollectionList from '~/components/Collection/CollectionList';
import ProductCardSkeleton from '~/components/CustomSkeleton/ProductCardSkeleton';
import CollectionCardSkeleton from '~/components/CustomSkeleton/CollectionCardSkeleton';

import {toggleFollowRequest} from '~/api/followApi';
import {getAllSoldProductsRequest} from '~/api/productApi';
import {getUserProfileRequest} from '~/api/userProfileApi';

import {CONTRACT_ADDRESSES} from '~/contracts/addresses/AddressMartketPlace';
import {AuctionHouse_ABI} from '~/contracts/abi';

import {useAuthStore} from '~/stores/useAuthStore';

import {db} from '~/services/firebase';

import {scale} from '~/utils/scaling';
import {formatAddress} from '~/utils/formatAddress';
import {parseBlockchainError} from '~/utils/errors/blockchainErrors';

import {commonStyles} from '~/styles/common';
import {Colors, FontSizes} from '~/theme/theme';
import styles from './Profile.styles';

const ProfileScreen = ({route, navigation}) => {
  const {productAddressWallet} = route.params || {};
  const {walletProvider} = useAppKitProvider();
  const me = useAuthStore(state => state.user);
  const fetchUser = useAuthStore(state => state.fetchUser);

  useFocusEffect(
    useCallback(() => {
      const loadAll = async () => {
        try {
          await fetchUser();
          await loadRefunds();
        } catch (err) {
          console.error('loadAll error:', err);
        }
      };

      loadAll();

      return () => {};
    }, []),
  );

  const scrollY = useRef(new Animated.Value(0)).current;
  const [activeTab, setActiveTab] = useState('product_nft');
  const [isFollowing, setIsFollowing] = useState(false);
  const [refundableAuctions, setRefundableAuctions] = useState([]);

  // Fetch user data
  const {
    data: userData,
    isLoading: isUserLoading,
    error: userError,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ['profileUser', productAddressWallet || me?.addressWallet],
    queryFn: () =>
      getUserProfileRequest(productAddressWallet || me?.addressWallet),
    enabled: !!me,
    select: res => res.data,
    onSuccess: data => {
      if (!productAddressWallet) {
        useAuthStore.getState().setUser(data);
      }
    },
  });

  const {
    data: soldProductsData,
    isLoading: isSoldProductsDataLoading,
    error: isSoldProductsDataError,
    refetch: refetchSoldProductsData,
  } = useQuery({
    queryKey: ['productSold'],
    queryFn: getAllSoldProductsRequest,
    select: res => (Array.isArray(res?.data) ? res.data.slice(1) : []),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const user = userData || me;

  const isOwnProfile =
    user?.addressWallet?.toLowerCase() === me?.addressWallet?.toLowerCase();

  const loadRefunds = async () => {
    try {
      // Lấy danh sách auctionId từ Firestore
      const snap = await db
        .collection('users')
        .doc(me.addressWallet.toLowerCase())
        .collection('bids')
        .get();

      const auctionIds = snap.docs.map(doc => doc.id);

      if (auctionIds.length === 0) {
        setRefundableAuctions([]);
        return;
      }

      const provider = new ethers.BrowserProvider(walletProvider);
      const contract = new ethers.Contract(
        CONTRACT_ADDRESSES.AuctionHouse,
        AuctionHouse_ABI,
        provider,
      );

      const withdrawable = [];

      for (const id of auctionIds) {
        const auction = await contract.auctions(id);

        const auctionObj = {
          seller: auction[0],
          nftAddress: auction[1],
          highestBid: auction[2],
          endTime: auction[3],
          minIncrement: auction[4],
          tokenId: auction[5],
          highestBidder: auction[6],
          startingBid: auction[7],
          settled: auction[8],
        };

        if (
          !auctionObj.settled &&
          auctionObj.highestBidder.toLowerCase() !==
            me.addressWallet.toLowerCase()
        ) {
          withdrawable.push(id);
        }
      }

      setRefundableAuctions(withdrawable);
    } catch (error) {
      console.error('loadRefunds error:', error);
    }
  };

  const handleWithdrawRefund = async auctionId => {
    try {
      const provider = new ethers.BrowserProvider(walletProvider);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        CONTRACT_ADDRESSES.AuctionHouse,
        AuctionHouse_ABI,
        signer,
      );

      const tx = await contract.withdrawRefund(auctionId);
      await tx.wait();

      await db
        .collection('users')
        .doc(me.addressWallet.toLowerCase())
        .collection('bids')
        .doc(auctionId)
        .delete();

      await loadRefunds();

      showMessage({
        message: 'Withdraw thành công',
        type: 'success',
      });
    } catch (err) {
      showMessage({
        message: parseBlockchainError(err),
        type: 'danger',
      });
    }
  };

  const handleToggleFollow = async ({userAddress}) => {
    try {
      const res = await toggleFollowRequest({
        followingAddressWallet: userAddress,
      });

      setIsFollowing(res?.data ?? !isFollowing);
    } catch (error) {
      console.error('Follow/unfollow error:', error);
      Alert.alert(
        'Lỗi',
        'Không thể thực hiện thao tác follow/unfollow. Vui lòng thử lại.',
      );
    }
  };

  if (isUserLoading) {
    return (
      <LinearGradient
        colors={['#111827', '#001656', '#0F1026']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.gradientBackground}>
        <SafeAreaView style={styles.container}>
          <StatusBar
            translucent={false}
            backgroundColor={Colors.background}
            barStyle="light-content"
          />
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color="#fff" />
            <Text
              style={{
                marginTop: scale(16),
                fontSize: FontSizes.small,
                color: Colors.white,
              }}>
              Đang tải dữ liệu...
            </Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  if (userError) {
    return (
      <LinearGradient
        colors={['#111827', '#001656', '#0F1026']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.gradientBackground}>
        <SafeAreaView style={styles.container}>
          <StatusBar
            translucent={false}
            backgroundColor={Colors.background}
            barStyle="light-content"
          />
          <CustomError onRetry={refetchUser} />
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['#111827', '#001656', '#0F1026']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.gradientBackground}>
      <SafeAreaView style={styles.container}>
        <StatusBar
          translucent={false}
          backgroundColor={Colors.background}
          barStyle="light-content"
        />

        <Animated.FlatList
          data={[1]}
          keyExtractor={() => 'wallet-section'}
          contentContainerStyle={{paddingBottom: scale(120)}}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: false},
          )}
          renderItem={() => (
            <>
              {/* Cover Image */}
              <View style={styles.coverContainer}>
                <FastImage
                  source={Images.banner_1}
                  style={styles.coverImage}
                  resizeMode="cover"
                />
              </View>

              {/* Profile Info */}
              <View style={styles.profileSection}>
                <View>
                  <View style={styles.avatarContainer}>
                    <FastImage
                      source={
                        user?.avatar
                          ? {uri: `${API_BASE}/api/upload/${user.avatar}`}
                          : Images.avatar
                      }
                      style={styles.avatar}
                      resizeMode="cover"
                    />

                    {isOwnProfile && (
                      <TouchableOpacity
                        style={styles.verifiedBadge}
                        onPress={() => {
                          navigation.navigate('NoBottomTab', {
                            screen: 'UpdateProfile',
                          });
                        }}>
                        <EditIcon />
                      </TouchableOpacity>
                    )}
                  </View>

                  <View style={styles.nameSection}>
                    <View style={styles.nameCheck}>
                      <Text style={styles.displayName}>
                        {user?.fullName || 'Không có thông tin'}
                      </Text>
                      <View style={styles.checkBadge}>
                        <CheckIcon style={styles.checkIcon} />
                      </View>
                    </View>
                    <Text style={styles.username}>
                      @{user?.userName || 'Không có thông tin'}
                    </Text>
                  </View>

                  {/* Bio */}
                  <Text style={styles.bio}>
                    {user?.bio || 'Không có thông tin'}
                  </Text>
                </View>

                {/* Wallet & Joined */}
                <View style={styles.metaInfo}>
                  <View style={styles.metaItem}>
                    <Icon name="credit-card" size={14} color={Colors.white} />
                    <Text style={styles.metaText}>
                      {formatAddress(user?.addressWallet) ||
                        'Không có thông tin'}
                    </Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Icon name="calendar" size={14} color={Colors.white} />
                    <Text style={styles.metaText}>
                      {user?.createdAt || 'Không có thông tin'}
                    </Text>
                  </View>
                </View>

                {/* Social Links */}
                <View style={styles.socialLinks}>
                  <Button.Icon
                    icon={
                      <MaterialIcon
                        name="twitter"
                        size={scale(20)}
                        color={Colors.primary}
                      />
                    }
                    onPress={() => {}}
                    style={styles.socialButton}
                  />
                  <Button.Icon
                    icon={
                      <MaterialIcon
                        name="instagram"
                        size={scale(20)}
                        color={Colors.primary}
                      />
                    }
                    onPress={() => {}}
                    style={styles.socialButton}
                  />
                  <Button.Icon
                    icon={
                      <MaterialIcon
                        name="web"
                        size={scale(20)}
                        color={Colors.primary}
                      />
                    }
                    onPress={() => {}}
                    style={styles.socialButton}
                  />
                </View>

                {refundableAuctions.length > 0 && (
                  <View style={styles.withdrawSection}>
                    <Text style={commonStyles.title}>Refund Available</Text>

                    {refundableAuctions.map(auctionId => (
                      <Button.Main
                        key={auctionId}
                        title={'Withdraw from Auction'}
                        onPress={() => handleWithdrawRefund(auctionId)}
                      />
                    ))}
                  </View>
                )}

                {/* Action Buttons */}
                {!isOwnProfile && (
                  <View style={styles.actionButtons}>
                    <Button.Main
                      title={isFollowing ? 'Following' : 'Follow'}
                      onPress={() =>
                        handleToggleFollow({
                          userAddress: user?.addressWallet,
                        })
                      }
                      iconLeft={
                        <Icon
                          name={isFollowing ? 'user-check' : 'user-plus'}
                          size={scale(18)}
                          color={isFollowing ? Colors.primary : Colors.white}
                        />
                      }
                      style={[
                        styles.followButton,
                        isFollowing && styles.followingButton,
                      ]}
                      textStyle={[
                        styles.followButtonText,
                        isFollowing && styles.followingButtonText,
                      ]}
                    />

                    <Button.Main
                      title="Message"
                      onPress={() => {}}
                      iconLeft={
                        <Icon
                          name="message-circle"
                          size={scale(18)}
                          color={Colors.white}
                        />
                      }
                      style={styles.messageButton}
                      textStyle={styles.messageButtonText}
                    />
                  </View>
                )}

                {/* Stats */}
                <View style={styles.statsContainer}>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>
                      {user?.followCount || '0'}
                    </Text>
                    <Text style={styles.statLabel}>Followers</Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>
                      {user?.followingCount || '0'}
                    </Text>
                    <Text style={styles.statLabel}>Following</Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>
                      {user?.ownedProducts?.length || '0'}
                    </Text>
                    <Text style={styles.statLabel}>Products</Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>
                      {user?.likeCount || '0'}
                    </Text>
                    <Text style={styles.statLabel}>Likes</Text>
                  </View>
                </View>

                {/* Tabs */}
                <View style={styles.tabsContainer}>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{paddingHorizontal: scale(8)}}>
                    <TouchableOpacity
                      style={[
                        styles.tab,
                        activeTab === 'product_nft' && styles.activeTab,
                      ]}
                      onPress={() => setActiveTab('product_nft')}>
                      <MaterialIcon
                        name="image-multiple"
                        size={20}
                        color={
                          activeTab === 'product_nft'
                            ? Colors.primary
                            : Colors.textGray
                        }
                      />
                      <Text
                        style={[
                          styles.tabText,
                          activeTab === 'product_nft' && styles.activeTabText,
                        ]}>
                        Product NFT
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.tab,
                        activeTab === 'collection' && styles.activeTab,
                      ]}
                      onPress={() => setActiveTab('collection')}>
                      <MaterialIcon
                        name="folder-multiple"
                        size={20}
                        color={
                          activeTab === 'collection'
                            ? Colors.primary
                            : Colors.textGray
                        }
                      />
                      <Text
                        style={[
                          styles.tabText,
                          activeTab === 'collection' && styles.activeTabText,
                        ]}>
                        Collection
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.tab,
                        activeTab === 'sold_products' && styles.activeTab,
                      ]}
                      onPress={() => setActiveTab('sold_products')}>
                      <MaterialIcon
                        name="shopping-outline"
                        size={20}
                        color={
                          activeTab === 'sold_products'
                            ? Colors.primary
                            : Colors.textGray
                        }
                      />
                      <Text
                        style={[
                          styles.tabText,
                          activeTab === 'sold_products' && styles.activeTabText,
                        ]}>
                        Sold Products
                      </Text>
                    </TouchableOpacity>
                  </ScrollView>
                </View>

                {activeTab === 'product_nft' && (
                  <>
                    <View style={styles.sectionHeader}>
                      <Text style={commonStyles.title}>PRODUCT NFT</Text>
                      {isOwnProfile && (
                        <Button.Icon
                          icon={<PlusIcon />}
                          onPress={() => {
                            navigation.navigate('NoBottomTab', {
                              screen: 'CreateUpdateNFT',
                            });
                          }}
                          style={{width: scale(32), height: scale(32)}}
                        />
                      )}
                    </View>

                    {isUserLoading ? (
                      <CollectionCardSkeleton itemCount={4} layout="grid" />
                    ) : userError ? (
                      <CustomError onRetry={refetchUser} />
                    ) : !user?.ownedProducts ||
                      user?.ownedProducts.length === 0 ? (
                      <CustomEmpty type="noProduct" />
                    ) : (
                      <Product_2List
                        data={user?.ownedProducts}
                        onEditPress={isOwnProfile ? undefined : false}
                      />
                    )}
                  </>
                )}

                {activeTab === 'collection' && (
                  <>
                    <View style={styles.sectionHeader}>
                      <Text style={commonStyles.title}>COLLECTION</Text>
                      {isOwnProfile && (
                        <Button.Icon
                          icon={<PlusIcon />}
                          onPress={() => {
                            navigation.navigate('NoBottomTab', {
                              screen: 'CollectionManagerScreen',
                            });
                          }}
                          style={{width: scale(32), height: scale(32)}}
                        />
                      )}
                    </View>

                    {isUserLoading ? (
                      <CollectionCardSkeleton itemCount={2} layout="grid" />
                    ) : userError ? (
                      <CustomError onRetry={refetchUser} />
                    ) : !user?.collectionPorducts ||
                      user?.collectionPorducts.length === 0 ? (
                      <CustomEmpty type="noProduct" />
                    ) : (
                      <CollectionList
                        data={user?.collectionPorducts}
                        addressWallet={user?.addressWallet}
                        avatar={user?.avatar}
                        fullName={user?.fullName}
                        onEditPress={isOwnProfile ? undefined : false}
                      />
                    )}
                  </>
                )}

                {activeTab === 'sold_products' && (
                  <>
                    <View style={styles.sectionHeader}>
                      <Text style={commonStyles.title}>SOLD PRODUCTS </Text>
                      {isOwnProfile && (
                        <Button.Icon
                          icon={<RightIcon />}
                          style={{width: scale(32), height: scale(32)}}
                        />
                      )}
                    </View>

                    {isSoldProductsDataLoading ? (
                      <ProductCardSkeleton layout="grid" itemCount={4} />
                    ) : isSoldProductsDataError ? (
                      <CustomError onRetry={refetchSoldProductsData} />
                    ) : !soldProductsData || soldProductsData.length === 0 ? (
                      <CustomEmpty type="noProduct" />
                    ) : (
                      <ProductList products={soldProductsData} />
                    )}
                  </>
                )}
              </View>
            </>
          )}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ProfileScreen;
