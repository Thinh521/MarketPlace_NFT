import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getRouterBottomTab} from '../router/routerBottomTab';
import CustomTabBar from '../components/CustomNavigation/CustomTabBar';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/core';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const routerBottomTab = getRouterBottomTab(navigation);

  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} bottomInset={insets.bottom} />}
      screenOptions={{headerShown: true}}>
      {routerBottomTab.map(
        ({
          name,
          component,
          label,
          Icon,
          isCenterButton = false,
          hasLayout = false,
          options = {},
        }) => (
          <Tab.Screen
            key={name}
            name={name}
            component={component}
            options={() => {
              const finalOptions =
                typeof options === 'function' ? options() : options;

              return {
                ...finalOptions,
                tabBarLabel: label || '',
                tabBarCustomIcon: Icon,
                isCenterButton,
              };
            }}
          />
        ),
      )}
    </Tab.Navigator>
  );
};

export default BottomTab;
