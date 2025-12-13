import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import ProductCard from './ProductCard';
import {scale} from '~/utils/scaling';

const ProductList = ({products}) => {
  const navigation = useNavigation();

  return (
    <FlatList
      data={products}
      numColumns={2}
      renderItem={({item}) => (
        <View style={styles.itemWrapper}>
          <ProductCard
            product={item}
            layout="grid"
            onPress={() =>
              navigation.navigate('NoBottomTab', {
                screen: 'NFTDetail',
                params: {
                  product: item,
                },
              })
            }
          />
        </View>
      )}
      keyExtractor={(item, index) => `list-${item.id ?? 'noid'}-${index}`}
      contentContainerStyle={styles.container}
      columnWrapperStyle={styles.columnWrapper}
      ItemSeparatorComponent={() => <View style={{height: scale(10)}} />}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: scale(10),
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: scale(4),
  },
  itemWrapper: {
    flex: 1,
    maxWidth: '48%',
  },
});

export default ProductList;
