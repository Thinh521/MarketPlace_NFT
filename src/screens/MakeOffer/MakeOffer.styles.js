// ==================== SHARED AUCTION STYLES ====================
import {StyleSheet, Dimensions} from 'react-native';
import {Colors, FontSizes, FontWeights} from '~/theme/theme';
import {scale} from '~/utils/scaling';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  // Container
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  // Content
  content: {
    paddingHorizontal: scale(16),
    paddingTop: scale(20),
  },

  // NFT Preview/Image
  imageContainer: {
    width: scale(140),
    height: scale(140),
    backgroundColor: Colors.deepBackground,
    position: 'relative',
  },
  nftImage: {
    width: '100%',
    height: '100%',
  },
  nftPreview: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: scale(16),
    padding: scale(16),
    marginBottom: scale(24),
    gap: scale(16),
  },
  nftInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  nftName: {
    color: Colors.white,
    fontSize: FontSizes.large,
    fontWeight: FontWeights.bold,
    marginBottom: scale(6),
  },
  nftCollection: {
    color: Colors.textGray,
    fontSize: FontSizes.small,
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

  // Status Badge
  statusBadge: {
    position: 'absolute',
    top: scale(16),
    right: scale(16),
    backgroundColor: Colors.primary,
    paddingHorizontal: scale(16),
    paddingVertical: scale(8),
    borderRadius: scale(20),
  },
  statusBadgeSettled: {
    backgroundColor: '#10B981',
  },
  statusBadgeEnded: {
    backgroundColor: '#EF4444',
  },
  statusText: {
    color: Colors.white,
    fontSize: FontSizes.small,
    fontWeight: FontWeights.bold,
    textTransform: 'uppercase',
  },
  section: {
    marginBottom: scale(24),
  },
  sectionTitle: {
    color: Colors.white,
    fontSize: FontSizes.large,
    fontWeight: FontWeights.bold,
    marginBottom: scale(2),
  },
  sectionSubtitle: {
    color: Colors.textGray,
    fontSize: FontSizes.small,
    marginBottom: scale(16),
    lineHeight: 22,
  },

  // Title
  title: {
    color: Colors.white,
    fontSize: scale(28),
    fontWeight: FontWeights.bold,
    marginBottom: scale(16),
    lineHeight: scale(34),
  },

  // Price/Bid Input
  priceInputContainer: {
    gap: scale(20),
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: scale(16),
  },
  bidInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.deepBackground,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: scale(16),
    paddingHorizontal: scale(20),
    paddingVertical: scale(8),
    gap: scale(16),
  },
  priceInput: {
    flex: 1,
    color: Colors.white,
    fontSize: scale(24),
    fontWeight: FontWeights.bold,
  },
  bidInput: {
    flex: 1,
    color: Colors.white,
    fontSize: scale(32),
    fontWeight: FontWeights.bold,
  },
  ethLabel: {
    color: Colors.textGray,
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.semiBold,
  },
  usdPrice: {
    color: Colors.textGray,
    fontSize: FontSizes.small,
    textAlign: 'center',
  },
  errorText: {
    color: Colors.redColor,
    fontSize: FontSizes.small,
    marginTop: scale(6),
  },

  // Options Grid
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(12),
  },
  optionCard: {
    flex: 1,
    minWidth: (width - scale(44)) / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: scale(12),
    paddingVertical: scale(16),
    alignItems: 'center',
  },
  optionCardActive: {
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  optionLabel: {
    color: Colors.textGray,
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.semiBold,
  },
  optionLabelActive: {
    color: Colors.primary,
  },

  // Custom Date
  customDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: scale(12),
    padding: scale(16),
    marginTop: scale(12),
    gap: scale(12),
  },
  customDateText: {
    flex: 1,
    color: Colors.white,
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.semiBold,
  },

  // Info/Warning Box
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.3)',
    borderRadius: scale(12),
    padding: scale(16),
    gap: scale(12),
    marginBottom: scale(24),
  },
  infoText: {
    flex: 1,
    color: Colors.textGray,
    fontSize: FontSizes.small,
    lineHeight: scale(20),
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
    borderRadius: scale(12),
    padding: scale(16),
    gap: scale(12),
    marginBottom: scale(24),
  },
  warningText: {
    flex: 1,
    color: '#F59E0B',
    fontSize: FontSizes.small,
    lineHeight: scale(20),
  },

  // Auction Card
  auctionCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: scale(16),
    padding: scale(16),
    marginBottom: scale(20),
    gap: scale(16),
  },
  auctionImage: {
    width: scale(100),
    height: scale(100),
    borderRadius: scale(12),
  },
  auctionInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  auctionName: {
    color: Colors.white,
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.bold,
    marginBottom: scale(8),
  },
  auctionStats: {
    flexDirection: 'row',
    gap: scale(16),
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
  },
  statText: {
    color: Colors.textGray,
    fontSize: FontSizes.small,
  },

  // Info Section
  infoSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: scale(16),
    padding: scale(16),
    marginBottom: scale(20),
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scale(12),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  infoLabel: {
    color: Colors.textGray,
    fontSize: FontSizes.small,
  },
  infoValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
  },
  infoValue: {
    color: Colors.white,
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.bold,
  },

  // Quick Bid
  quickBidContainer: {
    flexDirection: 'row',
    gap: scale(12),
  },
  quickBidButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: scale(12),
    paddingVertical: scale(16),
    paddingHorizontal: scale(12),
    alignItems: 'center',
  },
  quickBidLabel: {
    color: Colors.primary,
    fontSize: FontSizes.small,
    fontWeight: FontWeights.bold,
    marginBottom: scale(6),
  },
  quickBidValue: {
    color: Colors.white,
    fontSize: FontSizes.small,
    fontWeight: FontWeights.semiBold,
  },

  // Time Card
  timeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.3)',
    borderRadius: scale(16),
    padding: scale(20),
    marginBottom: scale(20),
    gap: scale(16),
  },
  timeInfo: {
    flex: 1,
  },
  timeLabel: {
    color: Colors.textGray,
    fontSize: FontSizes.small,
    marginBottom: scale(6),
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  timeValue: {
    color: Colors.white,
    fontSize: scale(24),
    fontWeight: FontWeights.bold,
  },

  // Bid Section
  bidSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: scale(16),
    padding: scale(20),
    marginBottom: scale(20),
  },
  bidRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(12),
    marginVertical: scale(8),
  },
  bidValue: {
    color: Colors.white,
    fontSize: scale(32),
    fontWeight: FontWeights.bold,
  },
  bidderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
    marginTop: scale(12),
    paddingTop: scale(12),
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },
  bidderLabel: {
    color: Colors.textGray,
    fontSize: FontSizes.small,
  },
  bidderAddress: {
    color: Colors.primary,
    fontSize: FontSizes.small,
    fontWeight: FontWeights.semiBold,
  },

  // Details List
  detailsList: {
    gap: scale(12),
    marginTop: scale(16),
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scale(12),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  detailLabel: {
    color: Colors.textGray,
    fontSize: FontSizes.small,
  },
  detailValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
  },
  detailValue: {
    color: Colors.white,
    fontSize: FontSizes.small,
    fontWeight: FontWeights.semiBold,
  },
  footer: {
    padding: scale(16),
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.background,
  },
  successModalOverlay: {
    width: width,
    height: height,
    backgroundColor: Colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(20),
  },
  successCard: {
    width: '100%',
    maxWidth: scale(400),
    borderRadius: scale(24),
    backgroundColor: Colors.background,
    padding: scale(32),
    alignItems: 'center',
  },
  successIconWrapper: {
    marginBottom: scale(24),
  },
  successIconContainer: {
    width: scale(80),
    height: scale(80),
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 15,
  },
  successIcon: {
    width: scale(40),
    height: scale(40),
  },
  successTitle: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: FontSizes.xlarge,
    fontWeight: FontWeights.bold,
    marginBottom: scale(12),
  },
  successDesc: {
    lineHeight: 22,
    textAlign: 'center',
    color: Colors.textGray,
    fontSize: FontSizes.small,
    marginBottom: scale(24),
  },
  successBidAmount: {
    color: Colors.primary,
    fontWeight: FontWeights.bold,
  },
  successButton: {
    width: '100%',
    borderRadius: scale(12),
    marginBottom: scale(12),
  },
  successCancelButton: {
    paddingVertical: scale(12),
  },
  successCancelText: {
    color: Colors.textGray,
    fontSize: FontSizes.small,
  },

  // Loading/Error States
  loadingText: {
    color: Colors.white,
    fontSize: FontSizes.regular,
    textAlign: 'center',
    marginTop: scale(40),
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: scale(12),
    padding: scale(16),
    marginBottom: scale(12),
  },
  datePickerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(12),
    flex: 1,
  },
  dateTextContainer: {
    flex: 1,
  },
  dateLabel: {
    color: Colors.textGray,
    fontSize: FontSizes.small,
    marginBottom: scale(4),
  },
  dateValue: {
    color: Colors.white,
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.semiBold,
  },
});
