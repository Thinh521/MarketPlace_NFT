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
  footerLoader: {
    marginTop: scale(30),
    marginBottom: scale(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: Colors.textGray,
    fontSize: FontSizes.medium,
    marginTop: scale(16),
    fontWeight: FontWeights.medium,
  },
  headerContainer: {
    marginBottom: scale(24),
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: scale(24),
  },
  titleGradient: {
    paddingHorizontal: scale(24),
    paddingVertical: scale(8),
    borderRadius: scale(20),
    marginBottom: scale(8),
  },
  titleText: {
    fontSize: scale(24),
    fontWeight: FontWeights.extraBold,
    color: Colors.white,
    letterSpacing: 3,
  },
  subtitle: {
    color: Colors.textGray,
    fontSize: FontSizes.small,
    fontWeight: FontWeights.medium,
  },

  // Search Bar
  searchWrapper: {
    marginBottom: scale(20),
  },
  searchContainerNew: {
    width: '100%',
    backgroundColor: 'rgba(57, 53, 86, 0.4)',
    borderColor: Colors.borderLightTransparent,
    borderWidth: 1,
    borderRadius: scale(16),
    paddingHorizontal: scale(4),
  },
  searchInputNew: {
    color: Colors.white,
    fontSize: FontSizes.medium,
    paddingVertical: scale(14),
    fontWeight: FontWeights.medium,
  },

  // Tabs
  tabsWrapper: {
    marginBottom: scale(16),
  },
  tabsList: {
    paddingVertical: scale(4),
  },
  tabChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingVertical: scale(10),
    marginRight: scale(10),
    borderRadius: scale(9999),
    backgroundColor: 'rgba(57, 53, 86, 0.4)',
    borderWidth: 1,
    borderColor: Colors.borderLightTransparent,
    overflow: 'hidden',
  },
  tabChipActive: {
    borderColor: 'transparent',
  },
  tabChipGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: scale(9999),
  },
  tabIcon: {
    marginRight: scale(6),
  },
  tabLabelNew: {
    color: '#9ca3af',
    fontSize: FontSizes.small,
    fontWeight: FontWeights.semiBold,
  },
  tabLabelActive: {
    color: Colors.white,
  },

  // Results Bar
  resultsBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(4),
    paddingVertical: scale(8),
  },
  resultsText: {
    color: Colors.textGray,
    fontSize: FontSizes.small,
    fontWeight: FontWeights.medium,
  },
  clearButton: {
    color: Colors.primary,
    fontSize: FontSizes.small,
    fontWeight: FontWeights.semiBold,
  },
  activityCard: {
    overflow: 'hidden',
    marginBottom: scale(16),
    borderRadius: scale(16),
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.deepBackground,
  },
  cardGradientBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: scale(3),
  },
  cardInner: {
    padding: scale(16),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(16),
  },
  eventBadgeNew: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventIconGradient: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(999),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(8),
  },
  eventLabel: {
    color: Colors.white,
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.bold,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.overlayLight,
    paddingHorizontal: scale(10),
    paddingVertical: scale(6),
    borderRadius: scale(12),
  },
  timeTextNew: {
    color: Colors.textGray,
    fontSize: FontSizes.xsmall,
    marginLeft: scale(4),
    fontWeight: FontWeights.medium,
  },
  cardMain: {
    gap: scale(16),
  },
  nftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    width: scale(80),
    height: scale(80),
    borderRadius: scale(16),
    overflow: 'hidden',
    backgroundColor: Colors.deepBackground,
  },
  nftImage: {
    width: '100%',
    height: '100%',
  },
  nftInfo: {
    flex: 1,
    marginLeft: scale(14),
    justifyContent: 'center',
  },
  nftName: {
    color: Colors.white,
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.bold,
    marginBottom: scale(4),
  },
  nftDescription: {
    color: Colors.textGray,
    fontSize: FontSizes.small,
    marginBottom: scale(8),
  },
  priceQtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(98, 126, 234, 0.1)',
    paddingHorizontal: scale(10),
    paddingVertical: scale(6),
    borderRadius: scale(10),
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(98, 126, 234, 0.2)',
  },
  priceValue: {
    color: Colors.ethereum,
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.bold,
    marginLeft: scale(4),
    marginRight: scale(6),
  },
  priceUSD: {
    color: Colors.white,
    fontSize: FontSizes.xsmall,
    fontWeight: FontWeights.medium,
  },
  addressesContainer: {
    marginTop: scale(14),
  },
  addressFlow: {
    width: '100%',
    position: 'relative',
  },
  addressCard: {
    backgroundColor: Colors.overlayLight,
    borderRadius: scale(16),
    paddingVertical: scale(12),
    paddingHorizontal: scale(14),
    borderWidth: 1,
    borderColor: Colors.borderLightTransparent,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(4),
  },
  addressLabel: {
    color: '#9ca3af',
    fontSize: FontSizes.xsmall,
    fontWeight: FontWeights.bold,
    textTransform: 'uppercase',
    marginLeft: scale(6),
    letterSpacing: 0.5,
  },
  addressDot: {
    width: scale(6),
    height: scale(6),
    borderRadius: scale(3),
    backgroundColor: Colors.primary,
  },
  addressValue: {
    color: Colors.white,
    fontSize: FontSizes.small,
    fontWeight: FontWeights.semiBold,
    fontFamily: 'monospace',
  },
  arrowWrapper: {
    position: 'absolute',
    left: '50%',
    top: '36%',
    transform: [{translateX: -16}],
    zIndex: 20,
  },
  arrowInner: {
    width: scale(34),
    height: scale(34),
    borderRadius: scale(17),
    backgroundColor: 'rgba(57,53,86,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderLightTransparent,
  },
  quantityBadge: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(1, 197, 186, 0.15)',
    paddingHorizontal: scale(10),
    paddingVertical: scale(4),
    borderRadius: scale(8),
    marginTop: scale(8),
    borderWidth: 1,
    borderColor: 'rgba(1, 197, 186, 0.3)',
  },
  quantityText: {
    color: Colors.primary,
    fontSize: FontSizes.small,
    fontWeight: FontWeights.bold,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: scale(60),
    paddingHorizontal: scale(32),
  },
  emptyIconContainer: {
    marginBottom: scale(20),
  },
  emptyIconGradient: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTitle: {
    color: Colors.white,
    fontSize: FontSizes.large,
    fontWeight: FontWeights.bold,
    marginBottom: scale(8),
  },
  emptyDescription: {
    color: Colors.textGray,
    fontSize: FontSizes.medium,
    textAlign: 'center',
    lineHeight: scale(22),
  },
});
