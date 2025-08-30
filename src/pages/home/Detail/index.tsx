import { Button } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';

const HomeDetails = ({ route }) => {
  const navigation = useNavigation();
  const { form } = route.params;
  return (
    <View>
      {' '}
      <Text style={styles.text}>{form}</Text>
      <Text style={styles.text}>go HOME</Text>
      <Button
        onPress={() => {
          navigation.setOptions({
            headerStyle: {
              backgroundColor: '#000'
            },
            headerTintColor: '#fff',
            headerTitleStyle:{
                textAlign:'center'
            }
          });
        }}
      >
        修改Header样式
      </Button>
      <Button onPress={() => navigation.goBack()}>Go back</Button>
      <Button onPress={() => navigation.navigate('Home')}>Go to Home</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 48,
    fontWeight: 600,
  },
});

export default HomeDetails;
