import {IPFS_GATEWAY, API_BASE} from '@env';
import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, StatusBar, Animated} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import {showMessage} from 'react-native-flash-message';
import {ethers} from 'ethers';
import {
  useAppKitAccount,
  useAppKitProvider,
} from '@reown/appkit-ethers-react-native';
import {useQuery} from '@tanstack/react-query';

import {
  BackIcon,
  CheckIcon,
  HeartIcon,
  HeartLineIcon,
  ShareLineIcon,
} from '~/assets/icons/icons';
import Images from '~/assets/images/images';

import {Button} from '~/components/ui/Button';
import AnimatedHeader from '~/components/AnimatedHeader';
import CustomError from '~/components/CustomError/CustomError';
import CustomEmpty from '~/components/CustomEmpty/CustomEmpty';
import ProductSlider from '~/components/Product/ProductSlider';
import BuyNowSuccessModal from './components/BuyNowSuccessModal';
import BuyReviewBottomSheet from './components/BuyReviewBottomSheet';
import ProductSliderSkeleton from '~/components/CustomSkeleton/ProductSliderSkeleton';
import ProductActivitySkeleton from '~/components/CustomSkeleton/ProductActivitySkeleton';
import ProductNFTDetailSkeleton from '~/components/CustomSkeleton/ProductNFTDetailSkeleton';

import {toggleLikeRequest} from '~/api/likeApi';
import {updateProductView} from '~/api/productViewApi';
import {
  getProductActivityRequest,
  getOneProductRequest,
} from '~/api/productApi';

import {Marketplace_ABI} from '~/contracts/abi';
import {CONTRACT_ADDRESSES} from '~/contracts/addresses/AddressMartketPlace';

import {useProducts} from '~/hooks/useProducts';

import {scale} from '~/utils/scaling';
import {timeAgo} from '~/utils/timeAgo';
import {formatAddress} from '~/utils/formatAddress';
import {parseBlockchainError} from '~/utils/errors/blockchainErrors';

import {Colors} from '~/theme/theme';
import styles from './NFTDetail.styles';

