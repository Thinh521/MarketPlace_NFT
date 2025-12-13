import React, {useState, useMemo, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  TextInput,
  FlatList,
} from 'react-native';
import {useRoute} from '@react-navigation/core';
import Icon from 'react-native-vector-icons/Feather';
import {showMessage} from 'react-native-flash-message';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Button} from '~/components/ui/Button';
import CustomError from '~/components/CustomError/CustomError';
import Product_2List from '~/components/Product_2/Product_2List';

import {updateProductInCollectionRequest} from '~/api/productCollectionApi';

import {useOwnedProducts} from '~/hooks/useOwnedProducts';

import {commonStyles} from '~/styles/common';

import {Colors} from '~/theme/theme';
import styles from './AddProductsToCollection.styles';

const AddProductsToCollectionScreen = () => {
  const {collection} = useRoute().params || {};

  // Fetch user's NFTs
  const {
    data: productsData,
    isLoading: isLoadingProducts,
    isError: productsError,
    refetch,
  } = useOwnedProducts();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [filterType, setFilterType] = useState('all');

  // Initialize selected products from collection
  useEffect(() => {
    if (collection?.products && Array.isArray(collection.products)) {
      const productIds = collection.products.map(p => p.id || p);
      setSelectedProducts(productIds);
    }
  }, [collection]);

  // Filter and search products
  const filteredProducts = useMemo(() => {
    if (!productsData || !Array.isArray(productsData)) return [];

    let filtered = productsData;

    if (filterType === 'in') {
      filtered = filtered.filter(p => selectedProducts.includes(p.id));
    } else if (filterType === 'out') {
      filtered = filtered.filter(p => !selectedProducts.includes(p.id));
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        p =>
          p.name?.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query) ||
          p.tokenId?.toString().includes(query),
      );
    }

    return filtered;
  }, [productsData, searchQuery, filterType, selectedProducts]);

  // Toggle product selection
  const toggleProductSelection = productId => {
    setSelectedProducts(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      }
      return [...prev, productId];
    });
  };

  // Get initial products in collection
  const getInitialProductIds = useCallback(() => {
    if (collection?.products && Array.isArray(collection.products)) {
      return collection.products.map(p => p.id || p);
    }
    return [];
  }, [collection]);

  // Detect changes
  const detectChanges = () => {
    const initialIds = getInitialProductIds();
    const currentIds = selectedProducts;

    const added = currentIds.filter(id => !initialIds.includes(id));
    const removed = initialIds.filter(id => !currentIds.includes(id));

    return {added, removed, hasChanges: added.length > 0 || removed.length > 0};
  };

  // Handle save changes
  const handleSaveChanges = async () => {
    const changes = detectChanges();

    if (!changes.hasChanges) {
      showMessage({
        message: 'Không có thay đổi nào',
        type: 'warning',
      });
      return;
    }

    setIsProcessing(true);

    try {
      if (changes.added.length > 0) {
        await updateProductInCollectionRequest({
          productIds: changes.added,
          collectionId: collection.id,
          type: 'add',
          listingId: collection.listingId,
        });
      }

      if (changes.removed.length > 0) {
        await updateProductInCollectionRequest({
          productIds: changes.removed,
          collectionId: collection.id,
          type: 'remove',
          listingId: collection.listingId,
        });
      }

      showMessage({
        message: 'Cập nhật thành công!',
        type: 'success',
      });
    } catch (error) {
      showMessage({
        message: 'Không thể cập nhật bộ sưu tập. Vui lòng thử lại.',
        type: 'danger',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Stats
  const stats = useMemo(() => {
    const initialCount = getInitialProductIds().length;
    const currentCount = selectedProducts.length;
    const totalCount = productsData?.length || 0;

    return {
      initial: initialCount,
      current: currentCount,
      total: totalCount,
      added: currentCount - initialCount,
    };
  }, [selectedProducts, productsData, getInitialProductIds]);

  if (isLoadingProducts) {
    return (
      <LinearGradient
        colors={['#111827', '#001656', '#0F1026']}
        style={styles.gradientBackground}>
        <SafeAreaView style={styles.container}>
          <StatusBar
            backgroundColor={Colors.background}
            barStyle="light-content"
            translucent={false}
          />
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text style={styles.loadingText}>Đang tải NFTs...</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  if (productsError || !productsData) {
    return (
      <LinearGradient
        colors={['#111827', '#001656', '#0F1026']}
        style={styles.gradientBackground}>
        <SafeAreaView style={styles.container}>
          <StatusBar
            backgroundColor={Colors.background}
            barStyle="light-content"
            translucent={false}
          />
          <CustomError onRetry={refetch} />
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['#111827', '#001656', '#0F1026']}
      style={styles.gradientBackground}>
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={Colors.background}
          barStyle="light-content"
          translucent={false}
        />

        <FlatList
          data={[1]}
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={styles.scrollContent}
          renderItem={() => (
            <View style={styles.main}>
              {/* Stats Cards */}
              <View style={styles.statsRow}>
                <View style={styles.statCard}>
                  <LinearGradient
                    colors={[
                      'rgba(1, 197, 186, 0.1)',
                      'rgba(1, 109, 176, 0.1)',
                    ]}
                    style={styles.statCardGradient}>
                    <Icon name="grid" size={20} color={Colors.primary} />
                    <Text style={styles.statCardValue}>{stats.total}</Text>
                    <Text style={styles.statCardLabel}>Tổng NFTs</Text>
                  </LinearGradient>
                </View>

                <View style={styles.statCard}>
                  <LinearGradient
                    colors={[
                      'rgba(59, 130, 246, 0.1)',
                      'rgba(147, 51, 234, 0.1)',
                    ]}
                    style={styles.statCardGradient}>
                    <Icon name="check-circle" size={20} color="#3B82F6" />
                    <Text style={styles.statCardValue}>{stats.current}</Text>
                    <Text style={styles.statCardLabel}>Đã chọn</Text>
                  </LinearGradient>
                </View>

                <View style={styles.statCard}>
                  <LinearGradient
                    colors={[
                      stats.added >= 0
                        ? 'rgba(34, 197, 94, 0.1)'
                        : 'rgba(239, 68, 68, 0.1)',
                      stats.added >= 0
                        ? 'rgba(16, 185, 129, 0.1)'
                        : 'rgba(220, 38, 38, 0.1)',
                    ]}
                    style={styles.statCardGradient}>
                    <Icon
                      name={stats.added >= 0 ? 'trending-up' : 'trending-down'}
                      size={20}
                      color={stats.added >= 0 ? '#22C55E' : '#EF4444'}
                    />
                    <Text
                      style={[
                        styles.statCardValue,
                        {color: stats.added >= 0 ? '#22C55E' : '#EF4444'},
                      ]}>
                      {stats.added >= 0 ? `+${stats.added}` : stats.added}
                    </Text>
                    <Text style={styles.statCardLabel}>Thay đổi</Text>
                  </LinearGradient>
                </View>
              </View>

              {/* Search + Actions Row */}
              <View style={styles.searchRow}>
                <View style={styles.searchInputWrapper}>
                  <Icon
                    name="search"
                    size={18}
                    color={Colors.textGray}
                    style={styles.searchIcon}
                  />
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Tìm kiếm NFT theo tên, ID..."
                    placeholderTextColor={Colors.textGray}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    editable={!isProcessing}
                  />
                  {searchQuery.length > 0 && (
                    <TouchableOpacity
                      onPress={() => setSearchQuery('')}
                      style={styles.clearButton}>
                      <Icon name="x-circle" size={18} color={Colors.textGray} />
                    </TouchableOpacity>
                  )}
                </View>

                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => {
                    const allFilteredIds = filteredProducts.map(p => p.id);
                    const isAllSelected = allFilteredIds.every(id =>
                      selectedProducts.includes(id),
                    );
                    if (isAllSelected) {
                      setSelectedProducts(prev =>
                        prev.filter(id => !allFilteredIds.includes(id)),
                      );
                    } else {
                      setSelectedProducts(prev =>
                        Array.from(new Set([...prev, ...allFilteredIds])),
                      );
                    }
                  }}>
                  <Icon
                    name={
                      filteredProducts.length > 0 &&
                      filteredProducts.every(p =>
                        selectedProducts.includes(p.id),
                      )
                        ? 'x-square'
                        : 'check-square'
                    }
                    size={18}
                    color={
                      filteredProducts.length > 0 &&
                      filteredProducts.every(p =>
                        selectedProducts.includes(p.id),
                      )
                        ? Colors.textGray
                        : Colors.primary
                    }
                  />
                </TouchableOpacity>
              </View>

              {/* Filter Tabs */}
              <View style={styles.filterSection}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.filterScrollContent}>
                  <TouchableOpacity
                    style={[
                      styles.filterTab,
                      filterType === 'all' && styles.filterTabActive,
                    ]}
                    onPress={() => setFilterType('all')}
                    disabled={isProcessing}>
                    <Icon
                      name="layers"
                      size={16}
                      color={
                        filterType === 'all' ? Colors.primary : Colors.white
                      }
                    />
                    <Text
                      style={[
                        styles.filterTabText,
                        filterType === 'all' && styles.filterTabTextActive,
                      ]}>
                      Tất cả ({productsData.length})
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.filterTab,
                      filterType === 'in' && styles.filterTabActive,
                    ]}
                    onPress={() => setFilterType('in')}
                    disabled={isProcessing}>
                    <Icon
                      name="check-square"
                      size={16}
                      color={
                        filterType === 'in' ? Colors.primary : Colors.white
                      }
                    />
                    <Text
                      style={[
                        styles.filterTabText,
                        filterType === 'in' && styles.filterTabTextActive,
                      ]}>
                      Trong bộ sưu tập ({stats.current})
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.filterTab,
                      filterType === 'out' && styles.filterTabActive,
                    ]}
                    onPress={() => setFilterType('out')}
                    disabled={isProcessing}>
                    <Icon
                      name="square"
                      size={16}
                      color={
                        filterType === 'out' ? Colors.primary : Colors.white
                      }
                    />
                    <Text
                      style={[
                        styles.filterTabText,
                        filterType === 'out' && styles.filterTabTextActive,
                      ]}>
                      Ngoài bộ sưu tập ({stats.total - stats.current})
                    </Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>

              <View style={styles.sectionHeader}>
                <View style={styles.sectionTitleContainer}>
                  <View style={styles.sectionDivider} />
                  <Text style={[commonStyles.title, styles.sectionTitle]}>
                    PRODUCT NFTS
                  </Text>
                  <View style={styles.sectionDivider} />
                </View>
              </View>

              {/* Products Grid */}
              <View>
                {filteredProducts.length > 0 ? (
                  <Product_2List
                    data={filteredProducts}
                    selectMode={true}
                    selectedIds={selectedProducts}
                    onSelectToggle={toggleProductSelection}
                    onEditPress={false}
                  />
                ) : (
                  <View style={styles.emptyContainer}>
                    <View style={styles.emptyIconCircle}>
                      <Icon name="inbox" size={40} color={Colors.textGray} />
                    </View>
                    <Text style={styles.emptyTitle}>
                      {searchQuery
                        ? 'Không tìm thấy NFT'
                        : 'Bạn chưa có NFT nào'}
                    </Text>
                    <Text style={styles.emptySubtitle}>
                      {searchQuery
                        ? 'Thử tìm kiếm với từ khóa khác'
                        : 'Hãy tạo hoặc mua NFT đầu tiên của bạn'}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          )}
        />

        {/* Bottom Action Bar */}
        <View style={styles.bottomBar}>
          <Button.Main
            title={isProcessing ? 'Đang lưu...' : 'Lưu thay đổi'}
            onPress={handleSaveChanges}
            disabled={isProcessing}
            useGradient
          />
        </View>

        <View style={styles.bottomSpacing} />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default AddProductsToCollectionScreen;
