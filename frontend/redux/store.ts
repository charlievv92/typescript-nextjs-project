import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "@/stores/tokenSlice";
import commentReducer from "@/stores/commentSlice";
import formReducer from "@/stores/formSlice";
import articleReducer from "@/stores/articleSlice";

const store = configureStore({
  reducer: {
    token: tokenReducer,
    comments: commentReducer,
    form: formReducer,
    articles: articleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
