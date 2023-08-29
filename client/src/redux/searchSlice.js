import { createSlice } from "@reduxjs/toolkit";
const searchSlice = createSlice({
  name: "search",
  initialState: {
    search: {},
    searchByName: "",
  },
  reducers: {
    setSearchContent: (state, action) => {
      console.log(action.payload);
      state.search = { ...action.payload };
    },
    setSearchByName: (state, action) => {
      state.searchByName = action.payload;
    },
  },
});
export const { setSearchContent, setSearchByName } = searchSlice.actions;
export default searchSlice.reducer;
