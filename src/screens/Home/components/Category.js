import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Colors, FontSizes, FontWeights} from '~/theme/theme';
import {scale} from '~/utils/scaling';

const Category = () => {
  const [activeTab, setActiveTab] = useState('ALL');

  const tabs = [
    {key: 'ALL', label: 'All Activity', icon: 'view-grid'},
    {key: 'SALES', label: 'Sales', icon: 'cash'},
    {key: 'LISTINGS', label: 'Listings', icon: 'tag'},
    {key: 'BIDS', label: 'Bids', icon: 'gavel'},
    {key: 'TRANSFERS', label: 'Transfers', icon: 'swap-horizontal'},
  ];

  return (
    <View style={styles.tabsWrapper}>
      <FlatList
        horizontal
        data={tabs}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.key}
        contentContainerStyle={styles.tabsList}
        renderItem={({item: tab}) => (
          <TouchableOpacity
            onPress={() => setActiveTab(tab.key)}
            activeOpacity={0.7}
            style={[
              styles.tabChip,
              activeTab === tab.key && styles.tabChipActive,
            ]}>
            {activeTab === tab.key && (
              <LinearGradient
                colors={[Colors.secondary, Colors.primary]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.tabChipGradient}
              />
            )}
            <MaterialCommunityIcons
              name={tab.icon}
              size={18}
              color={activeTab === tab.key ? '#fff' : '#9ca3af'}
              style={styles.tabIcon}
            />
            <Text
              style={[
                styles.tabLabelNew,
                activeTab === tab.key && styles.tabLabelActive,
              ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  tabsWrapper: {
    marginBottom: scale(16),
  },
  tabsList: {
    paddingVertical: scale(4),
  },
  tabChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingVertical: scale(10),
    marginRight: scale(10),
    borderRadius: 999,
    backgroundColor: 'rgba(57, 53, 86, 0.4)',
    borderWidth: 1,
    borderColor: Colors.borderLightTransparent,
    overflow: 'hidden',
  },
  tabChipActive: {
    borderColor: 'transparent',
  },
  tabChipGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 999,
  },
  tabIcon: {
    marginRight: scale(6),
  },
  tabLabelNew: {
    color: '#9ca3af',
    fontSize: FontSizes.small,
    fontWeight: FontWeights.semiBold,
  },
  tabLabelActive: {
    color: Colors.white,
  },
});
