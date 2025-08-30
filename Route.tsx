import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Ionicons from '@react-native-vector-icons/ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePages from './src/pages/home';
import ProfileScreen from './src/pages/profile';
import HomeDetails from './src/pages/home/Detail';
import TodoPages from './src/pages/todo';

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

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screenOptions: {
    headerStyle: { backgroundColor: 'tomato' },
  },
  screens: {
    Home: {
      screen: HomeTabs,
      options: {
        headerShown: false,
      },
    },
    Detail: HomeDetails,
  },
});

export default RootStack;
