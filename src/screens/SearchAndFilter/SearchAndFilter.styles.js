import {StyleSheet} from 'react-native';
import {scale} from '../../utils/scaling';
import {Colors} from '../../theme/theme';

export default StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  searchAndFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(20),
    paddingHorizontal: scale(16),
    columnGap: scale(12),
  },
  inputWrapper: {
    flex: 1,
  },
  inputStyle: {
    width: '100%',
  },
  buttonFilter: {
    width: scale(50),
    height: scale(50),
  },
  section: {
    paddingHorizontal: scale(16),
    marginBottom: scale(26),
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
});
