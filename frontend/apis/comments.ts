import axios from "axios";

interface Comment {
  id: number;
  board_id: string;
  comment: string;
  writer?: string;
  created_at: string;
  // 필요한 다른 필드들 추가
}

export const commentApi = {
  // 댓글 목록 조회
  getComments: async (board_id: string) => {
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    try {
      const response = await axios.get(
        `${serverUrl}/api/board/comments/${board_id}`
      );
      console.log("Article comments : ", response.data); //       Article comments :  { code: 200, data: [], message: '게시 물 댓글 조회 성공' }

      // const comments: ICommentItem[] = response.data.data;
      return response.data;
    } catch (error) {
      console.error("Error getting article details!!! ", error);
      throw error;
    }
  },

  // 댓글 작성
  createComment: async (data: {
    board_id: string;
    comment: string;
    writer?: string;
    ip_location?: string;
  }) => {
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    try {
      const response = await axios.post(`${serverUrl}/api/board/comments`, {
        board_id: data.board_id,
        comment: data.comment,
        writer: "aaa@aaa.com",
        ip_location: "0.0.0.0",
      });
      console.log("createComment : ", response.data);
      return response.data;
    } catch (error) {
      console.error("댓글 작성 실패:", error);
      throw error;
    }
  },
};
