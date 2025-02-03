import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "@/stores/tokenSlice";
import commentReducer from "@/stores/commentSlice";
import formReducer from "@/stores/formSlice";
const store = configureStore({
  reducer: {
    token: tokenReducer,
    comments: commentReducer,
    form: formReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
