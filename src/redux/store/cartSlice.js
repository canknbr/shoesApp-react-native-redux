import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  deliveryFee: 15,
  freeDeliveryFrom: 200,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem: (state, action) => {
      const newProduct = action.payload.product;
      const alreadyInCart = state.items.find(
        item => item.product._id === newProduct._id
      );
      if (alreadyInCart) {
        alreadyInCart.quantity += 1;
        return;
      } else {
        state.items.push({ product: newProduct, quantity: 1 });
      }
    },
    changeQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const newItem = state.items.find(item => item.product._id === id);
      if (newItem) {
        newItem.quantity += quantity;
      }
      if (newItem.quantity === 0) {
        state.items = state.items.filter(item => item.product._id !== id);
      }
    },
  },
});

export const subTotal = state => {
  return state.cart.items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
};
const cartSelector = state => state.cart;

export const selectDeliveryFee = createSelector(
  cartSelector,
  subTotal,
  (crt, ttl) => (ttl > crt.freeDeliveryFrom ? 0 : crt.deliveryFee)
);
export const basketCount = state => {
  return state.cart.items.reduce((acc, item) => acc + item.quantity, 0);
};
export const selectTotal = createSelector(
  subTotal,
  selectDeliveryFee,
  (sub, fee) => sub + fee
);
export const { addCartItem, changeQuantity } = cartSlice.actions;
export default cartSlice.reducer;
