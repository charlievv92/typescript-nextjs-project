import axios from "axios";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const articleApi = {
  // 게시물 목록 조회
  getArticles: async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/board/posts`);
      console.log("Articles : ", response.data); //       Article comments :  { code: 200, data: [], message: '게시 물 댓글 조회 성공' }

      // const comments: ICommentItem[] = response.data.data;
      return response.data;
    } catch (error) {
      console.error("게시물 목록 조회 실패:", error);
      throw error;
    }
  },

  // 게시물 상세 조회
  getArticleDetails: async (board_id: string) => {
    try {
      const response = await axios.get(
        `${serverUrl}/api/board/posts/${board_id}`
      );
      console.log("articleDetails : ", response.data);
      return response.data;
    } catch (error) {
      console.error("게시물 상세 조회 실패:", error);
      throw error;
    }
  },

  // 게시물 작성
  createArticle: async (data: {
    board_id: string;
    comment: string;
    writer?: string;
    ip_location?: string;
  }) => {
    try {
      const response = await axios.post(`${serverUrl}/api/board/comments`, {
        board_id: data.board_id,
        comment: data.comment,
        writer: "aaa@aaa.com",
        ip_location: "0.0.0.0",
      });
      console.log("createArticle : ", response.data);
      return response.data;
    } catch (error) {
      console.error("게시물 작성 실패:", error);
      throw error;
    }
  },
};
