import { Button } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';
import Container from '../../layout/Container';
import SearchBar from '../../components/SearchBar';

const HomePages = () => {
  const navigation = useNavigation();
  return (
    <Container>
      <View>
        <SearchBar />
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
    </Container>
  );
};

export default HomePages;
