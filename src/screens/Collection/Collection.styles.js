import {StyleSheet} from 'react-native';
import {Colors, FontSizes, FontWeights} from '~/theme/theme';
import {scale} from '~/utils/scaling';

export default StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  bannerContainer: {
    position: 'relative',
    width: '100%',
    height: scale(260),
  },
  banner: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  collectionInfoCard: {
    marginTop: scale(-40),
    marginHorizontal: scale(16),
    padding: scale(20),
    borderRadius: scale(16),
    overflow: 'hidden',
    borderWidth: 1,
    backgroundColor: Colors.overlayLight,
    borderColor: Colors.borderLightTransparent,
  },
  collectionHeader: {
    alignItems: 'center',
    marginBottom: scale(20),
  },
  collectionName: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: FontSizes.xxlarge,
    fontWeight: FontWeights.semiBold,
    marginBottom: scale(8),
  },
  collectionDescription: {
    fontSize: FontSizes.small,
    color: Colors.textGray,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: scale(10),
  },
  creatorSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scale(12),
    paddingHorizontal: scale(16),
    borderRadius: scale(12),
    marginBottom: scale(20),
    borderWidth: 1,
    backgroundColor: Colors.overlayLight,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  creatorAvatar: {
    width: scale(40),
    height: scale(40),
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(12),
    borderWidth: 2,
    borderColor: Colors.deepBackground,
    backgroundColor: Colors.deepBackground,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 999,
  },
  creatorInfo: {
    flex: 1,
  },
  creatorLabel: {
    fontSize: FontSizes.xsmall,
    color: Colors.textGray,
    marginBottom: scale(2),
  },
  creatorName: {
    color: Colors.white,
    fontSize: FontSizes.small,
    fontWeight: FontWeights.semiBold,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: scale(10),
    marginBottom: scale(20),
  },
  statCard: {
    flex: 1,
    borderRadius: scale(12),
    overflow: 'hidden',
  },
  statCardGradient: {
    paddingVertical: scale(16),
    paddingHorizontal: scale(12),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: scale(14),
  },
  statValue: {
    color: Colors.white,
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.semiBold,
    marginTop: scale(8),
    marginBottom: scale(4),
  },
  statLabel: {
    color: Colors.textGray,
    fontSize: FontSizes.xsmall,
    textTransform: 'uppercase',
  },
  ownerActions: {
    flexDirection: 'row',
    gap: scale(12),
  },
  secondaryActionButton: {
    width: scale(44),
    height: scale(44),
    borderRadius: scale(12),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderLightTransparent,
    backgroundColor: Colors.borderLightTransparent,
  },
  productsSection: {
    marginTop: scale(30),
    paddingHorizontal: scale(16),
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
  emptyStateContainer: {
    paddingVertical: scale(60),
    alignItems: 'center',
  },
  emptyIconCircle: {
    width: scale(100),
    height: scale(100),
    borderRadius: scale(50),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scale(24),
    borderWidth: 1,
    backgroundColor: Colors.overlayLight,
    borderColor: Colors.borderLightTransparent,
  },
  boxIcon: {
    width: scale(40),
    height: scale(40),
  },
  emptyTitle: {
    fontSize: scale(20),
    color: Colors.white,
    marginBottom: scale(8),
  },
  emptySubtitle: {
    fontSize: FontSizes.small,
    color: Colors.textGray,
    textAlign: 'center',
    marginBottom: scale(24),
    paddingHorizontal: scale(40),
    lineHeight: 20,
  },
  addButton: {
    width: scale(200),
  },
  bottomSpacing: {
    height: scale(60),
  },
});
