import {StyleSheet} from 'react-native';
import {scale} from '~/utils/scaling';
import {Colors, FontWeights} from '~/theme/theme';

export default StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scale(16),
    paddingHorizontal: scale(16),
    zIndex: 10,
  },
  headerButton: {
    width: scale(44),
    height: scale(44),
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(10px)',
    borderWidth: 1,
    backgroundColor: Colors.overlay,
    borderColor: Colors.borderLightTransparent,
  },
  headerActions: {
    flexDirection: 'row',
    gap: scale(12),
  },
  headerTitle: {
    flex: 1,
    marginHorizontal: scale(12),
    fontSize: scale(16),
    fontWeight: FontWeights.semiBold,
    color: Colors.white,
    textAlign: 'left',
    includeFontPadding: false,
  },
  box: {
    width: scale(44),
  },
});
