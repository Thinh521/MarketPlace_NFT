import React from 'react';
import {FlatList, View} from 'react-native';
import NewsCard from './NewsCard';

const NewsSlider = ({articles}) => {
  return (
    <View>
      <FlatList
        data={articles}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => <NewsCard article={item} layout="slider" />}
        keyExtractor={(item, index) => item.id?.toString() ?? index.toString()}
      />
    </View>
  );
};

export default NewsSlider;
