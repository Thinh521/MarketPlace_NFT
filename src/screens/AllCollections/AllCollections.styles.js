import {StyleSheet} from 'react-native';
import {scale} from '~/utils/scaling';
import {Colors, FontSizes, FontWeights} from '~/theme/theme';

export default StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContainer: {
    paddingVertical: scale(20),
    paddingHorizontal: scale(16),
  },
  title: {
    fontSize: FontSizes.large,
    color: Colors.white,
    fontWeight: FontWeights.extraBold,
    marginBottom: scale(16),
  },
});