const NFTDetailScreen = ({route, navigation}) => {
  const {product} = route.params ?? {};
  const {address} = useAppKitAccount();
  const {walletProvider} = useAppKitProvider();
  const scrollY = useRef(new Animated.Value(0)).current;
  const bottomSheetRef = useRef(null);

  const [isBuyLoading, setIsBuyLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(product?.isLiked || false);
  const [showDescription, setShowDescription] = useState(true);
  const [showDetails, setShowDetails] = useState(true);
  const [showActivity, setShowActivity] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const productId = product?.id;
  const listingId = product?.listingId;

  // Update view count
  useEffect(() => {
    if (productId) updateProductView(productId).catch(console.log);
  }, [productId]);

  // Fetch product detail
  const {
    data: productDetail,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['productDetail', productId, listingId, address],
    queryFn: () => getOneProductRequest(productId, listingId, address),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000,
    select: res => res?.data ?? [],
  });

  const {
    allProducts,
    isLoading: isProductLoading,
    error: isProductError,
    refetch: isProductRefetch,
  } = useProducts(address);

  // Fetch activities
  const {
    data: activities,
    isLoading: isActivitiesLoading,
    isError: isActivitiesError,
    refetch: refetchActivities,
  } = useQuery({
    queryKey: ['productActivity', productId],
    queryFn: () => getProductActivityRequest(productId),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000,
    select: res => res?.data ?? [],
  });

  useEffect(() => {
    if (productDetail) setIsFavorite(productDetail.isLike);
  }, [productDetail]);

  const handleToggleLike = async () => {
    if (!productDetail) return;
    const previous = isFavorite;
    setIsFavorite(!previous);
    try {
      await toggleLikeRequest({targetId: productDetail.id, targetType: 'nft'});
      refetch();
    } catch {
      setIsFavorite(previous);
    }
  };

  const handleBlockchainPurchase = async () => {
    setIsBuyLoading(true);
    try {
      const provider = new ethers.BrowserProvider(walletProvider);
      const signer = await provider.getSigner();
      if (!signer || !address) throw new Error('Cannot authenticate wallet');

      const contract = new ethers.Contract(
        CONTRACT_ADDRESSES.Marketplace,
        Marketplace_ABI,
        signer,
      );
      const nftAddress = CONTRACT_ADDRESSES.NFT_ADDRESS;
      const marketItemId = productDetail.marketItemId;
      const priceInWei = ethers.parseEther(productDetail.price.toString());

      const tx = await contract.createMarketSale(nftAddress, marketItemId, {
        value: priceInWei,
      });
      const receipt = await tx.wait();
      if (!receipt || receipt.status === 0)
        throw new Error('Transaction reverted');

      bottomSheetRef.current?.close();
      setTimeout(() => setShowSuccessModal(true), 500);
    } catch (error) {
      console.log('parseBlockchainError(error)', parseBlockchainError(error));
      showMessage({message: parseBlockchainError(error), type: 'danger'});
    } finally {
      setIsBuyLoading(false);
    }
  };

  const CollapsibleSection = ({title, isOpen, onToggle, children}) => (
    <View style={styles.section}>
      <TouchableOpacity style={styles.sectionHeader} onPress={onToggle}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Icon
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={Colors.white}
        />
      </TouchableOpacity>
      {isOpen && <View style={styles.sectionContent}>{children}</View>}
    </View>
  );

  const renderUserRow = (user, label) => (
    <View style={styles.userSection}>
      <View style={styles.sectionHeaderUser}>
        <Icon
          name={label === 'Creator' ? 'edit-3' : 'user'}
          size={16}
          color={Colors.textGray}
        />
        <Text style={styles.sectionLabel}>{label} by</Text>
      </View>
      <TouchableOpacity
        style={styles.userRow}
        onPress={() =>
          navigation.navigate('NoBottomTab', {
            screen: 'Profile',
            params: {productAddressWallet: user?.addressWallet},
          })
        }>
        <View style={styles.avatarContainer}>
          <FastImage
            source={{
              uri: user?.avatar
                ? `${API_BASE}/api/upload/${user?.avatar}`
                : Images.avatar,
            }}
            style={styles.avatarLarge}
          />
          <View style={styles.checkBadge}>
            <CheckIcon style={styles.checkIcon} />
          </View>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>
            {user?.fullName || 'Unknown User'}
          </Text>
          <Text style={styles.userAddress}>
            {formatAddress(user?.addressWallet)}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const getActivityIcon = type => {
    const icons = {List: 'tag', Mint: 'star', Sale: 'shopping-cart'};
    return (
      <Icon name={icons[type] || 'activity'} size={18} color={Colors.primary} />
    );
  };

  return (
    <LinearGradient
      colors={['#111827', '#001656', '#0F1026']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.gradientBackground}>
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={Colors.background}
          barStyle="light-content"
          translucent={false}
        />
        <AnimatedHeader
          scrollY={scrollY}
          title={isLoading ? '' : productDetail?.name}
          leftComponent={<BackIcon />}
          rightComponents={[
            {
              icon: isFavorite ? (
                <HeartIcon style={{color: Colors.redColor}} />
              ) : (
                <HeartLineIcon style={{color: Colors.white}} />
              ),
              onPress: handleToggleLike,
            },
            {icon: <ShareLineIcon />, onPress: () => console.log('Share NFT')},
          ]}
        />

        {isLoading ? (
          <ProductNFTDetailSkeleton />
        ) : isError ? (
          <CustomError />
        ) : (
          <Animated.ScrollView
            contentContainerStyle={{paddingBottom: scale(100)}}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: scrollY}}}],
              {useNativeDriver: false},
            )}>
            <View style={styles.imageContainer}>
              <FastImage
                source={
                  productDetail?.image
                    ? {uri: `${IPFS_GATEWAY}${productDetail?.image}`}
                    : Images.card_1
                }
                style={styles.nftImage}
                resizeMode="cover"
              />
            </View>

            <View style={styles.content}>
              <TouchableOpacity style={styles.collectionLink}>
                <Icon name="grid" size={scale(16)} color={Colors.primary} />
                <Text style={styles.collectionText}>
                  Cyber Punks Collection
                </Text>
              </TouchableOpacity>

              <Text style={styles.title}>
                {productDetail?.name || 'No Information'}
              </Text>

              {/* <Button.Main
                title="Test Success Modal"
                style={[styles.buyButton, {marginTop: scale(12)}]}
                onPress={() => setShowSuccessModal(true)}
              /> */}

              <View style={styles.priceSection}>
                <Text style={styles.priceLabel}>Current Price</Text>
                <View style={styles.priceRow}>
                  <MaterialIcon name="ethereum" size={24} color="#627EEA" />
                  <Text style={styles.price}>
                    {productDetail?.price || '0'} ETH
                  </Text>
                </View>
              </View>

              {productDetail?.creator &&
                renderUserRow(productDetail.creator, 'Creator')}

              {productDetail?.seller &&
                renderUserRow(productDetail.seller, 'Owner')}

              <CollapsibleSection
                title="Description"
                isOpen={showDescription}
                onToggle={() => setShowDescription(!showDescription)}>
                <Text style={styles.description}>
                  {productDetail?.description || 'No description available'}
                </Text>
              </CollapsibleSection>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Properties</Text>
                <View style={styles.propertiesGrid}>
                  {productDetail?.properties?.map((prop, i) => (
                    <View key={i} style={styles.propertyCard}>
                      <Text style={styles.propertyTrait}>
                        {prop.type || 'N/A'}
                      </Text>
                      <Text style={styles.propertyValue}>
                        {prop.name || 'N/A'}
                      </Text>
                      <Text style={styles.propertyRarity}>
                        100% have this trait
                      </Text>
                    </View>
                  ))}
                </View>
              </View>

              <CollapsibleSection
                title="Details"
                isOpen={showDetails}
                onToggle={() => setShowDetails(!showDetails)}>
                <View style={styles.detailsList}>
                  {['contractAddress', 'tokenId', 'category', 'blockchain'].map(
                    (key, idx) => {
                      const value = productDetail?.[key];

                      const displayValue =
                        key === 'contractAddress'
                          ? value
                            ? formatAddress(value)
                            : 'N/A'
                          : value ?? 'N/A';

                      return (
                        <View style={styles.detailItem} key={idx}>
                          <Text style={styles.detailLabel}>
                            {key.replace(/([A-Z])/g, ' $1')}:
                          </Text>

                          <Text style={styles.detailValue}>{displayValue}</Text>
                        </View>
                      );
                    },
                  )}
                </View>
              </CollapsibleSection>

              <CollapsibleSection
                title="Activity"
                isOpen={showActivity}
                onToggle={() => setShowActivity(!showActivity)}>
                {isActivitiesLoading ? (
                  <ProductActivitySkeleton />
                ) : isActivitiesError ? (
                  <CustomError onRetry={refetchActivities} />
                ) : !activities || !activities?.length === 0 ? (
                  <CustomEmpty />
                ) : (
                  activities.map((item, i) => (
                    <View key={i} style={styles.activityItem}>
                      <View style={styles.activityIcon}>
                        {getActivityIcon(item.evenType)}
                      </View>
                      <View style={styles.activityContent}>
                        <Text style={styles.activityType}>
                          {item.evenType === 'List' &&
                            `Listed for ${item.price ?? 0} ETH`}
                          {item.evenType === 'Mint' && 'Minted'}
                          {item.evenType === 'Sale' &&
                            `Sold for ${item.price ?? 0} ETH`}
                        </Text>
                        <Text style={styles.activityDetails}>
                          from {formatAddress(item.fromAddress)} to{' '}
                          {formatAddress(item.toAddress)} •{' '}
                          {timeAgo(item.createdAt)}
                        </Text>
                      </View>
                    </View>
                  ))
                )}
              </CollapsibleSection>

              <View>
                <Text style={[styles.sectionTitle, {marginBottom: scale(16)}]}>
                  Product NFTs
                </Text>

                {isProductLoading ? (
                  <ProductSliderSkeleton itemCount={2} />
                ) : isProductError ? (
                  <CustomError onRetry={isProductRefetch} />
                ) : !allProducts || allProducts.length === 0 ? (
                  <CustomEmpty type="noProduct" />
                ) : (
                  <ProductSlider products={allProducts} />
                )}
              </View>
            </View>
          </Animated.ScrollView>
        )}

        {!isLoading && (
          <View style={styles.actionButtons}>
            {/* CASE 1: Có auctionId hợp lệ (VD: "40") */}
            {productDetail?.auctionId !== null &&
              productDetail?.auctionId !== undefined &&
              productDetail?.auctionId !== '' &&
              !isNaN(Number(productDetail?.auctionId)) && (
                <>
                  <Button.Main
                    title="Place Bid"
                    style={styles.buyButton}
                    onPress={() => {
                      navigation.navigate('NoBottomTab', {
                        screen: 'PlaceBid',
                        params: {
                          auction: productDetail,
                          walletProvider,
                          address,
                        },
                      });
                    }}
                  />

                  <Button.Main
                    title="Cancel"
                    style={styles.offerButton}
                    textStyle={styles.offerButtonText}
                    onPress={() => navigation.goBack()}
                  />
                </>
              )}

            {/* CASE 2: auctionId === null → Buy ngay */}
            {productDetail?.auctionId === null && (
              <>
                <Button.Main
                  title="Buy Now"
                  style={styles.buyButton}
                  onPress={() => bottomSheetRef.current?.expand()}
                />

                <Button.Main
                  title="Cancel"
                  style={styles.offerButton}
                  textStyle={styles.offerButtonText}
                  onPress={() => navigation.goBack()}
                />
              </>
            )}

            {/* CASE 3: Không hề có auctionId */}
            {typeof productDetail?.auctionId === 'undefined' && (
              <>
                <Button.Main
                  title="Sell NFT"
                  style={styles.buyButton}
                  onPress={() => {
                    navigation.navigate('NoBottomTab', {
                      screen: 'ProductPosting',
                      params: {
                        product: productDetail,
                        walletProvider: walletProvider,
                        address: address,
                      },
                    });
                  }}
                />

                <Button.Main
                  title="Make Offer"
                  style={styles.offerButton}
                  textStyle={styles.offerButtonText}
                  onPress={() => {
                    navigation.navigate('NoBottomTab', {
                      screen: 'MakeOffer',
                      params: {
                        auction: productDetail,
                        walletProvider: walletProvider,
                        address: address,
                      },
                    });
                  }}
                />
              </>
            )}
          </View>
        )}

        <BuyReviewBottomSheet
          bottomSheetRef={bottomSheetRef}
          product={productDetail}
          loading={isBuyLoading}
          onConfirm={handleBlockchainPurchase}
        />

        <BuyNowSuccessModal
          visible={showSuccessModal}
          product={productDetail}
          onClose={() => {
            setShowSuccessModal(false);
          }}
          navigation={navigation}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default NFTDetailScreen;
