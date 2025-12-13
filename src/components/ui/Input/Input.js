import React, {useState, forwardRef, useImperativeHandle, useRef} from 'react';
import {TextInput, TouchableOpacity, View, Text} from 'react-native';

import {EyeIcon, EyeOffIcon} from '~/assets/icons/icons';

import {Colors} from '~/theme/theme';
import styles from './Input.styles';

const Input = forwardRef(
  (
    {
      label,
      labelStyle = {},
      placeholder,
      placeholderTextColor = Colors.textGray,
      containerStyle = {},
      inputStyle = {},
      style = {},
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      disabled = false,
      readonly = false,
      value = '',
      onChangeText,
      onFocus,
      onBlur,
      onClear,
      onSubmitEditing,
      error = false,
      errorMessage = '',
      isPassword = false,
      required = false,
      multiline = false,
      numberOfLines = 1,
      showCharacterCount = false,
      autoFocus = false,
      keyboardType = 'default',
      testID,
      returnKeyType = 'done',
      accessibilityLabel,
      clearButtonMode = 'never',
      showClearButton = false,
      autoCapitalize = 'none',
      ...rest
    },
    ref,
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef(null);

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
      blur: () => inputRef.current?.blur(),
      clear: () => inputRef.current?.clear(),
      isFocused: () => inputRef.current?.isFocused(),
    }));

    const togglePasswordVisibility = () => setIsPasswordVisible(prev => !prev);

    const handleFocus = e => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = e => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const handleClear = () => {
      onChangeText?.('');
      onClear?.();
    };

    const showRightContent =
      isPassword || RightIcon || (showClearButton && value);

    const getContainerStyles = () => {
      const base = [styles.inputContainer, containerStyle];
      if (isFocused) base.push(styles.focusedContainer);
      if (disabled || readonly) base.push(styles.disabledContainer);
      if (error) base.push(styles.errorContainer);
      return base;
    };

    const getInputStyles = () => [
      styles.input,
      multiline && styles.multilineInput,
      inputStyle,
    ];

    return (
      <View style={[styles.inputGroup, style]} testID={testID}>
        {label && (
          <View style={styles.labelContainer}>
            <Text style={[styles.label, labelStyle]}>
              {label}
              {required && <Text style={{color: 'red'}}> *</Text>}
            </Text>
          </View>
        )}

        <View
          style={getContainerStyles()}
          pointerEvents={disabled ? 'none' : 'auto'}>
          {/* Left icon */}
          {LeftIcon && (
            <View style={styles.leftIconContainer}>
              {typeof LeftIcon === 'function' ? (
                <LeftIcon
                  style={[styles.leftIcon, isFocused && styles.focusedIcon]}
                />
              ) : (
                React.cloneElement(LeftIcon, {
                  style: [
                    styles.leftIcon,
                    isFocused && styles.focusedIcon,
                    LeftIcon.props?.style,
                  ],
                })
              )}
            </View>
          )}

          {/* Input */}
          <TextInput
            ref={inputRef}
            style={getInputStyles()}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            autoCapitalize={autoCapitalize}
            keyboardType={keyboardType}
            editable={!disabled}
            selectTextOnFocus={readonly ? true : undefined}
            secureTextEntry={isPassword && !isPasswordVisible}
            value={value}
            onChangeText={onChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onSubmitEditing={onSubmitEditing}
            multiline={multiline}
            numberOfLines={numberOfLines}
            autoFocus={autoFocus}
            returnKeyType={returnKeyType}
            accessibilityLabel={accessibilityLabel || label}
            clearButtonMode={clearButtonMode}
            {...rest}
          />

          {/* Right content */}
          {showRightContent && (
            <View style={styles.rightContent}>
              {showClearButton &&
                value &&
                !isPassword &&
                !disabled &&
                !readonly && (
                  <TouchableOpacity
                    onPress={handleClear}
                    style={styles.clearButton}
                    hitSlop={10}>
                    <Text style={styles.clearButtonText}>×</Text>
                  </TouchableOpacity>
                )}

              {isPassword && !disabled && !readonly && (
                <TouchableOpacity
                  onPress={togglePasswordVisibility}
                  style={styles.eyeButton}
                  hitSlop={10}
                  accessibilityLabel={
                    isPasswordVisible ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'
                  }>
                  {isPasswordVisible ? (
                    <EyeIcon style={styles.eyeIcon} />
                  ) : (
                    <EyeOffIcon style={styles.eyeIcon} />
                  )}
                </TouchableOpacity>
              )}

              {RightIcon && !isPassword && (
                <View style={styles.rightIconContainer}>
                  <RightIcon
                    style={[
                      styles.rightIcon,
                      styles.defaultIcon,
                      isFocused && styles.focusedIcon,
                    ]}
                  />
                </View>
              )}
            </View>
          )}
        </View>

        {error && errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}

        {showCharacterCount && (
          <Text
            style={[
              styles.charCount,
              rest.maxLength &&
                value?.length > rest.maxLength &&
                styles.charCountExceeded,
            ]}>
            {value?.length || 0}
            {rest.maxLength ? `/${rest.maxLength}` : ''}
          </Text>
        )}
      </View>
    );
  },
);

Input.displayName = 'Input';
export default Input;
