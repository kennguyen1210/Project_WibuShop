import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "carts",
  initialState: {
    carts: [],
    cartNumber: 0,
  },
  reducers: {
    addCart: (state, action) => {
      let id = action.payload.id;
      let index = state.carts.findIndex((cart) => cart.id === id);
      // Them cart da ton tai
      if (index > -1) {
        state.carts[index].number += action.payload.number;
        state.carts[index].inventory =
          state.carts[index].inventory - action.payload.number;
      }
      //Them moi cart
      else {
        state.carts.push(action.payload);
      }
      state.cartNumber += action.payload.number;
    },
    plusCart: (state, action) => {
      let id = action.payload.id;
      let index = state.carts.findIndex((cart) => cart.id === id);
      // Them cart da ton tai
      if (index > -1) {
        ++state.carts[index].number;
        --state.carts[index].inventory;
        state.cartNumber += 1;
      }
    },
    minusCart: (state, action) => {
      let id = action.payload.id;
      let index = state.carts.findIndex((cart) => cart.id === id);
      // remove cart da ton tai
      if (index > -1) {
        --state.carts[index].number;
        ++state.carts[index].inventory;
        state.cartNumber -= 1;
      }
    },
    deleteCart: (state, action) => {
      let id = action.payload.id;
      let index = state.carts.findIndex((cart) => cart.id === id);
      // remove cart da ton tai
      if (index > -1) {
        state.cartNumber = state.cartNumber - state.carts[index].number;
        state.carts.splice(index, 1);
      }
    },
  },
});
export const { addCart, deleteCart, minusCart, plusCart } = cartSlice.actions;
export default cartSlice.reducer;
