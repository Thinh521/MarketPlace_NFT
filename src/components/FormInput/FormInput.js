import React from 'react';
import {Controller} from 'react-hook-form';
import {Input} from '../ui/Input';

export const FormInput = ({control, name, rules, ...rest}) => (
  <Controller
    control={control}
    name={name}
    rules={rules}
    render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
      <Input
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}
        error={!!error}
        errorMessage={error?.message}
        {...rest}
      />
    )}
  />
);
