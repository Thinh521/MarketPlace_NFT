import React from 'react';
import {Dimensions} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {scale} from '~/utils/scaling';
import {Colors} from '~/theme/theme';

const {width} = Dimensions.get('window');

const CollectionCardSkeleton = ({itemCount = 4, layout = 'grid'}) => {
  const isSlider = layout === 'slider';
  const cardWidth = isSlider ? width * 0.7 : (width - scale(46)) / 2;

  return (
    <SkeletonPlaceholder
      backgroundColor="#323C5A"
      highlightColor="#6E82B4"
      speed={1200}>
      <SkeletonPlaceholder.Item
        flexDirection={isSlider ? 'row' : 'row'}
        flexWrap={!isSlider ? 'wrap' : 'nowrap'}
        justifyContent={isSlider ? 'flex-start' : 'space-between'}>
        {Array.from({length: itemCount}).map((_, index) => (
          <SkeletonPlaceholder.Item
            key={index}
            width={cardWidth}
            marginRight={isSlider ? scale(12) : 0}
            marginBottom={!isSlider ? scale(10) : 0}
            borderRadius={scale(16)}
            borderWidth={1}
            borderColor={Colors.border}
            overflow="hidden"
            padding={scale(10)}
            backgroundColor="rgba(17, 24, 39, 0.5)">
            <SkeletonPlaceholder.Item
              width="100%"
              height={scale(130)}
              borderRadius={scale(8)}
            />

            <SkeletonPlaceholder.Item
              width="80%"
              height={scale(14)}
              borderRadius={scale(8)}
              marginTop={scale(14)}
            />

            <SkeletonPlaceholder.Item
              width="100%"
              height={scale(12)}
              borderRadius={8}
              marginTop={scale(12)}
            />
          </SkeletonPlaceholder.Item>
        ))}
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

export default CollectionCardSkeleton;
