import {API_BASE} from '@env';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Controller, useForm} from 'react-hook-form';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import {launchImageLibrary} from 'react-native-image-picker';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import Images from '~/assets/images/images';
import {CameraIcon} from '~/assets/icons/icons';

import {Input} from '~/components/ui/Input';
import {Button} from '~/components/ui/Button';

import {useAuthStore} from '~/stores/useAuthStore';
import {updateUserProfileRequest} from '~/api/userProfileApi';

import useKeyboardVisible from '~/hooks/useKeyboardVisible';
import {VALIDATION_RULES} from '~/validations/authValidations';

import {formatAddress} from '~/utils/formatAddress';

import {Colors} from '~/theme/theme';
import styles from './UpdateProfile.styles';

const UpdateProfileScreen = () => {
  const navigation = useNavigation();
  const keyboardVisible = useKeyboardVisible();
  const me = useAuthStore(state => state.user);
  const setUser = useAuthStore(state => state.setUser);

  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors, isDirty},
  } = useForm({
    defaultValues: {
      userName: '',
      fullName: '',
      bio: '',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (me) {
      setValue('userName', me.userName || '');
      setValue('fullName', me.fullName || '');
      setValue('bio', me.bio || '');
    }
  }, [me, setValue]);

  const handleImagePicker = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      maxWidth: 1000,
      maxHeight: 1000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        return;
      }

      if (response.error) {
        Alert.alert(
          'Lỗi chọn ảnh',
          'Không thể chọn ảnh. Vui lòng thử lại hoặc kiểm tra quyền truy cập.',
        );
        return;
      }

      if (response.assets && response.assets[0]) {
        setSelectedAvatar(response.assets[0]);
      }
    });
  };

  const onSubmit = async data => {
    if (!isDirty && !selectedAvatar) {
      showMessage({
        message: 'Không có thay đổi',
        description: 'Vui lòng thay đổi thông tin trước khi cập nhật',
        type: 'warning',
      });
      return;
    }

    setIsUpdating(true);

    try {
      const updateData = {
        userName: data.userName.trim(),
        fullName: data.fullName.trim(),
        bio: data.bio.trim(),
      };

      if (selectedAvatar) {
        updateData.avatar = selectedAvatar;
      }

      const res = await updateUserProfileRequest(updateData);

      setUser(res.data);

      showMessage({
        message: 'Cập nhật thành công',
        description: 'Thông tin của bạn đã được cập nhật',
        type: 'success',
        duration: 3000,
      });
    } catch (error) {
      console.error('Update Profile Error:', error);

      let errorMessage = 'Không thể cập nhật profile';

      if (error.response) {
        const status = error.response.status;
        const errorData = error.response.data;

        if (status === 401) {
          errorMessage = 'Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại';
        } else if (status === 400) {
          errorMessage = errorData?.message || 'Dữ liệu không hợp lệ';
        } else if (status === 413) {
          errorMessage = 'Ảnh quá lớn. Vui lòng chọn ảnh nhỏ hơn';
        } else if (status >= 500) {
          errorMessage = 'Lỗi server. Vui lòng thử lại sau';
        } else {
          errorMessage = errorData?.message || 'Không thể cập nhật profile';
        }
      } else if (error.request) {
        errorMessage = 'Lỗi kết nối mạng. Vui lòng kiểm tra internet';
      }

      Alert.alert('Lỗi cập nhật', errorMessage);
    } finally {
      setIsUpdating(false);
    }
  };

  const getAvatarSource = () => {
    if (selectedAvatar) {
      return {uri: selectedAvatar.uri};
    }
    if (me?.avatar) {
      return {uri: `${API_BASE}/api/upload/${me.avatar}`};
    }
    return Images.avatar;
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
          scrollEnabled={!isUpdating}>
          {/* Avatar Section */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarContainer}>
              <FastImage
                source={getAvatarSource()}
                style={styles.avatar}
                resizeMode="cover"
              />
              <TouchableOpacity
                style={styles.editAvatarButton}
                onPress={handleImagePicker}
                disabled={isUpdating}>
                <CameraIcon />
              </TouchableOpacity>
            </View>

            {selectedAvatar && (
              <TouchableOpacity
                style={styles.removeAvatarButton}
                onPress={() => setSelectedAvatar(null)}
                disabled={isUpdating}>
                <Text style={styles.removeAvatarText}>Remove new photo</Text>
              </TouchableOpacity>
            )}

            <Text style={styles.avatarHint}>
              Click camera icon to update your profile picture
            </Text>
          </View>

          {/* Form Section */}
          <View style={styles.formSection}>
            {/* Username */}
            <View style={styles.formGroup}>
              <Controller
                control={control}
                name="userName"
                rules={VALIDATION_RULES.userName}
                render={({field: {value, onChange, onBlur}}) => (
                  <Input
                    label="Username"
                    labelStyle={styles.label}
                    placeholder="Enter your username"
                    placeholderTextColor={Colors.textGray}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={!!errors.userName}
                    errorMessage={errors.userName?.message}
                    containerStyle={styles.inputContainer}
                    editable={!isUpdating}
                  />
                )}
              />
            </View>

            {/* Full Name */}
            <View style={styles.formGroup}>
              <Controller
                control={control}
                name="fullName"
                rules={VALIDATION_RULES.fullName}
                render={({field: {value, onChange, onBlur}}) => (
                  <Input
                    label="Full Name"
                    labelStyle={styles.label}
                    placeholder="Enter your full name"
                    placeholderTextColor={Colors.textGray}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={!!errors.fullName}
                    errorMessage={errors.fullName?.message}
                    containerStyle={styles.inputContainer}
                    editable={!isUpdating}
                    iconLeft={
                      <Icon name="user" size={18} color={Colors.textGray} />
                    }
                  />
                )}
              />
            </View>

            {/* Bio */}
            <View style={styles.formGroup}>
              <Controller
                control={control}
                name="bio"
                rules={VALIDATION_RULES.bio}
                render={({field: {value, onChange, onBlur}}) => (
                  <Input
                    label="Bio"
                    labelStyle={styles.label}
                    placeholder="Tell us about yourself..."
                    placeholderTextColor={Colors.textGray}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={!!errors.bio}
                    errorMessage={errors.bio?.message}
                    containerStyle={[styles.inputContainer, styles.textArea]}
                    editable={!isUpdating}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                  />
                )}
              />
              <Text style={styles.characterCount}>
                {control._formValues.bio?.length || 0}/500
              </Text>
            </View>

            {/* Wallet Address (Read Only) */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Wallet Address</Text>
              <View style={styles.readOnlyContainer}>
                <Icon
                  name="lock"
                  size={18}
                  color={Colors.textGray}
                  style={styles.lockIcon}
                />
                <Text style={styles.readOnlyText} numberOfLines={1}>
                  {formatAddress(me?.addressWallet || 'Not connected')}
                </Text>
              </View>
              <Text style={styles.hint}>Wallet address cannot be changed</Text>
            </View>
          </View>

          {/* Info Box */}
          <View style={styles.infoBox}>
            <MaterialIcon name="information" size={20} color={Colors.primary} />
            <Text style={styles.infoText}>
              Your profile information will be publicly visible on the
              marketplace
            </Text>
          </View>
        </ScrollView>

        {/* Action Buttons */}
        {!keyboardVisible && (
          <View style={styles.buttonContainer}>
            <Button.Main
              title="Cancel"
              onPress={() => navigation.goBack()}
              style={styles.cancelButton}
              textStyle={styles.cancelButtonText}
              disabled={isUpdating}
            />
            <Button.Main
              title={isUpdating ? 'UPDATING...' : 'SAVE CHANGES'}
              onPress={handleSubmit(onSubmit)}
              style={styles.saveButton}
              textStyle={styles.saveButtonText}
              disabled={isUpdating}
            />
          </View>
        )}

        {/* Loading Overlay */}
        {isUpdating && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text style={styles.loadingText}>Đang cập nhật...</Text>
          </View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default UpdateProfileScreen;
