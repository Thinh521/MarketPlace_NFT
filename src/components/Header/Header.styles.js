import {StyleSheet} from 'react-native';
import {Colors, FontSizes, FontWeights} from '~/theme/theme';
import {scale} from '~/utils/scaling';

export default StyleSheet.create({
  container: {
    paddingTop: scale(20),
    paddingHorizontal: scale(16),
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(20),
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(12),
  },
  logo: {
    width: scale(30),
    height: scale(30),
  },
  appName: {
    color: Colors.white,
    fontSize: FontSizes.xlarge,
    fontWeight: FontWeights.bold,
    letterSpacing: -0.5,
  },
  notificationDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: scale(8),
    height: scale(8),
    borderRadius: 999,
    backgroundColor: Colors.redColor,
  },
  searchContainer: {
    paddingBottom: scale(20),
  },
});
