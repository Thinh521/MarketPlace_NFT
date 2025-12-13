import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import Product_2Card from './Product_2Card';
import {scale} from '~/utils/scaling';

const Product_2Slider = ({
  data,
  selectMode = false,
  selectedIds = [],
  onSelectToggle,
  onEditPress,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `slider-${item.id ?? 'noid'}-${index}`}
        decelerationRate="fast"
        snapToInterval={200 + scale(12)}
        snapToAlignment="start"
        contentContainerStyle={styles.listContent}
        renderItem={({item}) => (
          <Product_2Card
            item={item}
            selectMode={selectMode}
            isSelected={selectedIds.includes(item.id)}
            onSelectToggle={onSelectToggle}
            onPress={() =>
              navigation.navigate('NoBottomTab', {
                screen: 'NFTDetail',
                params: {product: item},
              })
            }
            onEditPress={
              onEditPress === false
                ? false
                : () =>
                    navigation.navigate('NoBottomTab', {
                      screen: 'CreateUpdateNFT',
                      params: {product: item},
                    })
            }
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: scale(10),
  },
});

export default Product_2Slider;
