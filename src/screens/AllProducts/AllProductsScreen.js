import React from 'react';
import {ActivityIndicator, FlatList, StatusBar, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

import ProductList from '~/components/Product/ProductList';
import CustomError from '~/components/CustomError/CustomError';
import CustomEmpty from '~/components/CustomEmpty/CustomEmpty';
import ProductCardSkeleton from '~/components/CustomSkeleton/ProductCardSkeleton';

import {useProducts} from '~/hooks/useProducts';

import {Colors} from '~/theme/theme';
import {scale} from '~/utils/scaling';
import styles from './AllProducts.styles';

const AllProductsScreen = () => {
  const {bottom} = useSafeAreaInsets();

  const {
    allProducts,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProducts();

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;

    return (
      <View style={{padding: scale(20), alignItems: 'center'}}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={{color: Colors.white, marginTop: 8}}>
          Loading more products...
        </Text>
      </View>
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

        <FlatList
          data={[1]}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContainer,
            {paddingBottom: bottom + scale(80)},
          ]}
          renderItem={() => (
            <>
              <Text style={styles.title}>Products NFTS</Text>
              {isLoading ? (
                <ProductCardSkeleton layout="grid" itemCount={4} />
              ) : isError ? (
                <CustomError onRetry={refetch} />
              ) : !allProducts || allProducts.length === 0 ? (
                <CustomEmpty />
              ) : (
                <ProductList products={allProducts} />
              )}
            </>
          )}
          onEndReached={loadMore}
          onEndReachedThreshold={0.3}
          ListFooterComponent={renderFooter}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default AllProductsScreen;
