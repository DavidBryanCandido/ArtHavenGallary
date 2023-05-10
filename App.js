import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from './src/Global/styles';
import RootNavigation from './src/Navigation/RootNavigation';
import Screen from './src/Components/Screen';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle = "light-content" backgroundColor={colors.bgLight} />
      <RootNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.bgLight,
  },
});
