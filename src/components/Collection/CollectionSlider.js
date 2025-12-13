import React from 'react';
import {FlatList, View} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import CollectionCard from './CollectionCard';
import {scale} from '~/utils/scaling';

const CollectionSlider = ({data, onEditPress}) => {
  const navigation = useNavigation();

  return (
    <View>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        decelerationRate="fast"
        snapToInterval={200 + scale(12)}
        snapToAlignment="start"
        renderItem={({item}) => (
          <CollectionCard
            item={item}
            onPress={() =>
              navigation.navigate('NoBottomTab', {
                screen: 'CollectionDetail',
                params: {
                  collection: item,
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
        )}
      />
    </View>
  );
};

export default CollectionSlider;
