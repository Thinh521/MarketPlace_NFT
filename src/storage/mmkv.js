import {MMKV} from 'react-native-mmkv';

export const mmkv = new MMKV();

export const zustandStorage = {
  getItem: name => {
    try {
      const value = mmkv.getString(name);
      return value ? JSON.parse(value) : null;
    } catch (e) {
      console.warn('zustandStorage getItem error', e);
      return null;
    }
  },
  setItem: (name, value) => {
    try {
      mmkv.set(name, JSON.stringify(value));
    } catch (e) {
      console.warn('zustandStorage setItem error', e);
    }
  },
  removeItem: name => {
    try {
      mmkv.delete(name);
    } catch (e) {
      console.warn('zustandStorage removeItem error', e);
    }
  },
};
