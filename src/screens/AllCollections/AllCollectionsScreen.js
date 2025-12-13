import React from 'react';
import {FlatList, StatusBar, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

import CustomError from '~/components/CustomError/CustomError';
import CustomEmpty from '~/components/CustomEmpty/CustomEmpty';
import CollectionList from '~/components/Collection/CollectionList';
import CollectionCardSkeleton from '~/components/CustomSkeleton/CollectionCardSkeleton';

import {useProductCollections} from '~/hooks/useCollections';

import {Colors} from '~/theme/theme';
import {scale} from '~/utils/scaling';
import styles from './AllCollections.styles';

const AllCollectionsScreen = () => {
  const {bottom} = useSafeAreaInsets();

  const {
    collectionData,
    isLoading: isCollectionLoading,
    error: isCollectionError,
    refetch: isCollectionRefetch,
  } = useProductCollections();

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
              <Text style={styles.title}>Collections</Text>
              {isCollectionLoading ? (
                <CollectionCardSkeleton itemCount={2} />
              ) : isCollectionError ? (
                <CustomError onRetry={isCollectionRefetch} />
              ) : !collectionData || collectionData.length === 0 ? (
                <CustomEmpty />
              ) : (
                <CollectionList data={collectionData} onEditPress={false} />
              )}
            </>
          )}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default AllCollectionsScreen;
