import React, {useState, useRef} from 'react';
import {FlatList, StatusBar, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

import {FilterLineIcon, SearchIcon} from '~/assets/icons/icons';

import {Input} from '~/components/ui/Input';
import {Button} from '~/components/ui/Button';
import ProductList from '~/components/Product/ProductList';
import SearchLoading from '~/components/Loading/SearchLoading';
import CustomError from '~/components/CustomError/CustomError';
import CustomEmpty from '~/components/CustomEmpty/CustomEmpty';
import FilterBottomSheet from './components/FilterBottomSheet';
import CollectionSlider from '~/components/Collection/CollectionSlider';
import ProductCardSkeleton from '~/components/CustomSkeleton/ProductCardSkeleton';
import CollectionCardSkeleton from '~/components/CustomSkeleton/CollectionCardSkeleton';

import {useProducts} from '~/hooks/useProducts';
import {useProductCollections} from '~/hooks/useCollections';
import useDebouncedSearching from '~/hooks/useDebouncedSearching';

import {Colors} from '~/theme/theme';
import {scale} from '~/utils/scaling';
import styles from './SearchAndFilter.styles';

const SearchAndFilterScreen = () => {
  const {bottom} = useSafeAreaInsets();
  const filterBottomSheetRef = useRef(null);

  const [searchText, setSearchText] = useState('');
  const [appliedFilters, setAppliedFilters] = useState(null);

  const isSearching = useDebouncedSearching(searchText, 500);
  const {allProducts, isLoading, error, refetch} = useProducts();
  const {
    collectionData,
    isLoading: isCollectionLoading,
    error: isCollectionError,
    refetch: isCollectionRefetch,
  } = useProductCollections();

  // Apply filters to products
  const getFilteredProducts = () => {
    if (!allProducts) return [];

    let filtered = allProducts.filter(item =>
      item?.name?.toLowerCase().includes(searchText.toLowerCase()),
    );

    if (!appliedFilters) return filtered;

    // Filter by blockchain
    if (appliedFilters.blockchain) {
      filtered = filtered.filter(
        item => item.blockchain === appliedFilters.blockchain,
      );
    }

    // Filter by type
    if (appliedFilters.type?.length > 0) {
      filtered = filtered.filter(item =>
        appliedFilters.type.includes(item.type),
      );
    }

    // Filter by price range
    if (appliedFilters.priceRange) {
      const {min, max} = appliedFilters.priceRange;

      filtered = filtered.filter(item => {
        const price = Number(item.price);

        if (min !== null && price < min) return false;
        if (max !== null && price > max) return false;

        return true;
      });
    }

    // Filter by stock
    if (appliedFilters.onlyInStock) {
      filtered = filtered.filter(item => item.instock > 0);
    }

    // Filter by for sale
    if (appliedFilters.onlyForSale) {
      filtered = filtered.filter(item => item.isForSale === true);
    }

    // Sort
    switch (appliedFilters.sort) {
      case 'price_asc':
        filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'price_desc':
        filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case 'likes':
        filtered.sort((a, b) => (b.likeCount || 0) - (a.likeCount || 0));
        break;
      case 'createdAt':
      default:
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }

    return filtered;
  };

  const filteredCollections = collectionData?.filter(item =>
    item?.name?.toLowerCase().includes(searchText.toLowerCase()),
  );

  const filteredProducts = getFilteredProducts();

  const handleApplyFilters = filters => {
    setAppliedFilters(filters);
  };

  const handleOpenFilter = () => {
    filterBottomSheetRef.current?.expand();
  };

  // Count active filters
  const activeFiltersCount = appliedFilters
    ? [
        !!appliedFilters.blockchain,
        appliedFilters.type?.length > 0,
        appliedFilters.priceRange?.min !== null ||
          appliedFilters.priceRange?.max !== null,
        appliedFilters.onlyInStock,
        appliedFilters.onlyForSale,
      ].filter(Boolean).length
    : 0;

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

        <View style={styles.searchAndFilterContainer}>
          <View style={styles.inputWrapper}>
            <Input
              placeholder="Search NFT, collection, ..."
              value={searchText}
              onChangeText={setSearchText}
              leftIcon={SearchIcon}
              inputStyle={styles.inputStyle}
            />
          </View>

          <Button.Icon
            icon={<FilterLineIcon />}
            style={[
              styles.buttonFilter,
              activeFiltersCount > 0 && styles.buttonFilterActive,
            ]}
            onPress={handleOpenFilter}
          />
        </View>

        <FlatList
          data={[1]}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[{paddingBottom: bottom + scale(40)}]}
          renderItem={() => (
            <>
              {isSearching ? (
                <SearchLoading />
              ) : (
                <>
                  <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                      <Text style={styles.sectionTitle}>Collections</Text>
                    </View>

                    {isCollectionLoading ? (
                      <CollectionCardSkeleton itemCount={2} />
                    ) : isCollectionError ? (
                      <CustomError onRetry={isCollectionRefetch} />
                    ) : !filteredCollections ? (
                      <CustomEmpty type="noProduct" />
                    ) : (
                      <CollectionSlider
                        data={filteredCollections}
                        onEditPress={false}
                      />
                    )}
                  </View>

                  <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                      <Text style={styles.sectionTitle}>
                        Products NFT
                        {activeFiltersCount > 0 && (
                          <Text style={styles.filteredText}>
                            {' '}
                            ({filteredProducts.length} results)
                          </Text>
                        )}
                      </Text>
                    </View>

                    {isLoading ? (
                      <ProductCardSkeleton layout="grid" itemCount={2} />
                    ) : error ? (
                      <CustomError onRetry={refetch} />
                    ) : !filteredProducts ? (
                      <CustomEmpty
                        title="No items found"
                        subtitle={
                          activeFiltersCount > 0
                            ? 'Try adjusting your filters'
                            : 'Data is being updated'
                        }
                        type="noProduct"
                      />
                    ) : (
                      <ProductList products={filteredProducts} />
                    )}
                  </View>
                </>
              )}
            </>
          )}
        />

        <FilterBottomSheet
          bottomSheetRef={filterBottomSheetRef}
          onApplyFilters={handleApplyFilters}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SearchAndFilterScreen;
