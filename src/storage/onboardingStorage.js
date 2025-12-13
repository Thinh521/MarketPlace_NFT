import {storage} from './storage';

const ONBOARDING_KEY = 'hasCompletedOnboarding';

export const setOnboarding = value => {
  storage.set(ONBOARDING_KEY, value);
};

export const getOnboarding = () => {
  return storage.getBoolean(ONBOARDING_KEY);
};

export const resetOnboarding = () => {
  storage.delete(ONBOARDING_KEY);
};
