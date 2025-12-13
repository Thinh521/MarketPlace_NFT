import {StyleSheet} from 'react-native';
import {Colors, FontWeights} from '~/theme/theme';
import {scale} from '~/utils/scaling';

export default StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContainer: {
    marginTop: scale(30),
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(10),
  },
  title: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: FontWeights.extraBold,
  },
  buttonMore: {
    borderRadius: 999,
    paddingVertical: scale(6),
    paddingHorizontal: scale(12),
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  viewMoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  carouselContainer: {
    alignItems: 'center',
  },
  categoryContainer: {
    marginTop: scale(28),
    paddingHorizontal: scale(16),
  },
  productContainer: {
    marginTop: scale(10),
    marginBottom: scale(30),
    paddingHorizontal: scale(16),
  },
  mostActiveContainer: {
    marginTop: scale(10),
    paddingHorizontal: scale(16),
  },
  expiringSoonContainer: {
    marginTop: scale(20),
    marginBottom: scale(30),
    paddingHorizontal: scale(16),
  },
  expiringSoon: {
    marginTop: scale(10),
  },
  allProductsContainer: {
    paddingHorizontal: scale(16),
  },
});
