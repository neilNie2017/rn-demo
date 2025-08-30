import { StyleSheet, Text, View } from 'react-native';

const ProfileScreen = ({  }) => {

  return (
    <View>
      <Text style={styles.text}>ProfileScreen</Text>
  
     
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

export default ProfileScreen;
