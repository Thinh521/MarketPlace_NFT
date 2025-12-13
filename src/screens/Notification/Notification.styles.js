import {StyleSheet, Platform} from 'react-native';
import {Colors} from '~/theme/theme';
import {scale} from '~/utils/scaling';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    paddingVertical: scale(12),
    gap: scale(12),
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  filterTab: {
    paddingHorizontal: scale(16),
    paddingVertical: scale(8),
    borderRadius: scale(20),
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  activeTab: {
    backgroundColor: Colors.pinkColor,
  },
  filterText: {
    fontSize: scale(14),
    color: '#CECCD6',
    fontWeight: '500',
  },
  activeFilterText: {
    color: Colors.white,
  },
  markAllButton: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
    paddingHorizontal: scale(12),
    paddingVertical: scale(8),
    borderRadius: scale(20),
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  checkIcon: {
    width: scale(14),
    height: scale(14),
    tintColor: Colors.white,
  },
  markAllText: {
    fontSize: scale(12),
    color: Colors.white,
    fontWeight: '500',
  },

  // List
  listContainer: {
    paddingVertical: scale(8),
  },

  // Notification Item
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    paddingVertical: scale(16),
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.background,
  },
  unreadItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: scale(12),
  },
  avatar: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(24),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  systemAvatar: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(24),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  systemIcon: {
    fontSize: scale(24),
  },
  unreadDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: scale(12),
    height: scale(12),
    borderRadius: scale(6),
    backgroundColor: Colors.pinkColor,
    borderWidth: 2,
    borderColor: Colors.background,
  },
  contentContainer: {
    flex: 1,
    marginRight: scale(8),
  },
  title: {
    fontSize: scale(16),
    fontWeight: '600',
    color: Colors.white,
    marginBottom: scale(4),
  },
  message: {
    fontSize: scale(14),
    color: '#CECCD6',
    marginBottom: scale(4),
    lineHeight: scale(20),
  },
  time: {
    fontSize: scale(12),
    color: '#8E8E93',
  },
  deleteButton: {
    padding: scale(8),
  },
  deleteIcon: {
    width: scale(20),
    height: scale(20),
    tintColor: '#8E8E93',
  },

  // Empty State
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(40),
  },
  emptyIcon: {
    fontSize: scale(64),
    marginBottom: scale(16),
  },
  emptyText: {
    fontSize: scale(20),
    fontWeight: '600',
    color: Colors.white,
    marginBottom: scale(8),
  },
  emptySubtext: {
    fontSize: scale(14),
    color: '#CECCD6',
    textAlign: 'center',
    lineHeight: scale(20),
  },
});
