import { Button } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { Card, Text } from '@rneui/base';
import { SearchBar } from '@rneui/themed';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Ionicons from '@react-native-vector-icons/ionicons';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import SearchScanBar from '../../components/SearchBar';
type RootStackParamList = {
  Detail: {
    form: string;
  };
};

const HomePages = () => {
  const title = 'MomOS工业操作系统';
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View>
      <Text
        h3
        h3Style={{
          fontWeight: 600,
        }}
      >
        {title}
      </Text>
      <SearchScanBar />
      {/* {device && hasPermission && (
        <Camera
          device={device}
          isActive
          style={styles.absoluteFill}
          codeScanner={codeScanner}
        />
      )} */}
      <Card containerStyle={{ marginTop: 15 }}>
        <Card.Title>FONTS1</Card.Title>
        <Card.Divider />
        <Text style={styles.fonts} h1>
          h1 Heading
        </Text>
        <Text style={styles.fonts} h2>
          h2 Heading
        </Text>
        <Text style={styles.fonts} h3>
          h3 Heading
        </Text>
        <Text style={styles.fonts} h4>
          h4 Heading
        </Text>
        <Text style={styles.fonts}>Normal Text</Text>
      </Card>
      <Text>Home Screen</Text>
      <Button
        onPress={() => {
          navigation.navigate('Detail', {
            form: 'form home',
          });
        }}
      >
        Go to Details
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  fonts: {},
  absoluteFill: {
    width: 80,
    height: 80,
  },
});

export default HomePages;
