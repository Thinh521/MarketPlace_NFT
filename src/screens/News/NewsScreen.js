import {API_BASE} from '@env';
import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import {useQuery} from '@tanstack/react-query';

import Images from '~/assets/images/images';
import {SearchIcon} from '~/assets/icons/icons';

import Header from '~/components/Header';
import {Input} from '~/components/ui/Input';
import {Button} from '~/components/ui/Button';
import NewsList from '~/components/News/NewsList';
import NewsSlider from '~/components/News/NewsSlider';
import CustomError from '~/components/CustomError/CustomError';

import {getAllNewsRequest} from '~/api/newsApi';

import {Colors, FontSizes} from '~/theme/theme';
import {scale} from '~/utils/scaling';
import styles from './News.styles';

const NewsScreen = () => {
  const {bottom} = useSafeAreaInsets();

  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const {
    data: newsData = [],
    isLoading: isNewsLoading,
    error: isNewsError,
    refetch: refetchNews,
  } = useQuery({
    queryKey: ['allNews'],
    queryFn: getAllNewsRequest,
    staleTime: 5 * 60 * 1000,
    select: res => res?.data || [],
    retry: 1,
  });

  // Extract unique categories from news data
  const categories = useMemo(() => {
    const uniqueCategories = [
      'All',
      ...new Set(newsData.map(item => item.category?.name).filter(Boolean)),
    ];
    return uniqueCategories;
  }, [newsData]);

  // Get top trending articles
  const trendingArticles = useMemo(() => {
    return [...newsData]
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, 5);
  }, [newsData]);

  // Filter news based on search and category
  const filteredNews = useMemo(() => {
    return newsData.filter(item => {
      const matchSearch = item?.title
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchCategory =
        selectedCategory === 'All' || item?.category?.name === selectedCategory;

      return matchSearch && matchCategory;
    });
  }, [newsData, searchQuery, selectedCategory]);

  const featuredArticle = useMemo(() => {
    return newsData[0];
  }, [newsData]);

  const handleSubscribe = () => {
    console.log('Subscribe with email:', email);
  };

  const formatViews = views => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    }
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views?.toString() || '0';
  };

  const renderScreenContent = () => (
    <View>
      <View style={styles.heroSection}>
        <FastImage
          source={
            featuredArticle?.thumbnail
              ? {uri: `${API_BASE}/api/upload/${featuredArticle.thumbnail}`}
              : Images.news_banner
          }
          style={styles.heroImage}
          resizeMode={FastImage.resizeMode.cover}
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.9)']}
          style={styles.heroOverlay}>
          <View style={styles.heroContent}>
            {featuredArticle?.category && (
              <View style={styles.heroCategoryBadge}>
                <Text style={styles.heroCategoryText}>
                  {featuredArticle.category.name}
                </Text>
              </View>
            )}
            <Text style={styles.heroTitle} numberOfLines={2}>
              {featuredArticle?.title || 'Latest News & Insights'}
            </Text>
            <Text style={styles.heroDescription} numberOfLines={2}>
              {featuredArticle?.description ||
                'Stay updated with the latest trends'}
            </Text>
            <View style={styles.heroMeta}>
              <View style={styles.heroAuthor}>
                <FastImage
                  source={
                    featuredArticle?.author?.avatar
                      ? {
                          uri: `${API_BASE}/api/upload/${featuredArticle.author.avatar}`,
                        }
                      : Images.avatar
                  }
                  style={styles.heroAuthorAvatar}
                />
                <Text style={styles.heroAuthorName}>
                  {featuredArticle?.author?.fullName || 'Anonymous'}
                </Text>
              </View>
              <View style={styles.heroStats}>
                <Icon name="eye" size={14} color={Colors.textGray} />
                <Text style={styles.heroStatsText}>
                  {formatViews(featuredArticle?.views)} views
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>

      <View style={styles.searchSection}>
        <Text style={styles.sectionTitle}>Discover Insights</Text>
        <Input
          placeholder="Search articles, topics, or authors..."
          placeholderTextColor={Colors.textGray}
          value={searchQuery}
          onChangeText={setSearchQuery}
          leftIcon={<SearchIcon />}
          containerStyle={styles.searchContainer}
        />
      </View>

      <View style={styles.statsSection}>
        <View style={styles.statCard}>
          <Icon name="file-text" size={24} color={Colors.primary} />
          <Text style={styles.statNumber}>{newsData.length}</Text>
          <Text style={styles.statLabel}>Articles</Text>
        </View>
        <View style={styles.statCard}>
          <Icon name="tag" size={24} color={Colors.purpleColor} />
          <Text style={styles.statNumber}>{categories.length - 1}</Text>
          <Text style={styles.statLabel}>Categories</Text>
        </View>
        <View style={styles.statCard}>
          <Icon name="users" size={24} color={Colors.accent} />
          <Text style={styles.statNumber}>
            {formatViews(
              newsData.reduce((sum, item) => sum + (item.views || 0), 0),
            )}
          </Text>
          <Text style={styles.statLabel}>Total Views</Text>
        </View>
      </View>

      <View style={styles.categoriesSection}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScroll}>
          {categories.map((cat, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedCategory(cat)}
              style={[
                styles.categoryChip,
                selectedCategory === cat && styles.categoryChipActive,
              ]}>
              <MaterialIcon
                name={
                  cat === 'All'
                    ? 'view-grid'
                    : cat === 'Technology'
                    ? 'robot'
                    : cat === 'Blockchain'
                    ? 'cube-outline'
                    : cat === 'AI'
                    ? 'brain'
                    : 'tag-outline'
                }
                size={16}
                color={
                  selectedCategory === cat
                    ? Colors.buttonTextColor
                    : Colors.white
                }
              />
              <Text
                style={[
                  styles.categoryChipText,
                  selectedCategory === cat && styles.categoryChipTextActive,
                ]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.featuredSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Articles</Text>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All</Text>
            <Icon name="arrow-right" size={16} color={Colors.primary} />
          </TouchableOpacity>
        </View>
        <NewsList
          articles={filteredNews.slice(0, 4)}
          isLoading={isNewsLoading}
        />
      </View>

      <View style={styles.trendingSection}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Icon name="trending-up" size={20} color={Colors.primary} />
            <Text style={styles.sectionTitle}>Trending Now</Text>
          </View>
        </View>
        <View style={styles.trendingList}>
          {trendingArticles.map((article, index) => (
            <TouchableOpacity key={article.id} style={styles.trendingItem}>
              <View style={styles.trendingNumber}>
                <Text style={styles.trendingNumberText}>{index + 1}</Text>
              </View>
              <View style={styles.trendingContent}>
                <Text style={styles.trendingTitle} numberOfLines={2}>
                  {article.title}
                </Text>
                <View style={styles.trendingMeta}>
                  <Text style={styles.trendingCategory}>
                    {article.category?.name}
                  </Text>
                  <View style={styles.trendingViews}>
                    <Icon name="eye" size={12} color={Colors.textGray} />
                    <Text style={styles.trendingViewsText}>
                      {formatViews(article.views)}
                    </Text>
                  </View>
                </View>
              </View>
              <FastImage
                source={{uri: `${API_BASE}/api/upload/${article.thumbnail}`}}
                style={styles.trendingImage}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.newsletterSection}>
        <LinearGradient
          colors={['rgba(1, 197, 186, 0.1)', 'rgba(99, 102, 241, 0.1)']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.newsletterGradient}>
          <View style={styles.newsletterIcon}>
            <Icon name="mail" size={32} color={Colors.primary} />
          </View>
          <Text style={styles.newsletterTitle}>Stay Updated</Text>
          <Text style={styles.newsletterSubtitle}>
            Subscribe to get the latest articles delivered to your inbox
          </Text>
          <View style={styles.newsletterForm}>
            <Input
              placeholder="Enter your email..."
              placeholderTextColor={Colors.textGray}
              value={email}
              onChangeText={setEmail}
              containerStyle={styles.newsletterInput}
              leftIcon={<Icon name="mail" size={18} color={Colors.textGray} />}
            />
            <Button.Main
              title="Subscribe"
              iconLeft={<Icon name="send" size={18} color={Colors.white} />}
              style={styles.subscribeButton}
              onPress={handleSubscribe}
            />
          </View>
        </LinearGradient>
      </View>

      <View style={styles.articlesSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>More Insights</Text>
        </View>
        <NewsSlider articles={filteredNews} />
      </View>
    </View>
  );

  if (isNewsLoading) {
    return (
      <LinearGradient
        colors={['#111827', '#001656', '#0F1026']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.gradientBackground}>
        <SafeAreaView style={styles.container}>
          <StatusBar
            translucent={false}
            backgroundColor={Colors.background}
            barStyle="light-content"
          />

          <Header title="News & Insights" showSearch={false} />

          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text
              style={{
                marginTop: scale(16),
                fontSize: FontSizes.small,
                color: Colors.white,
              }}>
              Đang tải dữ liệu...
            </Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  if (isNewsError) {
    return (
      <LinearGradient
        colors={['#111827', '#001656', '#0F1026']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.gradientBackground}>
        <SafeAreaView style={styles.container}>
          <StatusBar
            translucent={false}
            backgroundColor={Colors.background}
            barStyle="light-content"
          />

          <Header title="News & Insights" showSearch={false} />

          <CustomError onRetry={refetchNews} />
        </SafeAreaView>
      </LinearGradient>
    );
  }

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

        <Header title="News & Insights" showSearch={false} />

        <FlatList
          data={[{id: 'main'}]}
          keyExtractor={item => item.id}
          renderItem={renderScreenContent}
          showsVerticalScrollIndicator={false}
          style={styles.content}
          contentContainerStyle={{
            paddingBottom: bottom + scale(100),
          }}
          refreshing={isNewsLoading}
          onRefresh={refetchNews}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default NewsScreen;
