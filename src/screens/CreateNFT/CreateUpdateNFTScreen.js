import {IPFS_GATEWAY} from '@env';
import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Switch,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Feather';
import {Controller, useForm} from 'react-hook-form';
import {showMessage} from 'react-native-flash-message';
import FastImage from 'react-native-fast-image';
import {
  useAppKitAccount,
  useAppKitProvider,
} from '@reown/appkit-ethers-react-native';

import {CloseIcon, CloudIcon, PlusIcon} from '~/assets/icons/icons';

import {Input} from '~/components/ui/Input';
import {Button} from '~/components/ui/Button';

import {NFTService} from '~/contracts/NFTService';
import {BLOCKCHAIN_OPTIONS} from '~/constants/blockchain';

import useKeyboardVisible from '~/hooks/useKeyboardVisible';
import {createProductRequest, updateProductRequest} from '~/api/productApi';

import {scale} from '~/utils/scaling';
import {ERROR_MESSAGES} from '~/utils/errors/blockchainErrors';

import {VALIDATION_RULES} from '~/validations/authValidations';

import {commonStyles} from '~/styles/common';
import {Colors} from '~/theme/theme';
import styles from './CreateUpdateNFT.styles';

// Main content
const CreateUpdateNFTScreen = ({navigation, route}) => {
  const product = route.params?.product;

  const isEditMode = !!product?.id;

  const {walletProvider} = useAppKitProvider();
  const {isConnected, address} = useAppKitAccount();
  const keyboardVisible = useKeyboardVisible();

  const [properties, setProperties] = useState(product?.properties || []);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(
    product?.image
      ? {uri: `${IPFS_GATEWAY}${product.image}`, fileName: 'current_image.jpg'}
      : null,
  );
  const [showBlockchainOptions, setShowBlockchainOptions] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
    setValue,
  } = useForm({
    defaultValues: {
      name: product?.name || '',
      externalLink: product?.externalLink || '',
      description: product?.description || '',
      supply: product?.supply?.toString() || '',
      blockchain: product?.blockchain || '',
      freezeMetadata: !!product?.isFreeze,
      price: product?.price?.toString() || '',
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  // Image picker
  const handleImagePicker = () => {
    const options = {
      mediaType: 'mixed',
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) return;

      if (response.error) {
        Alert.alert(
          'Lỗi chọn ảnh',
          'Không thể chọn ảnh. Vui lòng thử lại hoặc kiểm tra quyền truy cập.',
        );
        return;
      }

      if (response.errorCode) {
        let errorMsg = 'Không thể chọn ảnh';
        if (response.errorCode === 'permission') {
          errorMsg = 'Vui lòng cấp quyền truy cập thư viện ảnh';
        }
        Alert.alert('Lỗi', errorMsg);
        return;
      }

      if (response.assets?.[0]) {
        setSelectedImage(response.assets[0]);
      }
    });
  };

  // Properties handele
  const handleAddProperty = () => {
    setProperties([...properties, {type: '', name: '', id: Date.now()}]);
  };

  const handleRemoveProperty = id => {
    setProperties(properties.filter(prop => prop.id !== id));
  };

  const handlePropertyChange = (id, field, value) => {
    setProperties(
      properties.map(prop =>
        prop.id === id ? {...prop, [field]: value} : prop,
      ),
    );
  };

  // Handle submit
  const onSubmit = async data => {
    if (!isConnected) {
      Alert.alert('Lỗi', ERROR_MESSAGES.WALLET_NOT_CONNECTED);
      return;
    }

    if (!selectedImage && !isEditMode) {
      Alert.alert('Lỗi', ERROR_MESSAGES.IMAGE_REQUIRED);
      return;
    }

    setIsProcessing(true);

    try {
      const formData = {
        ...data,
        properties: properties
          .filter(p => p.type.trim() && p.name.trim())
          .map(p => ({type: p.type.trim(), name: p.name.trim()})),
        price: data.freezeMetadata ? Number(data.price) : undefined,
        isFreeze: data.freezeMetadata,
        supply: Number(data.supply),
      };

      if (selectedImage && !selectedImage.uri.includes('ipfs')) {
        formData.image = selectedImage;
      }

      let result;

      if (isEditMode) {
        // Update mode
        formData.id = product.id;
        formData.tokenId = product.tokenId;

        showMessage({
          message: 'Đang cập nhật NFT...',
          type: 'info',
          duration: 2000,
        });

        result = await updateProductRequest(formData);

        if (result?.data) {
          await NFTService.updateTokenURI(
            walletProvider,
            address,
            product.tokenId,
            result.data,
          );

          Alert.alert('Thành công', 'NFT đã được cập nhật thành công', [
            {
              text: 'Xem NFT',
              onPress: () =>
                navigation.navigate('NoBottomTab', {screen: 'Profile'}),
            },
            {text: 'Đóng', style: 'cancel'},
          ]);
        } else {
          Alert.alert('Thành công', 'NFT đã được cập nhật thành công', [
            {
              text: 'Xem NFT',
              onPress: () =>
                navigation.navigate('NoBottomTab', {screen: 'Profile'}),
            },
            {text: 'Đóng', style: 'cancel'},
          ]);
        }
      } else {
        // Create mode
        showMessage({
          message: 'Đang tạo NFT...',
          type: 'info',
          duration: 2000,
        });

        const result = await createProductRequest(formData);

        if (!result?.data?.tokenURI) {
          throw new Error(ERROR_MESSAGES.INVALID_TOKEN_URI);
        }

        await NFTService.mintToken(walletProvider, result.data.tokenURI);

        Alert.alert('Thành công!', 'NFT của bạn đã được tạo thành công', [
          {
            text: 'Xem NFT',
            onPress: () =>
              navigation.navigate('NoBottomTab', {screen: 'Profile'}),
          },
          {
            text: 'Tạo NFT mới',
            onPress: () => {
              setSelectedImage(null);
              setProperties([]);
              setValue('name', '');
              setValue('description', '');
              setValue('externalLink', '');
              setValue('supply', '');
              setValue('blockchain', '');
              setValue('freezeMetadata', false);
              setValue('price', '');
            },
            style: 'cancel',
          },
        ]);
      }
    } catch (error) {
      console.error('Submit Error:', error);
      Alert.alert('Lỗi', error.message || ERROR_MESSAGES.UNKNOWN_ERROR, [
        {text: 'Đóng'},
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={Colors.background}
        barStyle="light-content"
        translucent={false}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        scrollEnabled={!isProcessing}>
        <View style={styles.content}>
          {/* Upload Section */}
          <View style={styles.uploadSection}>
            {selectedImage ? (
              <View style={styles.imagePreviewContainer}>
                <TouchableOpacity
                  style={styles.removeImageButton}
                  onPress={() => setSelectedImage(null)}
                  disabled={isProcessing}>
                  <CloseIcon />
                </TouchableOpacity>
                <View style={styles.imageWrapper}>
                  <FastImage
                    source={{uri: selectedImage.uri}}
                    style={styles.previewImage}
                    resizeMode="cover"
                  />
                  <View style={styles.previewImageWrapper}>
                    <Text
                      style={[
                        styles.uploadedImageText,
                        {marginBottom: 0, marginTop: scale(10)},
                      ]}>
                      {selectedImage.fileName}
                    </Text>
                    {selectedImage.fileSize && (
                      <Text style={styles.uploadedImageSize}>
                        {(selectedImage.fileSize / 1024 / 1024).toFixed(2)} MB
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            ) : (
              <>
                <View style={styles.uploadIcon}>
                  <CloudIcon />
                </View>
                <Text style={styles.uploadTitle}>Drag & drop file here</Text>
                <Text style={styles.uploadSubtitle}>or click to browse</Text>
                <View style={styles.supportedFormats}>
                  <Text style={styles.supportedFormatsText}>
                    Supported formats: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV
                  </Text>
                </View>
                <Button.Main
                  title="Choose File"
                  useGradient
                  onPress={handleImagePicker}
                  gradientColors={[Colors.secondary, Colors.primary]}
                  disabled={isProcessing}
                />
              </>
            )}
          </View>

          {/* Details Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={commonStyles.title}>// DETAILS</Text>
            </View>

            <View style={styles.formGroup}>
              <Controller
                control={control}
                name="name"
                rules={VALIDATION_RULES.name}
                render={({field: {value, onChange, onBlur}}) => (
                  <Input
                    label="Name"
                    labelStyle={styles.label}
                    placeholder="Enter item name"
                    placeholderTextColor={Colors.textGray}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={!!errors.name}
                    errorMessage={errors.name?.message}
                    containerStyle={styles.inputContainer}
                    editable={!isProcessing}
                  />
                )}
              />
              <Text style={styles.hint}>
                This will be displayed as the title of your NFT
              </Text>
            </View>

            <View style={styles.formGroup}>
              <Controller
                control={control}
                name="externalLink"
                rules={VALIDATION_RULES.externalLink}
                render={({field: {value, onChange, onBlur}}) => (
                  <Input
                    label="External Link"
                    labelStyle={styles.label}
                    placeholder="https://yoursite.io/item/123"
                    placeholderTextColor={Colors.textGray}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={!!errors.externalLink}
                    errorMessage={errors.externalLink?.message}
                    containerStyle={styles.inputContainer}
                    editable={!isProcessing}
                  />
                )}
              />
              <Text style={styles.hint}>
                Link to your website, portfolio, or social media
              </Text>
            </View>

            <View style={styles.formGroup}>
              <Controller
                control={control}
                name="description"
                rules={VALIDATION_RULES.description}
                render={({field: {value, onChange, onBlur}}) => (
                  <Input
                    label="Description"
                    labelStyle={styles.label}
                    placeholder="Provide a detailed description of your item"
                    placeholderTextColor={Colors.textGray}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    editable={!isProcessing}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    error={!!errors.description}
                    errorMessage={errors.description?.message}
                    containerStyle={[styles.textArea, styles.inputContainer]}
                  />
                )}
              />
              <Text style={styles.hint}>
                The description will be included on the item's detail page
              </Text>
            </View>
          </View>

          {/* Properties Section */}
          <View style={[styles.section, {marginBottom: scale(30)}]}>
            <View style={styles.sectionHeader}>
              <Text style={commonStyles.title}>// PROPERTIES</Text>
            </View>

            {properties.map(property => (
              <View key={property.id} style={styles.propertyRow}>
                <Input
                  placeholder="Type"
                  placeholderTextColor={Colors.textGray}
                  value={property.type}
                  onChangeText={text =>
                    handlePropertyChange(property.id, 'type', text)
                  }
                  containerStyle={[styles.inputContainer, styles.propertyInput]}
                  inputStyle={styles.input}
                  editable={!isProcessing}
                />
                <Input
                  placeholder="Name"
                  placeholderTextColor={Colors.textGray}
                  value={property.name}
                  onChangeText={text =>
                    handlePropertyChange(property.id, 'name', text)
                  }
                  containerStyle={[styles.inputContainer, styles.propertyInput]}
                  inputStyle={styles.input}
                  editable={!isProcessing}
                />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveProperty(property.id)}
                  disabled={isProcessing}>
                  <CloseIcon />
                </TouchableOpacity>
              </View>
            ))}

            <Button.Main
              title="ADD PROPERTY"
              iconLeft={<PlusIcon style={{width: scale(20)}} />}
              onPress={handleAddProperty}
              useGradient
              gradientColors={[Colors.secondary, Colors.primary]}
              disabled={isProcessing}
            />
          </View>

          {/* Supply & Blockchain Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={commonStyles.title}>// SUPPLY & BLOCKCHAIN</Text>
            </View>

            <View style={styles.formGroup}>
              <Controller
                control={control}
                name="supply"
                rules={VALIDATION_RULES.supply}
                render={({field: {value, onChange, onBlur}}) => (
                  <Input
                    label="Supply"
                    labelStyle={styles.label}
                    placeholder="1"
                    placeholderTextColor={Colors.textGray}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    containerStyle={styles.inputContainer}
                    keyboardType="numeric"
                    editable={!isProcessing}
                    error={!!errors.supply}
                    errorMessage={errors.supply?.message}
                  />
                )}
              />
              <Text style={styles.hint}>
                The number of items that can be minted
              </Text>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Blockchain</Text>

              <Controller
                control={control}
                name="blockchain"
                rules={VALIDATION_RULES.blockchain}
                render={({field: {value, onChange}}) => (
                  <View style={{position: 'relative'}}>
                    <TouchableOpacity
                      style={[
                        styles.dropdownButton,
                        errors.blockchain && {borderColor: Colors.redColor},
                      ]}
                      onPress={() =>
                        setShowBlockchainOptions(!showBlockchainOptions)
                      }
                      disabled={isProcessing}>
                      <Text
                        style={[
                          styles.dropdownText,
                          !value && {color: Colors.textGray},
                        ]}>
                        {value || 'Select network'}
                      </Text>
                      <Icon
                        name={
                          showBlockchainOptions ? 'chevron-up' : 'chevron-down'
                        }
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
                              value === option.value &&
                                styles.dropdownItemActive,
                            ]}
                            onPress={() => {
                              onChange(option.value);
                              setShowBlockchainOptions(false);
                            }}>
                            <View>{option.icon}</View>
                            <Text
                              style={[
                                styles.dropdownItemText,
                                value === option.value &&
                                  styles.dropdownItemTextActive,
                              ]}>
                              {option.label}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </View>
                )}
              />

              {errors.blockchain && (
                <Text style={styles.errorText}>
                  {errors.blockchain.message}
                </Text>
              )}

              <Text style={styles.hint}>
                Choose the blockchain to mint your NFT
              </Text>
            </View>

            <View style={styles.formGroup}>
              <Controller
                control={control}
                name="freezeMetadata"
                render={({field: {value, onChange}}) => (
                  <View style={styles.switchRow}>
                    <View style={styles.switchLabel}>
                      <Text style={styles.label}>Freeze Metadata</Text>
                      <Text style={styles.hint}>
                        Prevent metadata from being changed after minting
                      </Text>
                    </View>
                    <Switch
                      value={value}
                      onValueChange={onChange}
                      trackColor={{false: '#3e3e3e', true: '#01C5BA'}}
                      thumbColor={value ? '#fff' : '#f4f3f4'}
                      disabled={isProcessing}
                    />
                  </View>
                )}
              />
            </View>

            {watch('freezeMetadata') && (
              <View style={styles.formGroup}>
                <Controller
                  control={control}
                  name="price"
                  rules={VALIDATION_RULES.price}
                  render={({field: {value, onChange, onBlur}}) => (
                    <Input
                      label="Price (ETH)"
                      labelStyle={styles.label}
                      placeholder="0.00"
                      placeholderTextColor={Colors.textGray}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      containerStyle={styles.inputContainer}
                      inputStyle={styles.input}
                      keyboardType="decimal-pad"
                      editable={!isProcessing}
                      error={!!errors.price}
                      errorMessage={errors.price?.message}
                    />
                  )}
                />
                <Text style={styles.hint}>
                  Set the price for your NFT when Freeze Metadata is enabled
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {!keyboardVisible && (
        <View style={styles.buttonContainer}>
          <Button.Main
            title={
              isProcessing
                ? 'PROCESSING...'
                : isEditMode
                ? 'UPDATE ITEM'
                : 'CREATE ITEM'
            }
            useGradient
            gradientColors={[Colors.secondary, Colors.primary]}
            onPress={handleSubmit(onSubmit)}
            disabled={isProcessing}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default CreateUpdateNFTScreen;
