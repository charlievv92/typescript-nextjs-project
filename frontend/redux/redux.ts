import { createSlice } from "@reduxjs/toolkit";

const tokenSlices = createSlice({
  name: "token",
  initialState: {
    tokenList: {},
    tokenSet: {},
  },
  reducers: {
    setTokenList: (state, action) => {
      state.tokenList = action.payload;
    },
    setTokenDataSet: (state, action) => {
      state.tokenSet = action.payload;
    },
  },
});

export const { setTokenList, setTokenDataSet } = tokenSlices.actions;
export default tokenSlices.reducer;
