import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Input} from '~/components/ui/Input';
import {Button} from '~/components/ui/Button';

import {BLOCKCHAIN_OPTIONS} from '~/constants/blockchain';

import {Colors, FontSizes, FontWeights} from '~/theme/theme';
import {scale} from '~/utils/scaling';

const TYPE_OPTIONS = [
  {label: 'Buy Now', value: 'buyNow', icon: 'shopping'},
  {label: 'Auction', value: 'auction', icon: 'gavel'},
];

const SORT_OPTIONS = [
  {label: 'Recently Created', value: 'createdAt', icon: 'clock'},
  {label: 'Price: Low to High', value: 'price_asc', icon: 'trending-up'},
  {label: 'Price: High to Low', value: 'price_desc', icon: 'trending-down'},
  {label: 'Most Liked', value: 'likes', icon: 'heart'},
];

const FilterBottomSheet = ({bottomSheetRef, onApplyFilters}) => {
  const snapPoints = useMemo(() => ['75%'], []);

  // Filter states
  const [selectedBlockchain, setSelectedBlockchain] = useState('');
  const [showBlockchainOptions, setShowBlockchainOptions] = useState(false);
  const [selectedType, setSelectedType] = useState([]);
  const [selectedSort, setSelectedSort] = useState('createdAt');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [onlyForSale, setOnlyForSale] = useState(false);
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');

  const toggleType = value => {
    setSelectedType(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value],
    );
  };

  const handleReset = () => {
    setSelectedBlockchain('');
    setSelectedType([]);
    setPriceMin('');
    setPriceMax('');
    setSelectedSort('createdAt');
    setOnlyInStock(false);
    setOnlyForSale(false);
  };

  const handleApply = () => {
    const filters = {
      blockchain: selectedBlockchain,
      type: selectedType,
      priceRange: {
        min: priceMin ? Number(priceMin) : null,
        max: priceMax ? Number(priceMax) : null,
      },
      sort: selectedSort,
      onlyInStock,
      onlyForSale,
    };

    onApplyFilters(filters);
    bottomSheetRef?.current?.close();
  };

  const activeFiltersCount = [
    !!selectedBlockchain,
    selectedType.length > 0,
    onlyInStock,
    onlyForSale,
  ].filter(Boolean).length;

  const renderBackdrop = props => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      opacity={0.7}
      pressBehavior="close"
    />
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.bottomSheetBackground}
      handleIndicatorStyle={styles.handleIndicator}>
      <BottomSheetView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Icon name="filter" size={24} color={Colors.primary} />
            <Text style={styles.headerTitle}>Filters</Text>
            {activeFiltersCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{activeFiltersCount}</Text>
              </View>
            )}
          </View>
          <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
            <Icon name="rotate-ccw" size={18} color={Colors.primary} />
            <Text style={styles.resetText}>Reset</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          {/* Blockchain */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Blockchain</Text>

            <View style={{position: 'relative'}}>
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() =>
                  setShowBlockchainOptions(!showBlockchainOptions)
                }>
                <Text
                  style={[
                    styles.dropdownText,
                    !selectedBlockchain && {color: Colors.textGray},
                  ]}>
                  {selectedBlockchain || 'Select network'}
                </Text>

                <Icon
                  name={showBlockchainOptions ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color={Colors.white}
                />
              </TouchableOpacity>

              {showBlockchainOptions && (
                <View style={styles.dropdownListAbsolute}>
                  {BLOCKCHAIN_OPTIONS.map(option => (
                    <TouchableOpacity
                      key={option.value}
                      style={[
                        styles.dropdownItem,
                        selectedBlockchain === option.value &&
                          styles.dropdownItemActive,
                      ]}
                      onPress={() => {
                        setSelectedBlockchain(option.value);
                        setShowBlockchainOptions(false);
                      }}>
                      <MaterialIcon
                        name={option.icon}
                        size={20}
                        color={
                          selectedBlockchain === option.value
                            ? Colors.primary
                            : Colors.textGray
                        }
                      />

                      <Text
                        style={[
                          styles.dropdownItemText,
                          selectedBlockchain === option.value &&
                            styles.dropdownItemTextActive,
                        ]}>
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>

          {/* Type */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Listing Type</Text>
            <View style={styles.optionsGrid}>
              {TYPE_OPTIONS.map(option => {
                const isSelected = selectedType.includes(option.value);
                return (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.optionCard,
                      isSelected && styles.optionCardActive,
                    ]}
                    onPress={() => toggleType(option.value)}>
                    <Icon
                      name={option.icon}
                      size={20}
                      color={isSelected ? Colors.primary : Colors.textGray}
                    />
                    <Text
                      style={[
                        styles.optionLabel,
                        isSelected && styles.optionLabelActive,
                      ]}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Price Range */}
          <View style={styles.section}>
            <View style={styles.priceInputRow}>
              <Input
                label="Min Price"
                labelStyle={styles.label}
                value={priceMin}
                onChangeText={setPriceMin}
                keyboardType="numeric"
                placeholder="0"
                style={styles.priceInput}
              />

              <Input
                label="Max Price"
                labelStyle={styles.label}
                value={priceMax}
                onChangeText={setPriceMax}
                keyboardType="numeric"
                placeholder="0"
                style={styles.priceInput}
              />
            </View>
          </View>

          {/* Sort By */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sort By</Text>
            <View style={styles.sortListRow}>
              {SORT_OPTIONS.map(option => {
                const isSelected = selectedSort === option.value;
                return (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.sortChip,
                      isSelected && styles.sortChipActive,
                    ]}
                    onPress={() => setSelectedSort(option.value)}>
                    <Icon
                      name={option.icon}
                      size={16}
                      color={isSelected ? Colors.primary : Colors.textGray}
                    />
                    <Text
                      style={[
                        styles.sortChipText,
                        isSelected && styles.sortChipTextActive,
                      ]}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>

        {/* Footer Actions */}
        <View style={styles.footer}>
          <Button.Main
            title="Close"
            onPress={() => bottomSheetRef?.current?.close()}
            style={[styles.button, styles.closeButton]}
            textStyle={styles.closeButtonText}
          />
          <Button.Main
            title={`Apply${
              activeFiltersCount > 0 ? ` (${activeFiltersCount})` : ''
            }`}
            onPress={handleApply}
            style={[styles.button, styles.applyButton]}
          />
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: Colors.background,
  },
  handleIndicator: {
    backgroundColor: Colors.border,
    width: scale(40),
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingBottom: scale(16),
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(12),
  },
  headerTitle: {
    fontSize: FontSizes.xlarge,
    fontWeight: FontWeights.bold,
    color: Colors.white,
  },
  badge: {
    backgroundColor: Colors.primary,
    borderRadius: scale(12),
    paddingHorizontal: scale(8),
    paddingVertical: scale(2),
    minWidth: scale(20),
    alignItems: 'center',
  },
  badgeText: {
    color: Colors.white,
    fontSize: FontSizes.small,
    fontWeight: FontWeights.bold,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
    paddingVertical: scale(8),
    paddingHorizontal: scale(12),
    borderRadius: scale(8),
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
  },
  resetText: {
    color: Colors.primary,
    fontSize: FontSizes.small,
    fontWeight: FontWeights.semiBold,
  },
  scrollContent: {
    paddingVertical: scale(20),
    paddingHorizontal: scale(16),
  },
  section: {
    marginBottom: scale(20),
  },
  sectionTitle: {
    color: Colors.white,
    fontSize: scale(14),
    fontWeight: FontWeights.semiBold,
    marginBottom: scale(8),
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(12),
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: scale(12),
    paddingVertical: scale(12),
    paddingHorizontal: scale(12),
  },
  optionCardActive: {
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  optionLabel: {
    color: Colors.textGray,
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.semiBold,
  },
  optionLabelActive: {
    color: Colors.primary,
  },
  priceInputRow: {
    gap: scale(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    color: Colors.white,
    fontSize: scale(14),
    fontWeight: FontWeights.semiBold,
    marginBottom: scale(8),
  },
  priceInput: {
    flex: 1,
  },
  sortListRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(8), // khoảng cách giữa chip
  },

  sortChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
    paddingVertical: scale(6),
    paddingHorizontal: scale(10),
    borderRadius: scale(16),
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.03)',
  },

  sortChipActive: {
    backgroundColor: 'rgba(99,102,241,0.15)',
    borderColor: Colors.primary,
  },

  sortChipText: {
    color: Colors.textGray,
    fontSize: scale(12),
    fontWeight: FontWeights.medium,
  },

  sortChipTextActive: {
    color: Colors.primary,
    fontWeight: FontWeights.bold,
  },

  toggleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: scale(12),
    padding: scale(16),
    marginBottom: scale(12),
  },
  toggleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(12),
  },
  toggleLabel: {
    color: Colors.textGray,
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.semiBold,
  },
  toggle: {
    width: scale(48),
    height: scale(26),
    borderRadius: scale(13),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    padding: scale(2),
  },
  toggleActive: {
    backgroundColor: Colors.primary,
  },
  toggleThumb: {
    width: scale(22),
    height: scale(22),
    borderRadius: scale(11),
    backgroundColor: Colors.white,
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
  footer: {
    flexDirection: 'row',
    gap: scale(12),
    padding: scale(20),
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  button: {
    flex: 1,
    borderRadius: scale(12),
  },
  closeButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.border,
  },
  closeButtonText: {
    color: Colors.textGray,
  },
  applyButton: {
    backgroundColor: Colors.primary,
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.deepBackground,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: scale(8),
    paddingVertical: scale(14),
    paddingHorizontal: scale(16),
    marginBottom: scale(8),
  },
  dropdownText: {
    color: Colors.white,
    fontSize: scale(14),
    fontWeight: FontWeights.medium,
  },
  dropdownListAbsolute: {
    position: 'absolute',
    top: scale(52),
    left: 0,
    right: 0,
    backgroundColor: Colors.deepBackground,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: scale(8),
    zIndex: 999,
    elevation: 5,
  },
  dropdownItem: {
    gap: scale(6),
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(12),
    paddingHorizontal: scale(16),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  dropdownItemActive: {
    backgroundColor: 'rgba(0,217,255,0.1)',
  },
  dropdownItemText: {
    color: 'hsla(0, 0%, 100%, 0.70)',
    fontSize: scale(14),
  },
  dropdownItemTextActive: {
    color: '#00D9FF',
    fontWeight: FontWeights.bold,
  },
});

export default FilterBottomSheet;
