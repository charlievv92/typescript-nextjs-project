import { articleApi } from "@/apis/articles";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 게시물 작성 Thunk
export const createArticle = createAsyncThunk(
  "articles/createArticle",
  async ({ board_id, comment }: { board_id: string; comment: string }) => {
    try {
      const response = await articleApi.createArticle({ board_id, comment });

      return response;
    } catch (error) {
      throw error;
    }
  }
);

// 게시물 목록 호출
export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async () => {
    try {
      const articles = await articleApi.getArticles();
      return articles;
    } catch (error) {
      throw error; // 에러 처리도 그대로 사용
    }
  }
);

// 게시물 상세 호출
export const fetchArticleDetails = createAsyncThunk(
  "articles/fetchArticleDetails",
  async (board_id: string) => {
    try {
      const articleDetails = await articleApi.getArticleDetails(board_id);
      return articleDetails;
    } catch (error) {
      throw error;
    }
  }
);

const articleSlice = createSlice({
  name: "articles",
  initialState: {
    rows: [],
    title: "",
    contents: "",
    authorEmail: "",
    status: "idle",
    message: "",
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = "loading";
        state.message = "";
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        console.log("fetchComments.fulfilled : ", action);
        state.status = "succeeded";
        state.rows = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        console.log("fetchComments.rejected : ", action);
        state.status = "failed";
        state.message =
          action.error.message || "알 수 없는 오류가 발생했습니다.";
      })
      // 게시물 작성
      .addCase(createArticle.pending, (state) => {
        state.status = "loading";
        state.message = "";
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload.message;
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.error.message || "게시물 작성에 실패했습니다.";
      })
      // 게시물 상세 호출
      .addCase(fetchArticleDetails.pending, (state) => {
        state.status = "loading";
        state.message = "";
      })
      .addCase(fetchArticleDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload.message;
      })
      .addCase(fetchArticleDetails.rejected, (state, action) => {
        state.status = "failed";
        state.message =
          action.error.message || "알 수 없는 오류가 발생했습니다.";
      });
  },
});

export default articleSlice.reducer;
