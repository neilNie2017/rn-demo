import { StyleSheet, Text, View } from 'react-native';
import Container from '../../layout/Container';

const ProfileScreen = ({}) => {
  return (
    <Container>
      <Text style={styles.text}>ProfileScreen</Text>
    </Container>
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
