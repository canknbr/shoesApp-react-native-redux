import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import products from '../../data/products';

const ProductScreen = () => {
  const renderImage = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Image style={styles.item} source={{ uri: item.image }} />
      </View>
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
