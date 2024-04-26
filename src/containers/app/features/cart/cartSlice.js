import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  total: 0,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
      state.total += item.price;
    },
    removeFromCart(state, action) {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        state.items = state.items.filter((i) => i.id !== item.id);
      }
      state.total -= item.price;
    },
    clearCart(state) {
      state.items = [];
      state.total = 0;
    },
  },
});

export default cartSlice.reducer;
