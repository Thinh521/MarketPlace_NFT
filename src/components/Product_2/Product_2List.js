import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import Product_2Card from './Product_2Card';
import {scale} from '~/utils/scaling';

const Product_2List = ({
  data,
  selectMode = false,
  selectedIds = [],
  onSelectToggle,
  onEditPress,
}) => {
  const navigation = useNavigation();

  return (
    <FlatList
      data={data}
      numColumns={2}
      renderItem={({item}) => (
        <View style={styles.itemWrapper}>
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

export default Product_2List;
