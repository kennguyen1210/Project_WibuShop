import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import productReducer from "./productsSlice";
import cartsReducer from "./cartSlice";
import searchReducer from "./searchSlice";
import editReducer from "./EditSlice";
export default configureStore({
  reducer: {
    login: loginReducer,
    products: productReducer,
    carts: cartsReducer,
    search: searchReducer,
    edit: editReducer,
  },
});
