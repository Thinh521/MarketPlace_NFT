import React from 'react';
import {Dimensions} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {scale} from '~/utils/scaling';

const {width} = Dimensions.get('window');

const ProductNFTDetailSkeleton = () => {
  return (
    <SkeletonPlaceholder
      backgroundColor="#323C5A"
      highlightColor="#6E82B4"
      speed={1200}
      borderRadius={8}>
      <SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          width="100%"
          height={scale(300)}
          borderRadius={0}
        />
        <SkeletonPlaceholder.Item padding={scale(16)}>
          {/* Title */}
          <SkeletonPlaceholder.Item
            marginTop={scale(10)}
            width="60%"
            height={scale(24)}
          />

          {/* Price */}
          <SkeletonPlaceholder.Item
            marginTop={scale(8)}
            width="100%"
            height={scale(20)}
          />

          <SkeletonPlaceholder.Item
            marginTop={scale(20)}
            width="100%"
            height={scale(80)}
          />

          {/* Buttons */}
          <SkeletonPlaceholder.Item
            flexDirection="row"
            marginTop={scale(20)}
            justifyContent="space-between">
            <SkeletonPlaceholder.Item
              width={(width - scale(48)) / 2}
              height={scale(44)}
              borderRadius={8}
            />
            <SkeletonPlaceholder.Item
              width={(width - scale(48)) / 2}
              height={scale(44)}
              borderRadius={8}
            />
          </SkeletonPlaceholder.Item>

          {/* Creator & Owner Skeleton */}
          {[0, 1].map(i => (
            <SkeletonPlaceholder.Item
              key={i}
              flexDirection="row"
              alignItems="center"
              marginTop={i === 0 ? scale(24) : scale(16)}
              gap={scale(12)}>
              <SkeletonPlaceholder.Item
                width={scale(40)}
                height={scale(40)}
                borderRadius={999}
              />
              <SkeletonPlaceholder.Item flex={1}>
                <SkeletonPlaceholder.Item width="50%" height={scale(16)} />
                <SkeletonPlaceholder.Item
                  marginTop={scale(4)}
                  width="70%"
                  height={scale(14)}
                />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
          ))}
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

export default ProductNFTDetailSkeleton;
