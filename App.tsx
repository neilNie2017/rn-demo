/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { createStaticNavigation } from '@react-navigation/native';
import { StyleSheet, useColorScheme } from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootStack from './Route';

// createBottomTabNavigator({
//   Home: { screen: HomePages },
// })

const Navigation = createStaticNavigation(RootStack);

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
