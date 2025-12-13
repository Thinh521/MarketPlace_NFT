import React from 'react';
import {Dimensions} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {scale} from '~/utils/scaling';
import {Colors} from '~/theme/theme';

const {width} = Dimensions.get('window');

const ProductPostingSkeleton = ({itemCount = 4}) => {
  const itemWidth = (width - scale(52)) / 2;

  return (
    <SkeletonPlaceholder
      backgroundColor="#323C5A"
      highlightColor="#6E82B4"
      speed={1200}>
      <SkeletonPlaceholder.Item
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="space-between">
        {Array.from({length: itemCount}).map((_, index) => (
          <SkeletonPlaceholder.Item
            key={index}
            width={itemWidth}
            marginBottom={scale(16)}
            borderWidth={1}
            borderColor={Colors.border}
            overflow="hidden">
            <SkeletonPlaceholder.Item width="100%" height={scale(160)} />

            <SkeletonPlaceholder.Item padding={scale(10)}>
              <SkeletonPlaceholder.Item
                width="80%"
                height={scale(14)}
                borderRadius={8}
                marginBottom={scale(10)}
              />

              <SkeletonPlaceholder.Item
                width="50%"
                height={scale(12)}
                borderRadius={8}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        ))}
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

export default ProductPostingSkeleton;
