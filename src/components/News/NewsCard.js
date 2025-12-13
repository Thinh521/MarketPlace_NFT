import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {scale} from '~/utils/scaling';
import {Colors} from '~/theme/theme';
import FastImage from 'react-native-fast-image';
import {FontSizes, FontWeights} from '../../theme/theme';
import {useNavigation} from '@react-navigation/core';
import {API_BASE} from '@env';
import Images from '~/assets/images/images';

const {width} = Dimensions.get('window');

const NewsCard = ({article, layout = 'grid'}) => {
  const navigation = useNavigation();
  const isSlider = layout === 'slider';

  // ✅ Lấy đúng dữ liệu an toàn
  const authorName =
    article?.author?.fullName || article?.author?.userName || 'Anonymous';

  const authorAvatar = article?.author?.avatar
    ? {uri: `${API_BASE}/api/upload/${article.author.avatar}`}
    : Images.avatar;

  const articleImage = article?.thumbnail
    ? {uri: `${API_BASE}/api/upload/${article.thumbnail}`}
    : Images.news_banner;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[styles.card, isSlider && styles.cardSlider]}
      onPress={() => {
        navigation.navigate('NoBottomTab', {
          screen: 'Blog',
          params: {
            articleId: article.id,
            articleData: article,
          },
        });
      }}>
      {/* ✅ IMAGE */}
      <FastImage
        source={articleImage}
        style={[styles.image, isSlider && styles.imageSlider]}
        resizeMode={FastImage.resizeMode.cover}
      />

      <View style={styles.content}>
        {/* ✅ TITLE */}
        <Text style={styles.title} numberOfLines={2}>
          {article?.title}
        </Text>

        {/* ✅ DESCRIPTION */}
        <Text style={styles.excerpt} numberOfLines={2}>
          {article?.description}
        </Text>

        {/* ✅ AUTHOR */}
        <View style={styles.authorRow}>
          <FastImage
            source={authorAvatar}
            style={styles.avatar}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View>
            <Text style={styles.authorName} numberOfLines={1}>
              By {authorName}
            </Text>
            <Text style={styles.date} numberOfLines={1}>
              {article?.createdAt
                ? new Date(article.createdAt).toLocaleDateString()
                : ''}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: Colors.deepBackground,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: scale(12),
  },
  cardSlider: {
    width: width * 0.7,
    marginRight: scale(16),
  },
  image: {
    width: '100%',
    height: scale(140),
    backgroundColor: '#111827',
  },
  imageSlider: {
    height: scale(160),
  },
  content: {
    padding: scale(10),
  },
  title: {
    color: Colors.white,
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.medium,
    marginBottom: scale(8),
    lineHeight: 22,
  },
  excerpt: {
    color: Colors.textGray,
    fontSize: FontSizes.small,
    lineHeight: 20,
    marginBottom: scale(12),
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
  },
  avatar: {
    width: scale(24),
    height: scale(24),
    borderRadius: scale(16),
    backgroundColor: '#111827',
  },
  authorName: {
    color: Colors.white,
    fontSize: FontSizes.xsmall,
    fontWeight: FontWeights.semiBold,
    marginBottom: scale(2),
  },
  date: {
    color: Colors.textGray,
    fontSize: FontSizes.xsmall,
  },
});

export default NewsCard;
