import {StyleSheet} from 'react-native';
import {Colors, FontSizes, FontWeights} from '~/theme/theme';
import {scale} from '~/utils/scaling';

export default StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    flex: 1,
  },

  // ================= HERO SECTION =================
  heroSection: {
    height: scale(400),
    width: '100%',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
    justifyContent: 'flex-end',
  },
  heroContent: {
    paddingVertical: scale(20),
    paddingHorizontal: scale(16),
  },
  heroCategoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primary,
    paddingHorizontal: scale(12),
    paddingVertical: scale(6),
    borderRadius: scale(6),
    marginBottom: scale(12),
  },
  heroCategoryText: {
    color: Colors.buttonTextColor,
    fontSize: FontSizes.small,
    fontWeight: FontWeights.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  heroTitle: {
    color: Colors.white,
    fontSize: scale(28),
    fontWeight: FontWeights.extraBold,
    lineHeight: scale(34),
    marginBottom: scale(8),
  },
  heroDescription: {
    color: Colors.textGray,
    fontSize: FontSizes.medium,
    lineHeight: scale(22),
    marginBottom: scale(16),
  },
  heroMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroAuthor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
  },
  heroAuthorAvatar: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  heroAuthorName: {
    color: Colors.white,
    fontSize: FontSizes.small,
    fontWeight: FontWeights.semiBold,
  },
  heroStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
  },
  heroStatsText: {
    color: Colors.textGray,
    fontSize: FontSizes.small,
  },

  // ================= SEARCH SECTION =================
  searchSection: {
    paddingVertical: scale(20),
    paddingHorizontal: scale(16),
    paddingBottom: scale(16),
  },
  sectionTitle: {
    color: Colors.white,
    fontSize: FontSizes.large,
    fontWeight: FontWeights.bold,
    marginBottom: scale(16),
  },
  searchContainer: {
    width: 'auto',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: scale(12),
  },

  // ================= STATS SECTION =================
  statsSection: {
    flexDirection: 'row',
    paddingHorizontal: scale(16),
    marginBottom: scale(24),
    gap: scale(12),
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: scale(12),
    padding: scale(16),
    alignItems: 'center',
    gap: scale(8),
  },
  statNumber: {
    color: Colors.white,
    fontSize: scale(20),
    fontWeight: FontWeights.bold,
  },
  statLabel: {
    color: Colors.textGray,
    fontSize: FontSizes.xsmall,
    textAlign: 'center',
  },

  // ================= CATEGORIES SECTION =================
  categoriesSection: {
    marginBottom: scale(24),
    paddingLeft: scale(20),
    paddingHorizontal: scale(16),
  },
  categoriesScroll: {
    paddingRight: scale(20),
    gap: scale(8),
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingVertical: scale(10),
    paddingHorizontal: scale(16),
    borderRadius: scale(20),
    marginRight: scale(8),
    borderWidth: 1,
    borderColor: Colors.border,
  },
  categoryChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryChipText: {
    color: Colors.white,
    fontSize: FontSizes.small,
    fontWeight: FontWeights.semiBold,
  },
  categoryChipTextActive: {
    color: Colors.buttonTextColor,
  },

  // ================= SECTION HEADER =================
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(16),
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
  },
  viewAllText: {
    color: Colors.primary,
    fontSize: FontSizes.small,
    fontWeight: FontWeights.semiBold,
  },

  // ================= FEATURED SECTION =================
  featuredSection: {
    paddingHorizontal: scale(16),
    marginBottom: scale(24),
  },

  // ================= TRENDING SECTION =================
  trendingSection: {
    paddingHorizontal: scale(16),
    marginBottom: scale(24),
  },
  trendingList: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: scale(12),
    overflow: 'hidden',
  },
  trendingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(16),
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    gap: scale(12),
  },
  trendingNumber: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendingNumberText: {
    color: Colors.buttonTextColor,
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.bold,
  },
  trendingContent: {
    flex: 1,
  },
  trendingTitle: {
    color: Colors.white,
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.semiBold,
    lineHeight: scale(20),
    marginBottom: scale(6),
  },
  trendingMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(12),
  },
  trendingCategory: {
    color: Colors.primary,
    fontSize: FontSizes.xsmall,
    fontWeight: FontWeights.medium,
  },
  trendingViews: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
  },
  trendingViewsText: {
    color: Colors.textGray,
    fontSize: FontSizes.xsmall,
  },
  trendingImage: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(8),
  },

  // ================= NEWSLETTER SECTION =================
  newsletterSection: {
    marginHorizontal: scale(16),
    marginBottom: scale(24),
    borderRadius: scale(16),
    overflow: 'hidden',
  },
  newsletterGradient: {
    padding: scale(24),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  newsletterIcon: {
    width: scale(64),
    height: scale(64),
    borderRadius: scale(32),
    backgroundColor: 'rgba(1, 197, 186, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scale(16),
    borderWidth: 1,
    borderColor: 'rgba(1, 197, 186, 0.3)',
  },
  newsletterTitle: {
    color: Colors.white,
    fontSize: scale(24),
    fontWeight: FontWeights.bold,
    marginBottom: scale(8),
    textAlign: 'center',
  },
  newsletterSubtitle: {
    color: Colors.textGray,
    fontSize: FontSizes.medium,
    lineHeight: scale(20),
    marginBottom: scale(20),
    textAlign: 'center',
  },
  newsletterForm: {
    width: '100%',
    gap: scale(12),
  },
  newsletterInput: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: scale(12),
  },
  subscribeButton: {
    width: '100%',
    borderRadius: scale(12),
  },

  // ================= MORE ARTICLES SECTION =================
  articlesSection: {
    paddingHorizontal: scale(16),
    marginBottom: scale(24),
  },
});
