import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "@/stores/tokenSlice";
import commentReducer from "@/stores/commentSlice";

const store = configureStore({
  reducer: {
    token: tokenReducer,
    comments: commentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
