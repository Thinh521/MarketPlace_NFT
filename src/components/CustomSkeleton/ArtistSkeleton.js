import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {scale} from '~/utils/scaling';

export default function ArtistSkeleton() {
  const items = Array.from({length: 6});

  return (
    <SkeletonPlaceholder
      backgroundColor="#323C5A"
      highlightColor="#6E82B4"
      speed={1200}
      borderRadius={8}>
      <SkeletonPlaceholder.Item paddingVertical={scale(16)}>
        {items.map((_, index) => (
          <SkeletonPlaceholder.Item
            key={index}
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            marginTop={scale(14)}
            paddingHorizontal={scale(4)}>
            <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
              <SkeletonPlaceholder.Item
                width={scale(46)}
                height={scale(46)}
                borderRadius={999}
              />

              <SkeletonPlaceholder.Item marginLeft={scale(12)}>
                <SkeletonPlaceholder.Item
                  width={scale(120)}
                  height={scale(16)}
                />

                <SkeletonPlaceholder.Item
                  width={scale(90)}
                  height={scale(14)}
                  marginTop={scale(6)}
                />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>

            <SkeletonPlaceholder.Item width={scale(70)} height={scale(16)} />
          </SkeletonPlaceholder.Item>
        ))}
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
}
