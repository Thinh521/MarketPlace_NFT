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
  content: {
    paddingHorizontal: scale(16),
    paddingTop: scale(24),
  },
  reviewCard: {
    flexDirection: 'row',
    borderRadius: scale(16),
    padding: scale(12),
    marginBottom: scale(20),
    gap: scale(12),
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.deepBackground,
  },
  reviewImage: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(12),
  },
  reviewInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  reviewCollectionName: {
    color: Colors.textGray,
    fontSize: FontSizes.small,
    marginBottom: scale(4),
  },
  reviewProductName: {
    color: Colors.white,
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.bold,
    marginBottom: scale(6),
  },
  reviewQuantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
  },
  reviewQuantity: {
    color: Colors.textGray,
    fontSize: FontSizes.small,
  },
  reviewPriceContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  reviewPriceLabel: {
    color: Colors.textGray,
    fontSize: FontSizes.small,
    marginBottom: scale(4),
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  reviewPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
    marginBottom: scale(2),
  },
  reviewPriceValue: {
    fontSize: scale(18),
    fontWeight: '700',
    color: Colors.ethereum,
  },
  reviewUsdPrice: {
    color: Colors.textGray,
    fontSize: FontSizes.small,
  },
  sectionHeader: {
    marginBottom: scale(20),
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionDivider: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.borderLight,
  },
  sectionTitle: {
    marginHorizontal: scale(12),
  },
  formGroup: {
    marginBottom: scale(16),
  },
  label: {
    color: Colors.white,
    fontSize: scale(14),
    fontWeight: FontWeights.semiBold,
    marginBottom: scale(8),
  },
  inputContainer: {
    marginBottom: scale(8),
  },
  buttonContainer: {
    padding: scale(16),
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
});
