import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { addCartItem } from '../../redux/store/cartSlice';
import { useGetProductQuery } from '../../redux/store/apiSlice';

const ProductDetailScreen = ({route}) => {
  const {id} = route.params;


  const { data, error, isLoading } = useGetProductQuery(id);


  const dispatch = useDispatch();
  const windowWidth = useWindowDimensions().width;
  const product = data?.data;
  const addToCart = () => {
    dispatch(addCartItem({ product }));
  };
 

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size={'large'} />
      </View>
    );
  }
  if (error) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>Something went wrong</Text>
      </View>
    );
  }



  return (
    <View>
      <ScrollView>
        <FlatList
          data={product.images}
          renderItem={({ item }) => (
            <Image
              style={{ width: windowWidth, aspectRatio: 1 }}
              source={{ uri: item }}
            />
          )}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.price}>${product.price}</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={addToCart}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductDetailScreen;

export const styles = StyleSheet.create({
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 32,
    color: '#495057',
    fontWeight: '500',
    marginVertical: 10,
  },
  price: {
    fontSize: 18,
    color: '#495057',
    fontWeight: '500',
    letterSpacing: 3,
  },
  description: {
    fontSize: 16,
    color: '#343a40',
    fontWeight: '300',
    marginVertical: 10,
    lineHeight: 30,
  },
  button: {
    backgroundColor: '#212529',
    position: 'absolute',
    bottom: 20,
    padding: 10,
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.31,
  },
  buttonText: {
    color: '#f8f9fa',
    fontSize: 18,
    fontWeight: '500',
  },
});
