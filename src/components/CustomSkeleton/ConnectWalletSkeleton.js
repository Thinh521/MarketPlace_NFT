import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {scale} from '~/utils/scaling';
import {Colors} from '../../theme/theme';

// Avatar + User Info
export const UserHeaderSkeleton = () => (
  <SkeletonPlaceholder
    backgroundColor="#323C5A"
    highlightColor="#6E82B4"
    speed={1200}
    borderRadius={8}>
    <SkeletonPlaceholder.Item
      flexDirection="row"
      alignItems="center"
      marginBottom={scale(16)}
      borderWidth={1}
      borderColor={Colors.border}
      padding={scale(14)}
      borderRadius={12}>
      <SkeletonPlaceholder.Item
        width={scale(60)}
        height={scale(60)}
        borderRadius={scale(999)}
      />
      <SkeletonPlaceholder.Item flex={1} marginLeft={scale(12)}>
        <SkeletonPlaceholder.Item
          width="60%"
          height={scale(16)}
          marginBottom={scale(8)}
        />
        <SkeletonPlaceholder.Item width="40%" height={scale(14)} />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder.Item>
  </SkeletonPlaceholder>
);

// Buttons
export const ButtonsSkeleton = () => (
  <SkeletonPlaceholder
    backgroundColor="#323C5A"
    highlightColor="#6E82B4"
    speed={1200}
    borderRadius={8}>
    <SkeletonPlaceholder.Item
      flexDirection="row"
      justifyContent="space-between"
      marginTop={scale(16)}>
      <SkeletonPlaceholder.Item
        flex={1}
        height={scale(40)}
        borderRadius={scale(10)}
        marginRight={scale(10)}
      />
      <SkeletonPlaceholder.Item
        flex={1}
        height={scale(40)}
        borderRadius={scale(10)}
        marginLeft={scale(10)}
      />
    </SkeletonPlaceholder.Item>
  </SkeletonPlaceholder>
);
