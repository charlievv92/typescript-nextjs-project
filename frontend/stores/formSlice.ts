import { createSlice } from "@reduxjs/toolkit";

interface FormState {
  email: string;
  password: string;
  title: string;
  contents: string;
  comment: string;
}

const initialState: FormState = {
  email: "",
  password: "",
  title: "",
  contents: "",
  comment: "",
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setContents: (state, action) => {
      state.contents = action.payload;
    },
    setComment: (state, action) => {
      state.comment = action.payload;
    },
    resetComment: (state) => {
      state.comment = initialState.comment;
    },
  },
});

export const { setContents } = formSlice.actions;
export default formSlice.reducer;
