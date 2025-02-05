import { commentApi } from "@/apis/comments";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 댓글 작성 Thunk
export const createComment = createAsyncThunk(
  "comments/createComment",
  async ({ board_id, comment }: { board_id: string; comment: string }) => {
    try {
      const response = await commentApi.createComment({ board_id, comment });
      await fetchComments(board_id);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// commentApi 함수 직접 사용
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (board_id: string) => {
    try {
      const comments = await commentApi.getComments(board_id);
      console.log("fetchComments : ", comments);
      return comments.data; // response.data.data는 이미 commentApi에서 처리됨
    } catch (error) {
      throw error; // 에러 처리도 그대로 사용
    }
  }
);

const commentSlice = createSlice({
  name: "comments",
  initialState: {
    items: [],
    status: "idle",
    message: "",
  },

  reducers: {
    setInitialComments: (state, action) => {
      state.items = action.payload.data;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = "loading";
        state.message = "";
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        console.log("fetchComments.fulfilled : ", action);
        state.status = "succeeded";
        state.items = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        console.log("fetchComments.rejected : ", action);
        state.status = "failed";
        state.message =
          action.error.message || "알 수 없는 오류가 발생했습니다.";
      })
      // 댓글 작성
      .addCase(createComment.pending, (state) => {
        state.status = "loading";
        state.message = "";
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload.message;
      })
      .addCase(createComment.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.error.message || "댓글 작성에 실패했습니다.";
      });
  },
});

export const { setInitialComments } = commentSlice.actions;
export default commentSlice.reducer;
