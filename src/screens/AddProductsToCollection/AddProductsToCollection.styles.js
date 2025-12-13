import {StyleSheet} from 'react-native';
import {Colors} from '~/theme/theme';
import {scale} from '~/utils/scaling';

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  main: {
    paddingHorizontal: scale(16),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: scale(16),
    fontSize: scale(14),
    color: Colors.white,
    fontFamily: 'Mulish-Regular',
  },
  statsRow: {
    flexDirection: 'row',
    paddingVertical: scale(12),
    gap: scale(10),
  },
  statCard: {
    flex: 1,
    borderRadius: scale(12),
    overflow: 'hidden',
  },
  statCardGradient: {
    paddingVertical: scale(12),
    paddingHorizontal: scale(12),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: scale(12),
  },
  statCardValue: {
    fontSize: scale(20),
    fontFamily: 'Mulish-Bold',
    color: Colors.white,
    marginTop: scale(6),
    marginBottom: scale(2),
  },
  statCardLabel: {
    fontSize: scale(10),
    fontFamily: 'Mulish-Regular',
    color: Colors.textGray,
    textAlign: 'center',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: scale(12),
    gap: scale(8),
  },
  searchSection: {
    paddingBottom: scale(12),
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: scale(12),
    paddingHorizontal: scale(16),
    paddingVertical: scale(12),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  searchIcon: {
    marginRight: scale(10),
  },
  searchInput: {
    fontSize: scale(14),
    fontFamily: 'Mulish-Regular',
    color: Colors.white,
    padding: 0,
  },
  clearButton: {
    padding: scale(4),
  },
  actionButton: {
    width: scale(42),
    height: scale(42),
    borderRadius: scale(10),
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  filterSection: {
    paddingBottom: scale(30),
  },
  filterScrollContent: {
    gap: scale(8),
  },
  filterTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(10),
    paddingHorizontal: scale(16),
    borderRadius: scale(10),
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    gap: scale(6),
  },
  filterTabActive: {
    backgroundColor: 'rgba(1, 197, 186, 0.15)',
    borderColor: Colors.primary,
  },
  filterTabText: {
    fontSize: scale(12),
    fontFamily: 'Mulish-SemiBold',
    color: Colors.textGray,
  },
  filterTabTextActive: {
    color: Colors.primary,
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: scale(10),
    paddingBottom: scale(140),
  },
  productsContainer: {
    paddingHorizontal: scale(16),
    paddingBottom: scale(120),
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(12),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: scale(80),
  },
  emptyIconCircle: {
    width: scale(100),
    height: scale(100),
    borderRadius: scale(50),
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scale(20),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  emptyTitle: {
    fontSize: scale(16),
    fontFamily: 'Mulish-Bold',
    color: Colors.white,
    marginBottom: scale(8),
  },
  emptySubtitle: {
    fontSize: scale(13),
    fontFamily: 'Mulish-Regular',
    color: Colors.textGray,
    textAlign: 'center',
    paddingHorizontal: scale(40),
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: scale(16),
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.background,
  },
});

export default styles;
