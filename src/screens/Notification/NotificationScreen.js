import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {BellIcon, CheckIcon} from '~/assets/icons/icons';
import styles from './Notification.styles';

const MOCK_NOTIFICATIONS = [
  {
    id: '1',
    type: 'like',
    title: 'New Like',
    message: 'John Doe liked your post',
    avatar: 'https://i.pravatar.cc/150?img=1',
    time: '2 minutes ago',
    isRead: false,
  },
  {
    id: '2',
    type: 'comment',
    title: 'New Comment',
    message: 'Sarah commented: "Amazing work!"',
    avatar: 'https://i.pravatar.cc/150?img=2',
    time: '15 minutes ago',
    isRead: false,
  },
  {
    id: '3',
    type: 'follow',
    title: 'New Follower',
    message: 'Mike started following you',
    avatar: 'https://i.pravatar.cc/150?img=3',
    time: '1 hour ago',
    isRead: true,
  },
  {
    id: '4',
    type: 'mention',
    title: 'You were mentioned',
    message: 'Emma mentioned you in a comment',
    avatar: 'https://i.pravatar.cc/150?img=4',
    time: '2 hours ago',
    isRead: true,
  },
  {
    id: '5',
    type: 'system',
    title: 'System Update',
    message: 'New features are now available',
    avatar: null,
    time: '1 day ago',
    isRead: true,
  },
];

const NotificationScreen = ({navigation}) => {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState('all'); // all, unread

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const filteredNotifications =
    filter === 'unread' ? notifications.filter(n => !n.isRead) : notifications;

  const markAsRead = id => {
    setNotifications(prev =>
      prev.map(notif => (notif.id === id ? {...notif, isRead: true} : notif)),
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({...notif, isRead: true})));
  };

  const deleteNotification = id => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getTypeIcon = type => {
    switch (type) {
      case 'like':
        return '❤️';
      case 'comment':
        return '💬';
      case 'follow':
        return '👤';
      case 'mention':
        return '@';
      case 'system':
        return '🔔';
      default:
        return '📢';
    }
  };

  const renderNotificationItem = ({item}) => (
    <TouchableOpacity
      style={[styles.notificationItem, !item.isRead && styles.unreadItem]}
      onPress={() => markAsRead(item.id)}
      activeOpacity={0.7}>
      <View style={styles.avatarContainer}>
        {item.avatar ? (
          <FastImage source={{uri: item.avatar}} style={styles.avatar} />
        ) : (
          <View style={styles.systemAvatar}>
            <Text style={styles.systemIcon}>{getTypeIcon(item.type)}</Text>
          </View>
        )}
        {!item.isRead && <View style={styles.unreadDot} />}
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.message} numberOfLines={2}>
          {item.message}
        </Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteNotification(item.id)}
        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
        <BellIcon style={styles.deleteIcon} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterTab, filter === 'all' && styles.activeTab]}
          onPress={() => setFilter('all')}>
          <Text
            style={[
              styles.filterText,
              filter === 'all' && styles.activeFilterText,
            ]}>
            All ({notifications.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterTab, filter === 'unread' && styles.activeTab]}
          onPress={() => setFilter('unread')}>
          <Text
            style={[
              styles.filterText,
              filter === 'unread' && styles.activeFilterText,
            ]}>
            Unread ({unreadCount})
          </Text>
        </TouchableOpacity>

        {unreadCount > 0 && (
          <TouchableOpacity
            style={styles.markAllButton}
            onPress={markAllAsRead}>
            <CheckIcon style={styles.checkIcon} />
            <Text style={styles.markAllText}>Mark all read</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Notification List */}
      {filteredNotifications.length > 0 ? (
        <FlatList
          data={filteredNotifications}
          renderItem={renderNotificationItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🔔</Text>
          <Text style={styles.emptyText}>No notifications</Text>
          <Text style={styles.emptySubtext}>
            {filter === 'unread'
              ? "You're all caught up!"
              : 'When you get notifications, theyll show up here'}
          </Text>
        </View>
      )}
    </View>
  );
};

export default NotificationScreen;
