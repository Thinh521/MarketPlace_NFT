import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import NewsCard from './NewsCard';
import {scale} from '~/utils/scaling';

const NewsList = ({articles}) => {
  return (
    <FlatList
      data={articles}
      numColumns={2}
      renderItem={({item}) => (
        <View style={styles.itemWrapper}>
          <NewsCard article={item} layout="grid" />
        </View>
      )}
      keyExtractor={item => item.id?.toString()}
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

export default NewsList;
