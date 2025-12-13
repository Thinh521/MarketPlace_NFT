import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import {scale} from '~/utils/scaling';
import CollectionCard from './CollectionCard';

const CollectionList = ({
  data,
  onEditPress,
  addressWallet,
  avatar,
  fullName,
}) => {
  const navigation = useNavigation();

  return (
    <FlatList
      data={data}
      numColumns={2}
      renderItem={({item}) => (
        <View style={styles.itemWrapper}>
          <CollectionCard
            item={item}
            onPress={() =>
              navigation.navigate('NoBottomTab', {
                screen: 'CollectionDetail',
                params: {
                  collection: item,
                  addressWallet: addressWallet,
                  avatar: avatar,
                  fullName: fullName,
                },
              })
            }
            onEditPress={
              onEditPress === false
                ? false
                : () =>
                    navigation.navigate('NoBottomTab', {
                      screen: 'ProductCollectionManager',
                      params: {
                        collection: item,
                      },
                    })
            }
          />
        </View>
      )}
      keyExtractor={item => item.id}
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

export default CollectionList;
