import {StyleSheet} from 'react-native';
import {Colors, FontSizes, FontWeights} from '~/theme/theme';
import {scale} from '~/utils/scaling';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  logo: {
    width: scale(70),
    height: scale(70),
    marginBottom: scale(10),
  },
  text: {
    color: Colors.title,
    fontSize: FontSizes.xlarge,
    fontWeight: FontWeights.bold,
  },
});
