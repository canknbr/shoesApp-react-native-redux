import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import ProductScreen from './../screens/ProductScreen';
import ProductDetailScreen from './../screens/ProductDetailsScreen';
import ShoppingCartScreen from './../screens/ShoppingCartScreen';
import { useSelector } from 'react-redux';
import { basketCount } from './../redux/store/cartSlice';
const Stack = createNativeStackNavigator();
const Navigation = () => {
  const cart = useSelector(basketCount);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          contentStyle: {
            backgroundColor: '#f8f9fa',
          },
        }}
      >
        <Stack.Screen
          name="Product"
          component={ProductScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={() => {
                  navigation.navigate('Cart');
                }}
              >
                <FontAwesome5 name="shopping-cart" size={20} color="#343a40" />
                <Text
                  style={{ marginLeft: 3, color: '#343a40', fontWeight: '500' }}
                >
                  {cart}
                </Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Product Detail"
          component={ProductDetailScreen}
          options={{
            presentation: 'modal',
          }}
        />
        <Stack.Screen name="Cart" component={ShoppingCartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
