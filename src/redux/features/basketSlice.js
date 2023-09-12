import { createSlice } from "@reduxjs/toolkit";
import { storeData } from "../../Data";

const initialState = {
  products: storeData,
  total: 0, // Initialize total as 0
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    increment: (state, action) => {
      const product = state.products.find((p) => p.id === action.payload);
      if (product) {
        product.amount += 1;
        state.total += product.price;
      }
    },
    decrement: (state, action) => {
      const product = state.products.find((p) => p.id === action.payload);
      if (product) {
        if (product.amount > 1) {
          product.amount -= 1;
          state.total -= product.price;
        } else {
          // Remove the product from the array if amount is 1 or less
          state.products = state.products.filter(
            (p) => p.id !== action.payload
          );
          state.total -= product.price;
        }
      }
    },
    removeFromBasket: (state, action) => {
      // Find the product by ID and remove it from the products array
      const productId = action.payload;
      const productIndex = state.products.findIndex((p) => p.id === productId);

      if (productIndex !== -1) {
        const product = state.products[productIndex];
        state.total -= product.price * product.amount;
        state.products.splice(productIndex, 1);
      }
    },
  },
});

export const { increment, decrement, removeFromBasket } = basketSlice.actions;

// Calculate the total price whenever the products array changes
const calculateTotal = (products) => {
  return products.reduce((total, product) => {
    return total + product.price * product.amount;
  }, 0);
};

export const selectTotal = (state) => calculateTotal(state.basket.products);

export default basketSlice.reducer;
