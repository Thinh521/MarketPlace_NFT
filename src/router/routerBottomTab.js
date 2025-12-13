import {TouchableOpacity} from 'react-native';
import {
  ActivityIconTab,
  DiscoverIconTab,
  HomeIconTab,
  NewsIconTab,
  SettingLineIcon,
  UserLineIcon,
} from '../assets/icons/icons';
import {Colors} from '../theme/theme';
import HomeScreen from '../screens/Home';
import DiscoverScreen from '../screens/Discover';
import ActivityScreen from '../screens/Activity';
import NewsScreen from '../screens/News';
import ProfileScreen from '../screens/Profile';

export const getRouterBottomTab = navigation => [
  {
    name: 'Home',
    component: HomeScreen,
    label: 'Home',
    Icon: HomeIconTab,
    hasLayout: true,
    options: {
      headerShown: false,
      requiresAuth: false,
    },
  },
  {
    name: 'Discover',
    component: DiscoverScreen,
    label: 'Discover',
    Icon: DiscoverIconTab,
    hasLayout: true,
    options: {
      headerShown: false,
      requiresAuth: true,
    },
  },
  {
    name: 'Activity',
    component: ActivityScreen,
    label: 'Activity',
    Icon: ActivityIconTab,
    hasLayout: true,
    options: {
      headerShown: false,
      requiresAuth: true,
    },
  },
  {
    name: 'News',
    component: NewsScreen,
    label: 'News',
    Icon: NewsIconTab,
    hasLayout: true,
    options: {
      headerShown: false,
      requiresAuth: true,
    },
  },
  {
    name: 'Profile',
    component: ProfileScreen,
    label: 'Profile',
    Icon: UserLineIcon,
    hasLayout: true,
    options: () => ({
      headerShown: true,
      title: 'Profile',
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: Colors.background,
      },
      headerTitleStyle: {
        color: Colors.white,
      },
      headerRight: () => (
        <TouchableOpacity
          style={{paddingHorizontal: 12}}
          onPress={() =>
            navigation.navigate('NoBottomTab', {screen: 'Setting'})
          }>
          <SettingLineIcon width={22} height={22} />
        </TouchableOpacity>
      ),
      requiresAuth: true,
    }),
  },
];
