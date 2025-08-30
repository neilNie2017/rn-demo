import { Button } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';

const HomePages = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Home Screen</Text>
      <Button
        onPress={() => {
          console.log('123456');
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

export default HomePages;
