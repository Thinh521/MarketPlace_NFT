import {StyleSheet} from 'react-native';
import {Colors, FontSizes, FontWeights} from '~/theme/theme';
import {scale} from '~/utils/scaling';

export default StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingHorizontal: scale(16),
    paddingTop: scale(20),
  },
  section: {
    marginBottom: scale(24),
  },
  sectionTitle: {
    color: Colors.white,
    fontSize: FontSizes.large,
    fontWeight: FontWeights.bold,
    marginBottom: scale(12),
  },
  sectionSubtitle: {
    color: Colors.textGray,
    fontSize: FontSizes.small,
    marginBottom: scale(16),
    lineHeight: scale(20),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: scale(12),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  bidInputContainer: {
    gap: scale(20),
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: scale(16),
  },
  bidInput: {
    flex: 1,
  },
  ethLabel: {
    color: Colors.textGray,
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.semiBold,
  },
  usdPrice: {
    color: Colors.textGray,
    fontSize: FontSizes.small,
    marginTop: scale(8),
    textAlign: 'center',
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
  footer: {
    gap: scale(12),
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(16),
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.background,
  },
  bidButton: {
    flex: 1,
  },
});
