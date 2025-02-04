import { commentApi } from "@/apis/comments";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// commentApi 함수 직접 사용
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (board_id: string) => {
    try {
      const comments = await commentApi.getComments(board_id);
      return comments; // response.data.data는 이미 commentApi에서 처리됨
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
    error: "",
  },

  reducers: {
    // setComments: (state, action) => {
    //   state.items = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        console.log("fetchComments.fulfilled : ", action);
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        console.log("fetchComments.rejected : ", action);
        state.status = "failed";
        state.error = action.error.message || "알 수 없는 오류가 발생했습니다.";
      });
  },
});

// export const { setComments } = commentSlice.actions;
export default commentSlice.reducer;
