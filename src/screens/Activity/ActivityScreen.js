import {IPFS_GATEWAY} from '@env';
import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {useInfiniteQuery} from '@tanstack/react-query';
import FastImage from 'react-native-fast-image';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Images from '~/assets/images/images';
import {SearchIcon} from '~/assets/icons/icons';

import Header from '~/components/Header';
import {Input} from '~/components/ui/Input';
import CustomError from '~/components/CustomError/CustomError';
import CustomEmpty from '~/components/CustomEmpty/CustomEmpty';

import {getActivityRequest} from '~/api/activityApi';

import {formatAddress} from '~/utils/formatAddress';
import {timeAgo} from '~/utils/timeAgo';
import {scale} from '~/utils/scaling';

import {Colors} from '~/theme/theme';
import styles from './Activity.styles';

const ActivityScreen = () => {
  const {bottom} = useSafeAreaInsets();

  const [activeTab, setActiveTab] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const tabs = [
    {key: 'ALL', label: 'All Activity', icon: 'view-grid'},
    {key: 'SALES', label: 'Sales', icon: 'cash'},
    {key: 'LISTINGS', label: 'Listings', icon: 'tag'},
    {key: 'BIDS', label: 'Bids', icon: 'gavel'},
    {key: 'TRANSFERS', label: 'Transfers', icon: 'swap-horizontal'},
  ];

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['activity'],
    queryFn: ({pageParam = 1}) =>
      getActivityRequest({page: pageParam, limit: 10}),
    getNextPageParam: lastPage => {
      if (lastPage?.data && Array.isArray(lastPage.data)) {
        const paginationInfo = lastPage.data[0];

        if (
          paginationInfo &&
          'page' in paginationInfo &&
          'totalPages' in paginationInfo
        ) {
          if (paginationInfo.page < paginationInfo.totalPages) {
            return paginationInfo.page + 1;
          }
        }
      }
      return undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const activityData = useMemo(() => {
    if (!data?.pages) return [];

    return data.pages.flatMap(page => {
      if (!page?.data || !Array.isArray(page.data)) return [];

      return page.data.slice(1).filter(item => {
        return item && typeof item === 'object' && item.id && item.evenType;
      });
    });
  }, [data]);

  const filteredActivities = useMemo(() => {
    let filtered = activityData;

    // Filter by tab
    if (activeTab !== 'ALL') {
      const eventTypeMap = {
        SALES: 'Sale',
        LISTINGS: 'List',
        BIDS: 'Bid',
        TRANSFERS: 'Transfer',
      };
      filtered = filtered.filter(
        item => item.evenType === eventTypeMap[activeTab],
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        item =>
          item.product?.name?.toLowerCase().includes(query) ||
          item.product?.description?.toLowerCase().includes(query) ||
          item.fromAddress?.toLowerCase().includes(query) ||
          item.toAddress?.toLowerCase().includes(query),
      );
    }

    return filtered;
  }, [activityData, activeTab, searchQuery]);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const getEventConfig = evenType => {
    switch (evenType) {
      case 'Sale':
        return {
          icon: 'shopping-bag',
          iconLib: 'Feather',
          gradient: ['#10b981', '#059669'],
          bgColor: 'rgba(16, 185, 129, 0.1)',
          label: 'Sale',
        };
      case 'List':
        return {
          icon: 'tag',
          iconLib: 'Feather',
          gradient: ['#3b82f6', '#2563eb'],
          bgColor: 'rgba(59, 130, 246, 0.1)',
          label: 'Listed',
        };
      case 'Transfer':
        return {
          icon: 'swap-horizontal',
          iconLib: 'MaterialCommunityIcons',
          gradient: ['#8b5cf6', '#7c3aed'],
          bgColor: 'rgba(139, 92, 246, 0.1)',
          label: 'Transfer',
        };
      case 'Bid':
        return {
          icon: 'gavel',
          iconLib: 'MaterialCommunityIcons',
          gradient: ['#f59e0b', '#d97706'],
          bgColor: 'rgba(245, 158, 11, 0.1)',
          label: 'Bid',
        };
      default:
        return {
          icon: 'activity',
          iconLib: 'Feather',
          gradient: ['#6366f1', '#4f46e5'],
          bgColor: 'rgba(99, 102, 241, 0.1)',
          label: 'Activity',
        };
    }
  };

  const renderActivityCard = ({item, index}) => {
    const eventConfig = getEventConfig(item.evenType);

    return (
      <TouchableOpacity activeOpacity={0.9} style={styles.activityCard}>
        <View style={styles.cardInner}>
          {/* Header Section */}
          <View style={styles.cardHeader}>
            <View style={styles.eventBadgeNew}>
              <LinearGradient
                colors={eventConfig.gradient}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.eventIconGradient}>
                {eventConfig.iconLib === 'MaterialCommunityIcons' ? (
                  <MaterialCommunityIcons
                    name={eventConfig.icon}
                    size={16}
                    color={Colors.white}
                  />
                ) : (
                  <Feather
                    name={eventConfig.icon}
                    size={16}
                    color={Colors.white}
                  />
                )}
              </LinearGradient>
              <Text style={styles.eventLabel}>{eventConfig.label}</Text>
            </View>
            <View style={styles.timeContainer}>
              <Feather name="clock" size={12} color={Colors.textGray} />
              <Text style={styles.timeTextNew}>{timeAgo(item.updatedAt)}</Text>
            </View>
          </View>

          {/* Main Content */}
          <View style={styles.cardMain}>
            <View style={styles.nftSection}>
              <View style={styles.imageContainer}>
                <FastImage
                  source={
                    item?.product?.image
                      ? {uri: `${IPFS_GATEWAY}${item?.product?.image}`}
                      : Images.card_1
                  }
                  style={styles.nftImage}
                  resizeMode="cover"
                />
              </View>

              <View style={styles.nftInfo}>
                <Text style={styles.nftName} numberOfLines={1}>
                  {item?.product?.name || 'Unnamed NFT'}
                </Text>
                <Text style={styles.nftDescription} numberOfLines={1}>
                  {item?.product?.description || 'No description'}
                </Text>

                {/* Price Badge */}
                <View style={styles.priceQtyContainer}>
                  {item.price && (
                    <View style={styles.priceBadge}>
                      <MaterialCommunityIcons
                        name="ethereum"
                        size={16}
                        color="#627EEA"
                      />
                      <Text style={styles.priceValue}>{item.price} ETH</Text>
                      <Text style={styles.priceUSD}>
                        ≈ ${(parseFloat(item.price) * 2500).toFixed(2)}
                      </Text>
                    </View>
                  )}

                  {/* Quantity Badge */}
                  {item.quantity && (
                    <View style={styles.quantityBadge}>
                      <Text style={styles.quantityText}>×{item.quantity}</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>

            <View style={styles.addressesContainer}>
              <View style={styles.addressFlow}>
                <View style={[styles.addressCard, {marginBottom: scale(12)}]}>
                  <View style={styles.addressRow}>
                    <View style={styles.addressDot} />
                    <Text style={styles.addressLabel}>From</Text>
                  </View>
                  <Text style={styles.addressValue}>
                    {formatAddress(item.fromAddress)}
                  </Text>
                </View>

                <View style={styles.arrowWrapper}>
                  <View style={styles.arrowInner}>
                    <Feather name="arrow-down" size={18} color="#fff" />
                  </View>
                </View>

                <View style={styles.addressCard}>
                  <View style={styles.addressRow}>
                    <View style={styles.addressDot} />
                    <Text style={styles.addressLabel}>To</Text>
                  </View>
                  <Text style={styles.addressValue}>
                    {formatAddress(item.toAddress)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;

    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading more activities...</Text>
      </View>
    );
  };

  const renderEmptyState = () => {
    if (isLoading) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.emptyDescription}>Loading activities...</Text>
        </View>
      );
    }

    if (isError) {
      return <CustomError onRetry={refetch} />;
    }

    return searchQuery ? <CustomEmpty type="noSearch" /> : <CustomEmpty />;
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      {/* Search Bar */}
      <View style={styles.searchWrapper}>
        <Input
          placeholder="Search items, collections, addresses..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          leftIcon={SearchIcon}
          autoCapitalize="none"
          returnKeyType="search"
        />
      </View>

      {/* Modern Tabs */}
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

      {/* Results Count */}
      <View style={styles.resultsBar}>
        <Text style={styles.resultsText}>
          {filteredActivities.length}{' '}
          {filteredActivities.length === 1 ? 'activity' : 'activities'}
        </Text>
        {searchQuery ? (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Text style={styles.clearButton}>Clear search</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
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

        <Header title="Activity" showSearch={false} />

        <FlatList
          data={filteredActivities}
          renderItem={renderActivityCard}
          keyExtractor={(item, index) =>
            item?.id?.toString() || `activity-${index}`
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            {
              paddingBottom: bottom + scale(120),
              marginTop: scale(26),
              paddingHorizontal: scale(16),
            },
          ]}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={renderEmptyState}
          ListFooterComponent={renderFooter}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.3}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={Colors.primary}
              colors={[Colors.primary]}
            />
          }
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ActivityScreen;
