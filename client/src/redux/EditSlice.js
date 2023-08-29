/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
const editSlice = createSlice({
  name: "edit",
  initialState: {
    edit: {},
    editCheck: false,
    deleteCheck: false,
  },
  reducers: {
    setEdit: (state, action) => {
      state.edit = { ...action.payload };
      state.editCheck = !state.editCheck;
    },
    setDeteteCheck: (state, action) => {
      state.deleteCheck = !state.deleteCheck;
    },
  },
});
export const { setEdit, setDeteteCheck } = editSlice.actions;
export default editSlice.reducer;
