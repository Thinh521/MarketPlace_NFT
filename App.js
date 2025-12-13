import React, {useEffect, useState} from 'react';
import FlashMessage from 'react-native-flash-message';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {AppKit} from '@reown/appkit-ethers-react-native';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import './src/config/AppKitSetup';
import AppNavigator from './src/navigation';
import SplashScreen from './src/screens/Splash';
import {storage} from './src/storage/storage';
import {getCurrentUserRequest} from './src/api/userProfileApi';
import {useAuthStore} from './src/stores/useAuthStore';

const queryClient = new QueryClient();

const preloadAuthData = async () => {
  const token = useAuthStore.getState().token;
  if (!token) return;

  try {
    const res = await getCurrentUserRequest();
    useAuthStore.getState().setUser(res.data);
  } catch (err) {
    useAuthStore.getState().clearAuth();
  }
};

export default function App() {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 3000));

        const completedOnboarding = storage.getBoolean(
          'hasCompletedOnboarding',
        );

        await preloadAuthData();

        setInitialRoute(completedOnboarding ? 'BottomTab' : 'Onboarding');
      } catch (error) {
        console.error('Lỗi init app:', error);
        setInitialRoute('Onboarding');
      }
    };

    initializeApp();
  }, []);

  if (!initialRoute) return <SplashScreen />;

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <NavigationContainer>
              <AppNavigator initialRouteName={initialRoute} />
              <FlashMessage position="top" />
              <AppKit />
            </NavigationContainer>
          </SafeAreaProvider>
        </QueryClientProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
