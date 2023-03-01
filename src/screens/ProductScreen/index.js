import {
  FlatList,
  Image,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  View,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {  useDispatch } from 'react-redux';
import { useGetProductsQuery } from '../../redux/store/apiSlice';

const ProductScreen = () => {
  const { data, error, isLoading } = useGetProductsQuery();

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const renderImage = ({ item }) => {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate('Product Detail', {
            id: item._id,
          });
        }}
        style={styles.itemContainer}
      >
        <Image style={styles.item} source={{ uri: item.image }} />
      </Pressable>
    );
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
const products = data.data;
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
