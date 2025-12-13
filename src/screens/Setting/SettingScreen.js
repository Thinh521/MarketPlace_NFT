import React, {useState} from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Switch,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Colors} from '~/theme/theme';
import styles from './Setting.styles';

const SettingScreen = () => {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(true);

  const settingsOptions = [
    {
      id: 'wallet',
      title: 'E-Wallet',
      iconName: 'wallet-outline',
      iconType: 'ion',
      onPress: () =>
        navigation.navigate('NoBottomTab', {
          screen: 'ConnectWallet',
        }),
      showArrow: true,
    },
    {
      id: 'notification',
      title: 'Notification',
      iconName: 'notifications-outline',
      iconType: 'ion',
      onPress: () => navigation.navigate('Notification'),
      showArrow: true,
    },
    {
      id: 'security',
      title: 'Security',
      iconName: 'shield-checkmark-outline',
      iconType: 'ion',
      onPress: () => navigation.navigate('Security'),
      showArrow: true,
    },
    {
      id: 'language',
      title: 'Language',
      iconName: 'language-outline',
      iconType: 'ion',
      onPress: () => navigation.navigate('Language'),
      showArrow: true,
      rightText: 'English (US)',
    },
    {
      id: 'darkMode',
      title: 'Dark Mode',
      iconName: 'eye-outline',
      iconType: 'ion',
      showSwitch: true,
    },
    {
      id: 'help',
      title: 'Help Center',
      iconName: 'help-circle-outline',
      iconType: 'ion',
      onPress: () => navigation.navigate('NoBottomTab', {screen: 'Support'}),
      showArrow: true,
    },
    {
      id: 'invite',
      title: 'Invite Friends',
      iconName: 'account-multiple-outline',
      iconType: 'material',
      onPress: () => navigation.navigate('InviteFriends'),
      showArrow: true,
    },
    {
      id: 'rate',
      title: 'Rate us',
      iconName: 'star-outline',
      iconType: 'ion',
      onPress: () => {
        console.log('Rate app');
      },
      showArrow: true,
    },
  ];

  const aboutOptions = [
    {
      id: 'privacy',
      title: 'Privacy & Policy',
      iconName: 'shield-outline',
      iconType: 'ion',
      onPress: () => navigation.navigate('Privacy'),
      showArrow: true,
    },
    {
      id: 'terms',
      title: 'Terms of Services',
      iconName: 'document-text-outline',
      iconType: 'ion',
      onPress: () => navigation.navigate('Terms'),
      showArrow: true,
    },
    {
      id: 'about',
      title: 'About us',
      iconName: 'information-circle-outline',
      iconType: 'ion',
      onPress: () => navigation.navigate('About'),
      showArrow: true,
    },
  ];

  const renderIcon = (iconName, iconType) => {
    if (iconType === 'material') {
      return <MaterialIcon name={iconName} size={20} color={Colors.white} />;
    }
    return <Icon name={iconName} size={20} color={Colors.white} />;
  };

  const renderSettingItem = item => (
    <TouchableOpacity
      key={item.id}
      style={styles.settingItem}
      onPress={item.onPress}
      activeOpacity={0.7}
      disabled={item.showSwitch}>
      <View style={styles.settingItemLeft}>
        <View style={styles.iconContainer}>
          {renderIcon(item.iconName, item.iconType)}
        </View>
        <Text style={styles.settingTitle}>{item.title}</Text>
      </View>

      <View style={styles.settingItemRight}>
        {item.rightText && (
          <Text style={styles.rightText}>{item.rightText}</Text>
        )}
        {item.showSwitch && (
          <Switch
            value={isDarkMode}
            onValueChange={setIsDarkMode}
            trackColor={{false: '#E5E7EB', true: '#6366F1'}}
            thumbColor={isDarkMode ? '#FFFFFF' : '#F3F4F6'}
            ios_backgroundColor="#E5E7EB"
          />
        )}
        {item.showArrow && (
          <Icon name="chevron-forward" size={18} color={Colors.textSecondary} />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={['#111827', '#001656', '#0F1026']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.gradientBackground}>
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={Colors.background}
          barStyle="light-content"
          translucent={false}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          {/* Main Settings */}
          <View style={styles.section}>
            {settingsOptions.map(renderSettingItem)}
          </View>

          {/* About Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>About</Text>
          </View>
          <View style={styles.section}>
            {aboutOptions.map(renderSettingItem)}
          </View>

          {/* Version Info */}
          <View style={styles.versionContainer}>
            <Text style={styles.versionText}>Version 1.0.0</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SettingScreen;
