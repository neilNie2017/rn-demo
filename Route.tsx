import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import Ionicons from '@react-native-vector-icons/ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePages from './src/pages/home';
import ProfileScreen from './src/pages/profile';
import HomeDetails from './src/pages/home/Detail';
import TodoPages from './src/pages/todo';
import Container from './src/layout/Container';
import LoginScreen from './src/pages/login';

const IconMap: any = {
  Home: {
    active: <Ionicons name="home" size={24} color={'#1677FF'} />,
    inActive: <Ionicons name="home-outline" size={24} color={'#000'} />,
  },
  Todo: {
    active: (
      <Ionicons name="notifications-circle" size={24} color={'#1677FF'} />
    ),
    inActive: (
      <Ionicons name="notifications-circle-outline" size={24} color={'#000'} />
    ),
  },
  Profile: {
    active: <Ionicons name="person-circle" size={24} color={'#1677FF'} />,
    inActive: (
      <Ionicons name="person-circle-outline" size={24} color={'#000'} />
    ),
  },
};

const HomeTabs = createBottomTabNavigator({
  screens: {
    Home: {
      screen: HomePages,
      options: () => {
        return {
          headerShown: false,
        };
      },
    },
    Todo: {
      screen: TodoPages,
      options: () => {
        return {
          headerShown: false,
        };
      },
    },
    Profile: {
      screen: ProfileScreen,
      options: () => {
        return {
          headerShown: false,
        };
      },
    },
  },
  screenOptions: ({ route, navigation, theme }) => {
    return {
      tabBarIcon: ({ focused, color, size }) => {
        return focused
          ? IconMap[route.name].active
          : IconMap[route.name].inActive;
      },
      tabBarActiveTintColor: '#1677FF',
      tabBarInactiveTintColor: 'gray',
      lazy: true,
    };
  },
});

const screens = {
  Home: {
    screen: HomeTabs,
    options: {
      headerShown: false,
    },
  },
  Detail: HomeDetails,
  Login: {
    screen: LoginScreen,
    options: () => {
      return {
        headerShown: false,
      };
    },
  },
} as const;

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Login',
  screenOptions: {
    headerStyle: { backgroundColor: 'tomato' },
  },
  screenLayout: props => {
    return <Container>{props.children}</Container>;
  },
  screens,
});

type ScreensKeys = keyof typeof screens;
type ScreenObject = { [K in ScreensKeys]: any };

export type NativeStackNa = NativeStackNavigationProp<ScreenObject>;

export default RootStack;
