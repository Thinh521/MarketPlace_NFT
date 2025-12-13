import React from 'react';
import {FlatList, View} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import ProductCard from './ProductCard';

const ProductSlider = ({products}) => {
  const navigation = useNavigation();

  return (
    <View>
      <FlatList
        data={products}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <ProductCard
            product={item}
            layout="slider"
            onPress={() =>
              navigation.navigate('NoBottomTab', {
                screen: 'NFTDetail',
                params: {
                  product: item,
                },
              })
            }
          />
        )}
        keyExtractor={(item, index) => `slider-${item.id ?? 'noid'}-${index}`}
      />
    </View>
  );
};

export default ProductSlider;
