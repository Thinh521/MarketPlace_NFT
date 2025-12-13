import {API_BASE} from '@env';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import Images from '~/assets/images/images';
import {CheckIcon} from '~/assets/icons/icons';

import CustomError from '~/components/CustomError/CustomError';
import CustomEmpty from '~/components/CustomEmpty/CustomEmpty';
import ArtistSkeleton from '~/components/CustomSkeleton/ArtistSkeleton';

import {formatAddress} from '~/utils/formatAddress';
import {scale} from '~/utils/scaling';

import {Colors, FontSizes, FontWeights} from '~/theme/theme';

export default function ArtistLeaderboard({
  activeTab,
  setActiveTab,
  artists,
  loading,
  error,
  onRetry,
}) {
  const tabs = [
    {label: 'Best Selling', sort: 'sales'},
    {label: 'Most Earning', sort: 'earning'},
    {label: 'Earning Most', sort: 'earningDesc'},
  ];

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Tabs */}
        <View style={styles.tabs}>
          {tabs.map((tab, index) => {
            const isActive = activeTab.label === tab.label;
            return (
              <TouchableOpacity
                key={index}
                onPress={() => setActiveTab(tab)}
                style={[styles.tabButton, isActive && styles.activeTabButton]}>
                <Text
                  style={[styles.tabText, isActive && styles.activeTabText]}>
                  {tab.label}
                </Text>
                {isActive && <View style={styles.activeIndicator} />}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Content */}
        {loading ? (
          <ArtistSkeleton />
        ) : error ? (
          <CustomError onRetry={onRetry} />
        ) : !artists || artists.length === 0 ? (
          <CustomEmpty />
        ) : (
          <ScrollView style={styles.artistList}>
            {artists.map(artist => (
              <TouchableOpacity key={artist.id} style={styles.artistCard}>
                <View style={styles.artistInfo}>
                  <View style={styles.avatarWrapper}>
                    <FastImage
                      source={
                        artist?.avatar
                          ? {uri: `${API_BASE}/api/upload/${artist.avatar}`}
                          : Images.avatar
                      }
                      style={styles.avatar}
                      resizeMode="cover"
                    />
                    {artist.verified && (
                      <View style={styles.checkBadge}>
                        <CheckIcon style={styles.checkIcon} />
                      </View>
                    )}
                  </View>
                  <View>
                    <Text style={styles.artistName}>{artist.fullName}</Text>
                    <Text style={styles.artistArts}>
                      {formatAddress(artist.addressWallet)}
                    </Text>
                  </View>
                </View>
                <Text style={styles.earning}>{artist.nftsSold} nfts Sold</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scale(10),
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
  },
  tabText: {
    color: Colors.textGray,
    fontWeight: FontWeights.semiBold,
    fontSize: FontSizes.medium,
  },
  activeTabButton: {
    borderBottomColor: Colors.primary,
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '600',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 2,
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  artistList: {
    paddingVertical: scale(10),
  },
  artistCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scale(10),
    marginTop: scale(8),
  },
  artistInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(12),
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: scale(46),
    height: scale(46),
    borderRadius: 999,
  },
  checkBadge: {
    position: 'absolute',
    bottom: -scale(2),
    right: -scale(2),
    backgroundColor: Colors.accent,
    borderRadius: 999,
    padding: scale(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: {
    width: scale(10),
    height: scale(10),
  },
  artistName: {
    color: Colors.white,
    fontWeight: FontWeights.semiBold,
    fontSize: FontSizes.medium,
    marginBottom: scale(4),
  },
  artistArts: {
    color: Colors.textGray,
    fontSize: FontSizes.small,
  },
  earning: {
    color: Colors.white,
    fontWeight: FontWeights.semiBold,
    fontSize: FontSizes.medium,
  },
});
