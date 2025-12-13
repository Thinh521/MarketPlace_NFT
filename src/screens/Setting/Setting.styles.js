import {StyleSheet} from 'react-native';
import {scale} from '~/utils/scaling';
import {Colors} from '~/theme/theme';

export default StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
  },

  // Header Styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    paddingVertical: scale(16),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  backButton: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(12),
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: scale(20),
    height: scale(20),
    tintColor: Colors.white,
  },
  headerTitle: {
    fontSize: scale(20),
    fontWeight: '700',
    color: Colors.white,
  },
  placeholder: {
    width: scale(40),
  },

  // Content
  scrollContent: {
    paddingTop: scale(20),
    paddingBottom: scale(40),
  },

  // Section
  section: {
    marginHorizontal: scale(16),
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: scale(16),
    overflow: 'hidden',
    marginBottom: scale(24),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  sectionHeader: {
    paddingHorizontal: scale(16),
    marginBottom: scale(12),
  },
  sectionTitle: {
    fontSize: scale(14),
    fontWeight: '600',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // Setting Item
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    paddingVertical: scale(16),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.03)',
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(10),
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(12),
  },
  icon: {
    width: scale(20),
    height: scale(20),
    tintColor: Colors.white,
  },
  settingTitle: {
    fontSize: scale(15),
    fontWeight: '500',
    color: Colors.white,
  },
  settingItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
  },
  rightText: {
    fontSize: scale(14),
    color: Colors.textSecondary,
    marginRight: scale(4),
  },
  chevronIcon: {
    width: scale(18),
    height: scale(18),
    tintColor: Colors.textSecondary,
  },

  // Version
  versionContainer: {
    alignItems: 'center',
    paddingVertical: scale(20),
  },
  versionText: {
    fontSize: scale(13),
    color: Colors.textSecondary,
    opacity: 0.5,
  },
});
