import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

import CartListItem from '../../components/CartListItem';
import { useSelector, useDispatch } from 'react-redux';
import {
  subTotal,
  selectDeliveryFee,
  selectTotal,
} from '../../redux/store/cartSlice';
import { useCreateOrderMutation } from '../../redux/store/apiSlice';

const ShoppingCartTotal = () => {
  const sub = useSelector(subTotal);
  const fee = useSelector(selectDeliveryFee);
  const total = useSelector(selectTotal);
const { data, error, isLoading } = useCreateOrderMutation();
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.text}>Subtotal</Text>
        <Text style={styles.text}>{sub.toFixed(2)} US$</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Delivery</Text>
        <Text style={styles.text}>{fee.toFixed(2)} US$</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.bold}>Total</Text>
        <Text style={styles.bold}>{total.toFixed(2)} US$</Text>
      </View>
    </View>
  );
};
const ShoppingCartScreen = () => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items);
  return (
    <>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        ListFooterComponent={ShoppingCartTotal}
      />
      <TouchableOpacity activeOpacity={0.8} style={styles.button}>
        <Text style={styles.buttonText}>Checkout</Text>
      </TouchableOpacity>
    </>
  );
};

export default ShoppingCartScreen;
export const styles = StyleSheet.create({
  container: {
    margin: 20,
    padding: 10,
    borderTopColor: '#e3e3e3',
    borderTopWidth: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
    color: '#868e96',
  },
  bold: {
    fontWeight: '500',
    fontSize: 16,
    color: '#343a40',
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
