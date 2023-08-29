/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
export const productsSlice = createSlice({
  name: "products",
  initialState: {
    figures: [],
    t_shirts: [],
    checkUpdate: false,
    editProduct: {},
  },
  reducers: {
    setFigure: (state, action) => {
      state.figures = [...action.payload];
    },
    setT_shirt: (state, action) => {
      state.t_shirts = [...action.payload];
    },
    updateProduct: (state, action) => {
      const id = action.payload.id;
      const generic = action.payload.generic;
      console.log(generic);
      if (generic === "Figure") {
        const index = state.figures.findIndex((e) => e.id === id);
        if (index > -1) {
          state.figures[index].inventory = action.payload.inventory;
        }
      }
      if (generic === "T-Shirt") {
        const index = state.t_shirts.findIndex((e) => e.id === id);
        if (index > -1) {
          state.t_shirts[index].inventory = action.payload.inventory;
        }
      }
    },
    removeProduct: (state, action) => {
      const id = action.payload.id;
      const generic = action.payload.generic;
      if (generic === "Figure") {
        const index = state.figures.findIndex((e) => e.id === id);
        if (index > -1) {
          state.figures[index].inventory =
            action.payload.inventory + action.payload.number;
        }
      }
      if (generic === "T_Shirt") {
        const index = state.t_shirts.findIndex((e) => e.id === id);
        if (index > -1) {
          state.t_shirts[index].inventory =
            action.payload.inventory + action.payload.number;
        }
      }
    },
    createOrUpdateProduct: (state, action) => {
      state.checkUpdate = !state.checkUpdate;
    },
    setEditProduct: (state, action) => {
      state.editProduct = { ...action.payload };
    },
  },
});
export const {
  setFigure,
  setT_shirt,
  updateProduct,
  removeProduct,
  createOrUpdateProduct,
  setEditProduct,
} = productsSlice.actions;
export default productsSlice.reducer;
