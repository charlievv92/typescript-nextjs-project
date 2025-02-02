import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "comments",
  initialState: {
    items: [],
    status: "idle",
  },
  reducers: {
    setComments: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setComments } = commentSlice.actions;
export default commentSlice.reducer;
