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
import { createTheme, ThemeProvider } from '@rneui/themed';

// createBottomTabNavigator({
//   Home: { screen: HomePages },
// })

const Navigation = createStaticNavigation(RootStack);

function App() {
  const theme = createTheme({});

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

export default App;
