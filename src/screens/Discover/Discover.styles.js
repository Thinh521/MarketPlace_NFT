import {StyleSheet} from 'react-native';
import {scale} from '~/utils/scaling';
import {Colors, FontSizes} from '~/theme/theme';

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  section: {
    paddingHorizontal: scale(16),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(16),
  },
  sectionTitle: {
    fontSize: scale(20),
    fontWeight: '700',
    color: Colors.white,
    marginBottom: scale(4),
  },
  sectionSubtitle: {
    color: Colors.textHighlight,
    fontSize: FontSizes.small,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginVertical: scale(24),
    marginHorizontal: scale(16),
  },
});

export default styles;
