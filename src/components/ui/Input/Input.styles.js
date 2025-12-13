import {StyleSheet} from 'react-native';
import {Colors, FontSizes, FontWeights} from '~/theme/theme';
import {scale} from '~/utils/scaling';

export default StyleSheet.create({
  label: {
    marginBottom: scale(8),
    fontSize: FontSizes.small,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: scale(10),
    paddingHorizontal: scale(16),
    backgroundColor: Colors.deepBackground,
    width: '100%',
  },
  input: {
    flex: 1,
    height: '100%',
    paddingVertical: scale(16),
    fontSize: FontSizes.small,
    color: Colors.white,
    lineHeight: 22,
  },
  disabledContainer: {
    opacity: 0.6,
  },
  errorContainer: {
    borderColor: Colors.redColor,
  },
  leftIcon: {
    marginRight: scale(8),
  },
  rightContent: {
    marginLeft: scale(8),
  },
  eyeIcon: {
    width: scale(20),
    height: scale(20),
    color: '#626262',
  },
  rightIcon: {
    width: scale(20),
    height: scale(20),
  },
  clearButton: {
    marginRight: scale(8),
  },
  clearButtonText: {
    color: Colors.white,
    fontSize: FontSizes.medium,
  },
  errorText: {
    color: Colors.redColor,
    marginTop: scale(4),
    fontSize: FontSizes.small,
    fontWeight: FontWeights.medium,
  },
  charCount: {
    color: Colors.title,
    marginTop: scale(4),
    alignSelf: 'flex-end',
    fontSize: FontSizes.small,
  },
  charCountExceeded: {
    color: Colors.redColor,
  },
});
