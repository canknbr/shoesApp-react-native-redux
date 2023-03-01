import { FlatList, Image, StyleSheet, Pressable, View } from 'react-native';
import products from '../../data/products';
import { setSelectedProduct } from '../../redux/store/productSlice';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

const ProductScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
    const products = useSelector(state => state.product.products);
  const renderImage = ({ item }) => {
    return (
      <Pressable
        onPress={() => {
          dispatch(setSelectedProduct(item.id));
          navigation.navigate('Product Detail');
        }}
        style={styles.itemContainer}
      >
        <Image style={styles.item} source={{ uri: item.image }} />
      </Pressable>
    );
  };


  return <FlatList data={products} renderItem={renderImage} numColumns={2} />;
};

export default ProductScreen;

const styles = StyleSheet.create({
  itemContainer: {
    width: '50%',
    padding: 1,
  },
  item: {
    width: '100%',
    aspectRatio: 1,
  },
});
