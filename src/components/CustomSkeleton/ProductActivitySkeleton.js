import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {scale} from '~/utils/scaling';
import {Colors} from '~/theme/theme';

const ProductActivitySkeleton = ({itemCount = 2}) => {
  return (
    <SkeletonPlaceholder
      backgroundColor="#323C5A"
      highlightColor="#6E82B4"
      speed={1200}
      borderRadius={8}>
      {Array.from({length: itemCount}).map((_, index) => (
        <SkeletonPlaceholder.Item
          key={index}
          flexDirection="row"
          alignItems="center"
          backgroundColor={Colors.deepBackground}
          borderWidth={1}
          borderColor={Colors.border}
          borderRadius={scale(8)}
          padding={scale(16)}
          marginBottom={scale(10)}
          gap={scale(12)}>
          <SkeletonPlaceholder.Item
            width={scale(40)}
            height={scale(40)}
            borderRadius={999}
          />

          <SkeletonPlaceholder.Item flex={1}>
            <SkeletonPlaceholder.Item
              height={scale(16)}
              width="50%"
              marginBottom={scale(8)}
            />

            <SkeletonPlaceholder.Item height={scale(14)} width="75%" />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      ))}
    </SkeletonPlaceholder>
  );
};

export default ProductActivitySkeleton;
