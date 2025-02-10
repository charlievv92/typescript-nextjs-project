import { Box, Divider, Typography } from "@mui/material";
import CommentItems from "./CommentItems";

interface ICommentItem {
  comment_id: number;
  email: string;
  comment: string;
  ip_location: string;
  publish_date: string;
  is_deleted: number;
}

export default async function ArticleComments({
  board_id,
}: {
  board_id: string;
}) {
  return (
    // <Grid size={{ xs: 12, sm: 3 }}>
    <>
      <Box
        sx={{
          padding: 3,
          width: { xs: "100%", sm: "100%" },
          minWidth: 320, // 반응형 너비 설정
          maxWidth: 400, // 반응형 너비 설정
          height: { xs: "auto", sm: "80vh" },
          position: { sm: "sticky" },
          top: { sm: 0 }, // sticky 위치 설정
          backgroundColor: "background.paper",
          overflowY: "auto",
          // border: "2px solid #ccc",
        }}
      >
        <Typography component="h2" variant="h6" sx={{ pb: 2 }}>
          댓글
        </Typography>
        <Divider />

        <CommentItems board_id={board_id} />
      </Box>
      {/* </Grid> */}
    </>
  );
}
