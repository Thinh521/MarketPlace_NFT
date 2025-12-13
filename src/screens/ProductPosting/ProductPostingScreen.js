import {IPFS_GATEWAY} from '@env';
import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import {Controller, useForm} from 'react-hook-form';
import Icon from 'react-native-vector-icons/Feather';
import {showMessage} from 'react-native-flash-message';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, ScrollView, StatusBar} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {PriceTagLineIcon} from '~/assets/icons/icons';

import {Input} from '~/components/ui/Input';
import {Button} from '~/components/ui/Button';

import {VALIDATION_RULES} from '~/validations/authValidations';

import useKeyboardVisible from '~/hooks/useKeyboardVisible';

import {MarketplaceService} from '~/contracts/MarketplaceService';
import {CONTRACT_ADDRESSES} from '~/contracts/addresses/AddressMartketPlace';

import {formatEth, formatUsd} from '~/utils/price';

import {commonStyles} from '~/styles/common';
import {Colors} from '~/theme/theme';
import styles from './ProductPosting.styles';

const ProductPostingScreen = ({route}) => {
  const {product, walletProvider} = route.params ?? {};

  const keyboardVisible = useKeyboardVisible();
  const [isListing, setIsListing] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      price: product?.price || '',
      saleType: 'fixedPrice',
      quantity: '1',
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const onSubmit = async formData => {
    if (!product) {
      showMessage({message: 'Không có NFT để đăng bán', type: 'warning'});
      return;
    }

    setIsListing(true);

    try {
      showMessage({
        message: 'Vui lòng xác nhận trong ví của bạn',
        type: 'info',
      });

      const result = await MarketplaceService.listNFT({
        walletProvider,
        nftAddress: product.contractAddress || CONTRACT_ADDRESSES.NFT_ADDRESS,
        tokenId: product.tokenId,
        price: formData.price,
      });

      showMessage({
        message: 'NFT đã được đăng bán thành công',
        type: 'success',
      });

      return result;
    } catch (err) {
      showMessage({message: err.message, type: 'danger'});
    } finally {
      setIsListing(false);
    }
  };

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
          contentContainerStyle={styles.scrollContent}
          scrollEnabled={!isListing}>
          <View style={styles.content}>
            {/* NFT Preview */}
            {product && (
              <View style={styles.reviewCard}>
                <FastImage
                  source={{uri: `${IPFS_GATEWAY}${product.image}`}}
                  style={styles.reviewImage}
                  resizeMode="cover"
                />
                <View style={styles.reviewInfo}>
                  <Text style={styles.reviewCollectionName}>
                    Metafacely NFT
                  </Text>
                  <Text style={styles.reviewProductName} numberOfLines={2}>
                    {product.name}
                  </Text>
                  <View style={styles.reviewQuantityRow}>
                    <Icon name="layers" size={14} color="#9CA3AF" />
                    <Text style={styles.reviewQuantity}>Quantity: 1</Text>
                  </View>
                </View>
                <View style={styles.reviewPriceContainer}>
                  <Text style={styles.reviewPriceLabel}>Price</Text>
                  <View style={styles.reviewPriceRow}>
                    <MaterialIcon name="ethereum" size={18} color="#627EEA" />
                    <Text style={styles.reviewPriceValue}>
                      {formatEth(product.price)} ETH
                    </Text>
                  </View>
                  <Text style={styles.reviewUsdPrice}>
                    {formatUsd(product.price)}
                  </Text>
                </View>
              </View>
            )}

            {/* Sale Details */}
            <View>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionTitleContainer}>
                  <View style={styles.sectionDivider} />
                  <Text style={[commonStyles.title, styles.sectionTitle]}>
                    SALE DETAILS
                  </Text>
                  <View style={styles.sectionDivider} />
                </View>
              </View>

              <View style={styles.formGroup}>
                <Input
                  label="Sale Type"
                  labelStyle={styles.label}
                  value="Fixed Price"
                  containerStyle={styles.inputContainer}
                  disabled={true}
                  readonly={true}
                  showClearButton={false}
                  rightIcon={() => <PriceTagLineIcon />}
                />
              </View>

              <View style={styles.formGroup}>
                <Controller
                  control={control}
                  name="price"
                  rules={VALIDATION_RULES.price}
                  render={({field: {value, onChange, onBlur}}) => (
                    <Input
                      label="Price (ETH)"
                      labelStyle={styles.label}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="0.00"
                      placeholderTextColor={Colors.textGray}
                      containerStyle={styles.inputContainer}
                      keyboardType="numeric"
                      editable={!isListing}
                      error={!!errors.price}
                      errorMessage={errors.price?.message}
                    />
                  )}
                />
              </View>

              <View style={styles.formGroup}>
                <Controller
                  control={control}
                  name="quantity"
                  rules={VALIDATION_RULES.quantity}
                  render={({field: {value, onChange, onBlur}}) => (
                    <Input
                      label="Quantity"
                      labelStyle={styles.label}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="1"
                      placeholderTextColor={Colors.textGray}
                      containerStyle={styles.inputContainer}
                      keyboardType="numeric"
                      editable={!isListing}
                      error={!!errors.quantity}
                      errorMessage={errors.quantity?.message}
                    />
                  )}
                />
              </View>
            </View>
          </View>
        </ScrollView>

        {!keyboardVisible && (
          <View style={styles.buttonContainer}>
            <Button.Main
              title={isListing ? 'LISTING...' : 'LIST FOR SALE'}
              useGradient
              gradientColors={[Colors.secondary, Colors.primary]}
              onPress={handleSubmit(onSubmit)}
              disabled={isListing}
            />
          </View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ProductPostingScreen;
