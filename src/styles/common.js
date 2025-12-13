import {StyleSheet} from 'react-native';
import {Colors, FontSizes, FontWeights} from '../theme/theme';
import {scale} from '../utils/scaling';

export const commonStyles = StyleSheet.create({
  title: {
    color: Colors.primary,
    fontSize: FontSizes.semiLarge,
    fontWeight: FontWeights.extraBold,
    letterSpacing: 1,
  },
  border: {
    borderBottomWidth: 1,
    borderBlockColor: Colors.border,
  },
  viewMoreButton: {
    paddingVertical: scale(6),
    paddingHorizontal: scale(12),
    borderRadius: scale(8),
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
  },
  viewMoreText: {
    color: '#6366F1',
    fontSize: FontSizes.small,
    fontWeight: FontWeights.bold,
  },
});
