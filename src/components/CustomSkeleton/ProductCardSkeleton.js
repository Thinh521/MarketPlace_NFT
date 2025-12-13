import React from 'react';
import {Dimensions} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {scale} from '~/utils/scaling';
import {Colors} from '~/theme/theme';

const {width} = Dimensions.get('window');

const ProductCardSkeleton = ({itemCount = 4, layout = 'grid'}) => {
  const isSlider = layout === 'slider';
  const itemWidth = isSlider ? width * 0.7 : (width - scale(52)) / 2;

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
            width={itemWidth}
            marginRight={isSlider ? scale(16) : 0}
            marginBottom={!isSlider ? scale(16) : 0}
            borderWidth={1}
            borderColor={Colors.borderTertiary}
            overflow="hidden">
            {/* Image */}
            <SkeletonPlaceholder.Item
              height={isSlider ? scale(160) : scale(140)}
            />

            {/* Content */}
            <SkeletonPlaceholder.Item padding={scale(10)}>
              <SkeletonPlaceholder.Item
                width="100%"
                height={scale(14)}
                marginBottom={scale(8)}
                borderRadius={8}
              />

              <SkeletonPlaceholder.Item
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                marginBottom={scale(10)}>
                <SkeletonPlaceholder.Item
                  width="45%"
                  height={scale(12)}
                  borderRadius={8}
                />
                <SkeletonPlaceholder.Item
                  width="25%"
                  height={scale(12)}
                  borderRadius={8}
                />
              </SkeletonPlaceholder.Item>

              {/* Artist info */}
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
                    height={scale(10)}
                    borderRadius={8}
                  />
                </SkeletonPlaceholder.Item>
                <SkeletonPlaceholder.Item
                  width={scale(30)}
                  height={scale(10)}
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

export default ProductCardSkeleton;
