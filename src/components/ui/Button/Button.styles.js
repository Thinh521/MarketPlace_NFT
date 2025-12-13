import {StyleSheet} from 'react-native';
import {FontSizes, FontWeights, Colors} from '~/theme/theme';
import {scale} from '~/utils/scaling';

export const styles = StyleSheet.create({
  baseButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: scale(12),
    paddingVertical: scale(10),
    backgroundColor: Colors.primary,
    overflow: 'hidden',
    borderRadius: 12,
  },
  gradientWrapper: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  disabledButton: {
    opacity: 0.6,
    backgroundColor: Colors.disabledBackground,
  },
  buttonContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  baseText: {
    fontWeight: FontWeights.semiBold,
    fontSize: FontSizes.medium,
    lineHeight: scale(24),
    color: Colors.white,
  },
  disabledText: {
    color: Colors.disabledText,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLeft: {
    marginRight: scale(8),
  },
  iconRight: {
    marginLeft: scale(8),
  },
  loadingIndicator: {
    marginRight: scale(8),
  },
  textButtonText: {
    color: Colors.primary,
    fontWeight: FontWeights.semiBold,
    fontSize: FontSizes.medium,
  },
  disabledTextButton: {
    opacity: 0.6,
  },
  disabledTextButtonText: {
    color: Colors.disabledText,
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(10),
    borderRadius: 10,
    backgroundColor: Colors.primary,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(10),
    borderRadius: 10,
    backgroundColor: Colors.primary,
  },
});
