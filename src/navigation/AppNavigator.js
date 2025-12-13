import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import BottomTab from './BottomTab';
import NoBottomTab from './NoBottomTab';
import OnboardingScreen from '../screens/Onboarding';

const RootStack = createNativeStackNavigator();

const AppNavigator = ({initialRouteName = 'BottomTab'}) => {
  return (
    <RootStack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{headerShown: false}}>
      <RootStack.Screen name="Onboarding" component={OnboardingScreen} />
      <RootStack.Screen name="BottomTab" component={BottomTab} />
      <RootStack.Screen name="NoBottomTab" component={NoBottomTab} />
    </RootStack.Navigator>
  );
};

export default AppNavigator;
