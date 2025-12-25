import {API_BASE} from '@env';
import React, {useCallback, useRef} from 'react';
import {View, Text, StatusBar, Animated} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAppKitAccount} from '@reown/appkit-ethers-react-native';

import {
  BackIcon,
  BoxLineIcon,
  ChartLineIcon,
  GridLineIcon,
  PlusIcon,
  StackLineIcon,
  UserLineIcon,
} from '~/assets/icons/icons';

import {Button} from '~/components/ui/Button';
import AnimatedHeader from '~/components/AnimatedHeader';
import CustomError from '~/components/CustomError/CustomError';
import Product_2List from '~/components/Product_2/Product_2List';
import CollectionCardSkeleton from '~/components/CustomSkeleton/CollectionCardSkeleton';

import {useProductsByCollection} from '~/hooks/useProductsByCollection';

import {commonStyles} from '~/styles/common';

import {Colors} from '~/theme/theme';
import styles from './Collection.styles';

const CollectionScreen = ({navigation, route}) => {
  const {address} = useAppKitAccount();
  const {collection, addressWallet, avatar, fullName} = route.params || {};

  const scrollY = useRef(new Animated.Value(0)).current;

  const isOwner = addressWallet?.toLowerCase() === address?.toLowerCase();

  const {
    products: productCollectionData,
    isLoading: isProductCollectionLoading,
    isError: isProductCollectionError,
    refetch: productCollectionRefetch,
  } = useProductsByCollection(collection?.id);

  useFocusEffect(
    useCallback(() => {
      if (collection?.id) {
        productCollectionRefetch();
      }
    }, [collection?.id, productCollectionRefetch]),
  );

  const stats = {
    items: productCollectionData?.length || 0,
    owners: collection?.owners || 1,
    floorPrice: collection?.floorPrice || '0.00',
  };

  const handleManageProducts = () => {
    navigation.navigate('NoBottomTab', {
      screen: 'AddProductsToCollection',
      params: {
        collection: {
          id: collection.id,
          name: collection.name,
          products: productCollectionData || [],
          listingId: collection?.listingId,
        },
      },
    });
  };

  return (
    <LinearGradient
      colors={['#111827', '#001656', '#0F1026']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.gradientBackground}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          translucent={false}
          backgroundColor={Colors.background}
          barStyle="light-content"
        />

        <AnimatedHeader
          scrollY={scrollY}
          title={collection.name}
          leftComponent={<BackIcon />}
        />

        <Animated.FlatList
          data={[1]}
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={styles.scrollContent}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: false},
          )}
          renderItem={() => (
            <>
              {/* Banner */}
              <View style={styles.bannerContainer}>
                <FastImage
                  source={{uri: `${API_BASE}/api/upload/${collection.image}`}}
                  style={styles.banner}
                  resizeMode="cover"
                />
                <LinearGradient
                  colors={[
                    'rgba(17, 24, 39, 0.3)',
                    'transparent',
                    'rgba(17, 24, 39, 0.8)',
                  ]}
                  style={styles.bannerOverlay}
                />
              </View>

              {/* Collection Info Card */}
              <View style={styles.collectionInfoCard}>
                <View style={styles.collectionHeader}>
                  <Text style={styles.collectionName}>{collection.name}</Text>
                  <Text style={styles.collectionDescription}>
                    {collection.description}
                  </Text>
                </View>
                <View style={styles.creatorSection}>
                  <View style={styles.creatorAvatar}>
                    <FastImage
                      source={{
                        uri: `${API_BASE}/api/upload/${avatar}`,
                      }}
                      style={styles.avatar}
                      resizeMode="cover"
                    />
                  </View>
                  <View style={styles.creatorInfo}>
                    <Text style={styles.creatorLabel}>Created by</Text>
                    <Text style={styles.creatorName}>
                      {fullName || 'Unknown'}
                    </Text>
                  </View>
                </View>
                <View style={styles.statsGrid}>
                  <View style={styles.statCard}>
                    <LinearGradient
                      colors={[
                        'rgba(1, 197, 186, 0.1)',
                        'rgba(1, 109, 176, 0.05)',
                      ]}
                      style={styles.statCardGradient}>
                      <StackLineIcon style={{color: Colors.primary}} />
                      <Text style={styles.statValue}>{stats.items}</Text>
                      <Text style={styles.statLabel}>Items</Text>
                    </LinearGradient>
                  </View>

                  <View style={styles.statCard}>
                    <LinearGradient
                      colors={[
                        'rgba(59, 130, 246, 0.1)',
                        'rgba(147, 51, 234, 0.05)',
                      ]}
                      style={styles.statCardGradient}>
                      <UserLineIcon style={{color: Colors.accent}} />
                      <Text style={styles.statValue}>{stats.owners}</Text>
                      <Text style={styles.statLabel}>Owners</Text>
                    </LinearGradient>
                  </View>

                  <View style={styles.statCard}>
                    <LinearGradient
                      colors={[
                        'rgba(245, 158, 11, 0.1)',
                        'rgba(251, 191, 36, 0.05)',
                      ]}
                      style={styles.statCardGradient}>
                      <ChartLineIcon style={{color: Colors.yellowColor}} />
                      <Text style={styles.statValue}>{stats.floorPrice}</Text>
                      <Text style={styles.statLabel}>Floor</Text>
                    </LinearGradient>
                  </View>
                </View>
                {isOwner && (
                  <View style={styles.ownerActions}>
                    <Button.Main
                      title="Managing NFTs"
                      iconLeft={<GridLineIcon />}
                      onPress={handleManageProducts}
                      useGradient
                    />
                  </View>
                )}
              </View>

              {/* Products Section */}
              <View style={styles.productsSection}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionTitleContainer}>
                    <View style={styles.sectionDivider} />
                    <Text style={[commonStyles.title, styles.sectionTitle]}>
                      NFTS IN COLLECTION
                    </Text>
                    <View style={styles.sectionDivider} />
                  </View>
                </View>

                {/* Products Grid */}
                <View>
                  {isProductCollectionLoading ? (
                    <CollectionCardSkeleton itemCount={4} layout="grid" />
                  ) : isProductCollectionError ? (
                    <CustomError onRetry={productCollectionRefetch} />
                  ) : productCollectionData?.length > 0 ? (
                    <Product_2List
                      data={productCollectionData}
                      onEditPress={false}
                    />
                  ) : (
                    <View style={styles.emptyStateContainer}>
                      <View style={styles.emptyIconCircle}>
                        <BoxLineIcon style={styles.boxIcon} />
                      </View>
                      <Text style={styles.emptyTitle}>No NFTs Yet</Text>
                      <Text style={styles.emptySubtitle}>
                        This collection doesn't have any NFTs yet
                      </Text>
                      {isOwner && (
                        <Button.Main
                          title="Add NFTs"
                          iconLeft={<PlusIcon />}
                          onPress={handleManageProducts}
                          useGradient
                          gradientColors={[Colors.secondary, Colors.primary]}
                          style={styles.addButton}
                        />
                      )}
                    </View>
                  )}
                </View>
              </View>
              <View style={styles.bottomSpacing} />
            </>
          )}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default CollectionScreen;
