import { createSlice } from '@reduxjs/toolkit';
import products from '../../data/products';
const initialState = {
  products,
  selectedProduct: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = state.products.find(
        product => product.id === action.payload
      );
    },
  },
});

export default productSlice.reducer;
export const { setSelectedProduct } = productSlice.actions;
