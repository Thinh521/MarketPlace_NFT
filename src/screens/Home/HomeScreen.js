import React, {useState} from 'react';
import {View, StatusBar, FlatList, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAppKitAccount} from '@reown/appkit-ethers-react-native';

import Header from '~/components/Header';
import Carousel from './components/Carousel';
import Category from './components/Category';
import ProductList from '~/components/Product/ProductList';
import CustomError from '~/components/CustomError/CustomError';
import ArtistLeaderboard from './components/ArtistLeaderboard';
import CustomEmpty from '~/components/CustomEmpty/CustomEmpty';
import ProductSlider from '~/components/Product/ProductSlider';
import CollectionSlider from '~/components/Collection/CollectionSlider';
import ProductCardSkeleton from '~/components/CustomSkeleton/ProductCardSkeleton';
import CollectionCardSkeleton from '~/components/CustomSkeleton/CollectionCardSkeleton';

import {useArtists} from '~/hooks/useArtists';
import {useProducts} from '~/hooks/useProducts';
import {useProductCollections} from '~/hooks/useCollections';

import {commonStyles} from '~/styles/common';
import {Colors} from '~/theme/theme';
import {scale} from '~/utils/scaling';
import styles from './Home.styles';

const HomeScreen = () => {
  const navigation = useNavigation();
  const {address} = useAppKitAccount();
  const {bottom} = useSafeAreaInsets();

  const [activeTab, setActiveTab] = useState({
    label: 'Most Earning',
    sort: 'earning',
  });

  const {
    collectionData,
    isLoading: isCollectionLoading,
    error: isCollectionError,
    refetch: isCollectionRefetch,
  } = useProductCollections();

  const {allProducts, auctionProducts, isLoading, error, refetch} =
    useProducts(address);

  const {
    data: artists,
    isArtistsLoading,
    artistsError,
    artistsRefetch,
  } = useArtists({
    sortBy: activeTab.sort,
    timeRange: '24h',
    page: 1,
    limit: 10,
  });

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

        <View style={styles.container}>
          <Header title="Netfly" />

          <FlatList
            data={[1]}
            keyExtractor={(_, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              styles.scrollContainer,
              {paddingBottom: bottom + scale(140)},
            ]}
            renderItem={() => (
              <>
                <View style={styles.carouselContainer}>
                  <Carousel />
                </View>

                <View style={styles.categoryContainer}>
                  <Category />
                </View>

                <View style={styles.productContainer}>
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>Collection</Text>
                    <TouchableOpacity
                      style={commonStyles.viewMoreButton}
                      onPress={() =>
                        navigation.navigate('NoBottomTab', {
                          screen: 'AllCollections',
                        })
                      }>
                      <Text style={commonStyles.viewMoreText}>View all</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.expiringSoon}>
                    {isCollectionLoading ? (
                      <CollectionCardSkeleton itemCount={2} />
                    ) : isCollectionError ? (
                      <CustomError onRetry={isCollectionRefetch} />
                    ) : !collectionData || collectionData.length === 0 ? (
                      <CustomEmpty />
                    ) : (
                      <CollectionSlider
                        data={collectionData}
                        onEditPress={false}
                      />
                    )}
                  </View>
                </View>

                <View style={styles.mostActiveContainer}>
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>Most active</Text>
                    <TouchableOpacity style={commonStyles.viewMoreButton}>
                      <Text style={commonStyles.viewMoreText}>View all</Text>
                    </TouchableOpacity>
                  </View>
                  <ArtistLeaderboard
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    artists={artists}
                    loading={isArtistsLoading}
                    error={artistsError}
                    onRetry={artistsRefetch}
                  />
                </View>

                <View style={styles.expiringSoonContainer}>
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>Expiring soon</Text>
                    <TouchableOpacity
                      style={commonStyles.viewMoreButton}
                      onPress={() =>
                        navigation.navigate('NoBottomTab', {
                          screen: 'AllProducts',
                        })
                      }>
                      <Text style={commonStyles.viewMoreText}>View all</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.expiringSoon}>
                    {isLoading ? (
                      <ProductCardSkeleton layout="slider" itemCount={2} />
                    ) : error ? (
                      <CustomError onRetry={refetch} />
                    ) : !auctionProducts || auctionProducts.length === 0 ? (
                      <CustomEmpty />
                    ) : (
                      <ProductSlider products={auctionProducts} />
                    )}
                  </View>
                </View>

                <View style={styles.allProductsContainer}>
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>Popular</Text>
                    <TouchableOpacity
                      style={commonStyles.viewMoreButton}
                      onPress={() =>
                        navigation.navigate('NoBottomTab', {
                          screen: 'AllProducts',
                        })
                      }>
                      <Text style={commonStyles.viewMoreText}>View all</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.expiringSoon}>
                    {isLoading ? (
                      <ProductCardSkeleton layout="grid" itemCount={4} />
                    ) : error ? (
                      <CustomError onRetry={refetch} />
                    ) : !allProducts || allProducts.length === 0 ? (
                      <CustomEmpty />
                    ) : (
                      <ProductList products={allProducts} />
                    )}
                  </View>
                </View>
              </>
            )}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default HomeScreen;
