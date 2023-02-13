import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Navigation from './src/navigations/Navigation';
export default function App() {
  return (
    <View style={styles.container}>
      {/* <ProductScreen /> */}
      {/* <ProductDetailScreen /> */}
      {/* <ShoppingCartScreen /> */}
      <Navigation />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
