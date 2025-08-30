import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePages from './src/pages/home';
import HomeDetails from './src/pages/home/Detail';
import { Button } from '@react-navigation/elements';

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screenOptions: {
    headerStyle: { backgroundColor: 'tomato' },
  },
  screens: {
    Home: {
      screen: HomePages,
      options: {
        title: 'Overview',
        headerRight: () => {
          return (
            <Button
              onPress={() => {
                alert('This is a info button!');
              }}
            >
              info
            </Button>
          );
        },
      },
    },
    Detail: HomeDetails,
  },
});

export default RootStack;
