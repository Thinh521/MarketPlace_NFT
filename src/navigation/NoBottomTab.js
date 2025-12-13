import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routerNoBottomTab from '../router/routerNoBottomTab';
import {getHeader} from './getHeader';

const Stack = createNativeStackNavigator();

export default function NoBottomTab() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
      }}>
      {routerNoBottomTab.map(({name, component, customHeader, options}) => (
        <Stack.Screen
          key={name}
          name={name}
          component={component}
          options={
            customHeader
              ? getHeader({
                  title: customHeader.title,
                  subTitle: customHeader.subTitle,
                  rightComponent: customHeader.rightComponent || null,
                })
              : options || {headerShown: false}
          }
        />
      ))}
    </Stack.Navigator>
  );
}
