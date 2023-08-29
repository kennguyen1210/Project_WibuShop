/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    login: {},
    loginCheck: false,
    loginType: "",
  },
  reducers: {
    update: (state, action) => {
      state.login = { ...action.payload };
      state.loginCheck = !state.loginCheck;
      state.loginType = action.payload.type;
    },
    editLogin: (state, action) => {
      state.login = {
        ...action.payload,
        updateDate: action.payload.updateDate.toString(),
      };
    },
    deleteLogin: (state, action) => {
      state.login = {};
      state.loginCheck = false;
      state.loginType = "";
    },
  },
});
export const { update, deleteLogin, editLogin } = loginSlice.actions;
export default loginSlice.reducer;
