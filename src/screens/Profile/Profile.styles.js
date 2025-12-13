import {StyleSheet} from 'react-native';
import {scale} from '../../utils/scaling';
import {Colors, FontSizes} from '../../theme/theme';

export default StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  coverContainer: {
    height: scale(190),
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  profileSection: {
    paddingHorizontal: scale(16),
    marginTop: scale(-40),
  },
  avatarContainer: {
    position: 'relative',
    alignSelf: 'center',
    marginBottom: scale(16),
  },
  avatar: {
    width: scale(100),
    height: scale(100),
    borderRadius: scale(50),
    borderWidth: 4,
    borderColor: Colors.deepBackground,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.deepBackground,
    borderRadius: scale(999),
    padding: scale(6),
  },
  nameSection: {
    alignItems: 'center',
    marginBottom: scale(12),
  },
  displayName: {
    color: Colors.white,
    fontSize: scale(24),
    fontWeight: '700',
  },
  nameCheck: {
    gap: scale(8),
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: scale(4),
  },
  checkBadge: {
    backgroundColor: Colors.accent,
    borderRadius: 999,
    width: scale(20),
    height: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: {
    width: scale(14),
    height: scale(14),
  },
  username: {
    color: Colors.textHighlight,
    fontSize: scale(16),
  },
  bio: {
    paddingHorizontal: scale(20),
    color: Colors.textHighlight,
    fontSize: FontSizes.small,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: scale(16),
  },
  metaInfo: {
    gap: scale(8),
    marginBottom: scale(20),
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(6),
  },
  metaText: {
    color: Colors.white,
    fontSize: scale(12),
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: scale(16),
    padding: scale(16),
    marginBottom: scale(20),
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    color: Colors.white,
    fontSize: scale(18),
    fontWeight: '700',
    marginBottom: scale(4),
  },
  statLabel: {
    color: Colors.textGray,
    fontSize: scale(12),
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: scale(12),
    marginBottom: scale(20),
  },
  followButton: {
    flex: 1,
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  followingButton: {
    backgroundColor: 'transparent',
  },
  followButtonText: {
    color: Colors.white,
  },
  followingButtonText: {
    color: Colors.primary,
  },
  messageButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    borderRadius: scale(12),
  },
  messageButtonText: {
    color: Colors.white,
  },
  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: scale(16),
    marginBottom: scale(24),
  },
  socialButton: {
    width: scale(44),
    height: scale(44),
    borderRadius: scale(22),
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: scale(12),
    marginBottom: scale(24),
    overflow: 'hidden',
    paddingVertical: scale(8),
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(6),
    paddingVertical: scale(12),
    paddingHorizontal: scale(16),
    borderRadius: scale(6),
  },
  activeTab: {
    backgroundColor: 'rgba(34, 211, 238, 0.2)',
  },
  tabText: {
    color: Colors.textGray,
    fontSize: scale(14),
    fontWeight: '600',
  },
  activeTabText: {
    color: Colors.primary,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: scale(20),
  },
  withdrawSection: {
    gap: scale(12),
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: scale(26),
  },
});
