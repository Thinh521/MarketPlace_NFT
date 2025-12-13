import {API_BASE} from '@env';
import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {launchImageLibrary} from 'react-native-image-picker';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';
import {showMessage} from 'react-native-flash-message';
import FastImage from 'react-native-fast-image';

import {CloseIcon, CloudIcon} from '~/assets/icons/icons';

import {Input} from '~/components/ui/Input';
import {Button} from '~/components/ui/Button';

import {
  createProductCollectionRequest,
  updateProductCollectionRequest,
  deleteProductCollectionRequest,
} from '~/api/productCollectionApi';

import useKeyboardVisible from '~/hooks/useKeyboardVisible';
import {VALIDATION_RULES} from '~/validations/authValidations';

import {commonStyles} from '~/styles/common';
import {Colors} from '~/theme/theme';
import {scale} from '~/utils/scaling';
import styles from './ProductCollectionManager.styles';

// Constants
const ERROR_MESSAGES = {
  IMAGE_REQUIRED: 'Vui lòng chọn ảnh cho collection',
  CREATE_FAILED: 'Không thể tạo collection. Vui lòng thử lại',
  UPDATE_FAILED: 'Không thể cập nhật collection. Vui lòng thử lại',
  DELETE_FAILED: 'Không thể xóa collection. Vui lòng thử lại',
  NETWORK_ERROR: 'Lỗi kết nối mạng. Vui lòng kiểm tra internet',
  UNKNOWN_ERROR: 'Đã xảy ra lỗi không xác định. Vui lòng thử lại',
};

const ProductCollectionManagerScreen = () => {
  const navigation = useNavigation();
  const collection = useRoute().params?.collection;

  const isEditMode = !!collection?.id;
  const keyboardVisible = useKeyboardVisible();

  // State
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(
    collection?.image
      ? {
          uri: `${API_BASE}/api/upload/${collection.image}`,
          fileName: 'current_image.jpg',
        }
      : null,
  );

  // Form
  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm({
    defaultValues: {
      name: collection?.name || '',
      description: collection?.description || '',
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  // Image Picker
  const handleImagePicker = () => {
    const options = {
      mediaType: 'photo',
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

  // Handle Delete
  const handleDelete = () => {
    Alert.alert(
      'Xác nhận xóa',
      'Bạn có chắc chắn muốn xóa collection này? Hành động này không thể hoàn tác.',
      [
        {text: 'Hủy', style: 'cancel'},
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: async () => {
            setIsProcessing(true);
            try {
              showMessage({
                message: 'Đang xóa collection...',
                type: 'info',
                duration: 2000,
              });

              await deleteProductCollectionRequest(collection.id);

              showMessage({
                message: 'Xóa collection thành công',
                type: 'success',
              });

              navigation.goBack();
            } catch (error) {
              console.error('Delete Error:', error);
              Alert.alert(
                'Lỗi',
                error.message || ERROR_MESSAGES.DELETE_FAILED,
                [{text: 'Đóng'}],
              );
            } finally {
              setIsProcessing(false);
            }
          },
        },
      ],
    );
  };

  // Handle Submit
  const onSubmit = async data => {
    if (!selectedImage && !isEditMode) {
      Alert.alert('Lỗi', ERROR_MESSAGES.IMAGE_REQUIRED);
      return;
    }

    setIsProcessing(true);

    try {
      const formData = {
        name: data.name.trim(),
        description: data.description.trim(),
      };

      if (selectedImage && !selectedImage.uri.startsWith(API_BASE)) {
        formData.image = selectedImage;
      }

      if (isEditMode) {
        // Update mode
        formData.id = collection.id;

        showMessage({
          message: 'Đang cập nhật collection...',
          type: 'info',
          duration: 2000,
        });

        await updateProductCollectionRequest(formData);

        showMessage({
          message: 'Cập nhật collection thành công',
          type: 'success',
        });
      } else {
        // Create Mode
        showMessage({
          message: 'Đang tạo collection...',
          type: 'info',
          duration: 2000,
        });

        await createProductCollectionRequest(formData);

        Alert.alert('Thành công', 'Collection của bạn đã được tạo thành công', [
          {
            text: 'Xem Collection',
            onPress: () =>
              navigation.navigate('NoBottomTab', {
                screen: 'Profile',
              }),
          },
          {
            text: 'Tạo Collection mới',
            onPress: () => {
              setSelectedImage(null);
              setValue('name', '');
              setValue('description', '');
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
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              {isEditMode ? 'Edit Collection' : 'Create New Collection'}
            </Text>
            {isEditMode && (
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={handleDelete}
                disabled={isProcessing}>
                <CloseIcon color={Colors.redColor} />
              </TouchableOpacity>
            )}
          </View>

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
                    source={{
                      uri: selectedImage?.uri,
                    }}
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
                    Supported formats: JPG, PNG, GIF
                  </Text>
                </View>
                <Button.Main
                  title="Choose File"
                  useGradient
                  onPress={handleImagePicker}
                  style={styles.chooseFileButton}
                  textStyle={styles.chooseFileText}
                  gradientColors={['#016DB0', '#01FFCA']}
                  disabled={isProcessing}
                />
              </>
            )}
          </View>

          {/* Details Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={commonStyles.title}>// COLLECTION DETAILS</Text>
            </View>

            <View style={styles.formGroup}>
              <Controller
                control={control}
                name="name"
                rules={VALIDATION_RULES.name}
                render={({field: {value, onChange, onBlur}}) => (
                  <Input
                    label="Collection Name"
                    labelStyle={styles.label}
                    placeholder="Enter collection name"
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
                This will be displayed as the title of your collection
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
                    placeholder="Provide a detailed description of your collection"
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
                The description will be included on the collection's detail page
              </Text>
            </View>
          </View>

          {/* Info Section */}
          {isEditMode && (
            <View style={styles.infoSection}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Collection ID:</Text>
                <Text style={styles.infoValue}>{collection.id}</Text>
              </View>
              {collection.createdAt && (
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Created:</Text>
                  <Text style={styles.infoValue}>
                    {new Date(collection.createdAt).toLocaleDateString()}
                  </Text>
                </View>
              )}
              {collection.updatedAt && (
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Last Updated:</Text>
                  <Text style={styles.infoValue}>
                    {new Date(collection.updatedAt).toLocaleDateString()}
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>

      {!keyboardVisible && (
        <View style={styles.buttonContainer}>
          <Button.Main
            title={
              isProcessing
                ? 'PROCESSING...'
                : isEditMode
                ? 'UPDATE COLLECTION'
                : 'CREATE COLLECTION'
            }
            textStyle={styles.chooseFileText}
            style={{borderRadius: 0}}
            useGradient
            gradientColors={['#016DB0', '#01FFCA']}
            onPress={handleSubmit(onSubmit)}
            disabled={isProcessing}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default ProductCollectionManagerScreen;
