import React from 'react';
import {Dimensions} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {scale} from '~/utils/scaling';
import {Colors} from '~/theme/theme';

const {width} = Dimensions.get('window');

const ProductSliderSkeleton = ({itemCount = 4}) => {
  const itemWidth = width * 0.7;

  return (
    <SkeletonPlaceholder
      backgroundColor="#323C5A"
      highlightColor="#6E82B4"
      speed={1200}>
      <SkeletonPlaceholder.Item flexDirection="row" justifyContent="flex-start">
        {Array.from({length: itemCount}).map((_, index) => (
          <SkeletonPlaceholder.Item
            key={index}
            width={itemWidth}
            marginRight={scale(16)}
            borderWidth={1}
            borderColor={Colors.borderTertiary}
            overflow="hidden">
            {/* Image */}
            <SkeletonPlaceholder.Item height={scale(160)} />

            {/* Content */}
            <SkeletonPlaceholder.Item padding={scale(14)}>
              {/* Title */}
              <SkeletonPlaceholder.Item
                width="100%"
                height={scale(16)}
                marginBottom={scale(10)}
                borderRadius={8}
              />

              {/* Price + stock */}
              <SkeletonPlaceholder.Item
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                marginBottom={scale(12)}>
                <SkeletonPlaceholder.Item
                  width="40%"
                  height={scale(14)}
                  borderRadius={8}
                />
                <SkeletonPlaceholder.Item
                  width="20%"
                  height={scale(14)}
                  borderRadius={8}
                />
              </SkeletonPlaceholder.Item>

              {/* Artist + Likes */}
              <SkeletonPlaceholder.Item
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center">
                <SkeletonPlaceholder.Item
                  flexDirection="row"
                  alignItems="center"
                  gap={scale(8)}>
                  <SkeletonPlaceholder.Item
                    width={scale(18)}
                    height={scale(18)}
                    borderRadius={scale(9)}
                  />
                  <SkeletonPlaceholder.Item
                    width={scale(60)}
                    height={scale(12)}
                    borderRadius={8}
                  />
                </SkeletonPlaceholder.Item>

                <SkeletonPlaceholder.Item
                  width={scale(30)}
                  height={scale(12)}
                  borderRadius={8}
                />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        ))}
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

export default ProductSliderSkeleton;
