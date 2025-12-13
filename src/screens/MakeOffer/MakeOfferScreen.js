import {IPFS_GATEWAY} from '@env';
import React, {useState, useMemo, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Controller, useForm} from 'react-hook-form';
import Icon from 'react-native-vector-icons/Feather';
import {showMessage} from 'react-native-flash-message';
import {SafeAreaView} from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Input} from '~/components/ui/Input';
import {Button} from '~/components/ui/Button';
import AuctionReviewBottomSheet from './components/AuctionReviewBottomSheet';

import {AuctionService} from '~/contracts/AuctionService';

import {formatEth, formatUsd} from '~/utils/price';
import {parseBlockchainError} from '~/utils/errors/blockchainErrors';

import {VALIDATION_RULES} from '~/validations/authValidations';

import {Colors} from '~/theme/theme';
import styles from './MakeOffer.styles';

const MakeOfferScreen = ({route}) => {
  const {auction, walletProvider, address} = route.params ?? {};
  const bottomSheetRef = useRef(null);

  const [tempDate, setTempDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [isProcessing, setIsProcessing] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePickerMode, setDatePickerMode] = useState('date');
  const [isPickingStartDate, setIsPickingStartDate] = useState(true);
  const [endDate, setEndDate] = useState(
    new Date(Date.now() + 24 * 3600 * 1000),
  );

  const snapPoints = useMemo(() => ['70%'], []);

  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm({
    defaultValues: {
      reservePrice: '',
      minIncrement: '',
    },
    mode: 'onSubmit',
  });

  const reservePrice = watch('reservePrice');
  const ethPrice = parseFloat(reservePrice || 0);
  const usdPrice = (ethPrice * 2500).toFixed(2);

  // Calculate auction duration in seconds
  const auctionDurationSeconds = useMemo(() => {
    return Math.floor((endDate.getTime() - startDate.getTime()) / 1000);
  }, [startDate, endDate]);

  // Handle date change from date picker
  const handleDateChange = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }

    if (event.type === 'dismissed' || !selectedDate) {
      return;
    }

    if (datePickerMode === 'date') {
      setTempDate(selectedDate);
      setDatePickerMode('time');
      if (Platform.OS === 'android') {
        setTimeout(() => setShowDatePicker(true), 100);
      }
    } else {
      const finalDate = new Date(tempDate);
      finalDate.setHours(selectedDate.getHours());
      finalDate.setMinutes(selectedDate.getMinutes());

      if (isPickingStartDate) {
        if (finalDate < new Date()) {
          Alert.alert('Invalid Date', 'Start date cannot be in the past');
          return;
        }
        setStartDate(finalDate);
        if (endDate <= finalDate) {
          setEndDate(new Date(finalDate.getTime() + 3600 * 1000));
        }
      } else {
        if (finalDate <= startDate) {
          Alert.alert('Invalid Date', 'End date must be after start date');
          return;
        }
        setEndDate(finalDate);
      }

      if (Platform.OS === 'ios') {
        setShowDatePicker(false);
      }
      setDatePickerMode('date');
    }
  };

  // Open date picker
  const openDatePicker = isStart => {
    setIsPickingStartDate(isStart);
    setTempDate(isStart ? startDate : endDate);
    setDatePickerMode('date');
    setShowDatePicker(true);
  };

  // Format date and time
  const formatDateTime = date => {
    return {
      date: date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
  };

  // Handle create auction
  const handleCreateAuction = async () => {
    if (auctionDurationSeconds < 300) {
      Alert.alert('Invalid Duration', 'Auction must last at least 5 minutes');
      return;
    }

    if (auctionDurationSeconds > 30 * 24 * 60 * 60) {
      Alert.alert('Invalid Duration', 'Auction cannot exceed 30 days');
      return;
    }

    setIsProcessing(true);

    try {
      await AuctionService.createAuction({
        walletProvider,
        ownerAddress: address,
        tokenId: auction.tokenId,
        reservePrice: reservePrice,
        auctionDurationSeconds,
        minIncrement: Number(watch('minIncrement') || 0),
      });

      bottomSheetRef.current?.close();

      showMessage({
        message: 'Auction created successfully',
        type: 'success',
        duration: 5000,
      });
    } catch (error) {
      console.error('Create Auction Error:', error);
      showMessage({
        message: parseBlockchainError(error),
        type: 'danger',
        duration: 5000,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const onSubmit = () => {
    bottomSheetRef.current?.expand();
  };

  const startDateTime = formatDateTime(startDate);
  const endDateTime = formatDateTime(endDate);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.background} barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* NFT Preview */}
          <View style={styles.reviewCard}>
            <FastImage
              source={{uri: `${IPFS_GATEWAY}${auction?.image}`}}
              style={styles.reviewImage}
              resizeMode="cover"
            />
            <View style={styles.reviewInfo}>
              <Text style={styles.reviewCollectionName}>Metafacely NFT</Text>
              <Text style={styles.reviewProductName} numberOfLines={2}>
                {auction?.name}
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
                  {formatEth(auction?.price)} ETH
                </Text>
              </View>
              <Text style={styles.reviewUsdPrice}>
                {formatUsd(auction?.price)}
              </Text>
            </View>
          </View>

          {/* Reserve Price */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Reserve Price</Text>
            <Text style={styles.sectionSubtitle}>
              Minimum price to start the auction
            </Text>

            <Controller
              control={control}
              name="reservePrice"
              rules={VALIDATION_RULES.reservePrice}
              render={({field: {value, onChange, onBlur}}) => (
                <View style={styles.priceInputContainer}>
                  <Input
                    placeholder="0.00"
                    placeholderTextColor={Colors.textGray}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    leftIcon={
                      <MaterialIcon name="ethereum" size={24} color="#627EEA" />
                    }
                    keyboardType="decimal-pad"
                    style={styles.priceInput}
                    error={!!errors.reservePrice}
                    errorMessage={errors.reservePrice?.message}
                  />
                  <Text style={styles.ethLabel}>ETH</Text>
                  {ethPrice > 0 && (
                    <Text style={styles.usdPrice}>≈ ${usdPrice} USD</Text>
                  )}
                </View>
              )}
            />
          </View>

          {/* Duration */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Auction Duration</Text>
            <Text style={styles.sectionSubtitle}>
              Duration: {Math.floor(auctionDurationSeconds / 86400)} days{' '}
              {Math.floor((auctionDurationSeconds % 86400) / 3600)} hours
            </Text>

            {/* Start Date */}
            <TouchableOpacity
              style={styles.datePickerButton}
              onPress={() => openDatePicker(true)}>
              <View style={styles.datePickerContent}>
                <Icon name="calendar" size={20} color={Colors.primary} />
                <View style={styles.dateTextContainer}>
                  <Text style={styles.dateLabel}>Start Date & Time</Text>
                  <Text style={styles.dateValue}>
                    {startDateTime.date} • {startDateTime.time}
                  </Text>
                </View>
              </View>
              <Icon name="edit-2" size={18} color={Colors.primary} />
            </TouchableOpacity>

            {/* End Date */}
            <TouchableOpacity
              style={styles.datePickerButton}
              onPress={() => openDatePicker(false)}>
              <View style={styles.datePickerContent}>
                <Icon name="calendar" size={20} color={Colors.primary} />
                <View style={styles.dateTextContainer}>
                  <Text style={styles.dateLabel}>End Date & Time</Text>
                  <Text style={styles.dateValue}>
                    {endDateTime.date} • {endDateTime.time}
                  </Text>
                </View>
              </View>
              <Icon name="edit-2" size={18} color={Colors.primary} />
            </TouchableOpacity>
          </View>

          {/* Minimum Bid Increment */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Minimum Bid Increment</Text>
            <Text style={styles.sectionSubtitle}>
              Each bid must exceed the previous by this percentage
            </Text>

            <Controller
              control={control}
              name="minIncrement"
              rules={{
                required: 'Minimum increment is required',
                validate: value => {
                  const number = parseFloat(value);
                  if (isNaN(number) || number <= 0) {
                    return 'Increment must be greater than 0';
                  }
                  if (number > 100) {
                    return 'Increment cannot exceed 100%';
                  }
                  return true;
                },
              }}
              render={({field: {value, onChange, onBlur}}) => (
                <View style={styles.priceInputContainer}>
                  <Input
                    placeholder="Enter % increment"
                    placeholderTextColor={Colors.textGray}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="decimal-pad"
                    style={styles.priceInput}
                    error={!!errors.minIncrement}
                    errorMessage={errors.minIncrement?.message}
                  />
                  <Text style={styles.ethLabel}>%</Text>
                </View>
              )}
            />
          </View>

          {/* Info Box */}
          <View style={styles.infoBox}>
            <Icon name="info" size={20} color={Colors.primary} />
            <Text style={styles.infoText}>
              Once the auction starts, you cannot cancel if there are active
              bids. The highest bidder wins when the auction ends.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Action Button */}
      <View style={styles.footer}>
        <Button.Main
          title="Create Auction"
          onPress={handleSubmit(onSubmit)}
          disabled={isProcessing}
          useGradient
          gradientColors={[Colors.secondary, Colors.primary]}
        />
      </View>

      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={tempDate}
          mode={datePickerMode}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          minimumDate={isPickingStartDate ? new Date() : startDate}
          onChange={handleDateChange}
        />
      )}

      <AuctionReviewBottomSheet
        bottomSheetRef={bottomSheetRef}
        snapPoints={snapPoints}
        auction={auction}
        reservePrice={reservePrice}
        startDate={startDate}
        endDate={endDate}
        auctionDurationSeconds={auctionDurationSeconds}
        minIncrement={watch('minIncrement')}
        isProcessing={isProcessing}
        handleCreateAuction={handleCreateAuction}
      />
    </SafeAreaView>
  );
};

export default MakeOfferScreen;
