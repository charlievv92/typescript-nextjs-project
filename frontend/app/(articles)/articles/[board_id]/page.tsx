import * as React from "react";

import ArticleComments from "@/components/article/ArticleComments";
import ArticleDetails from "@/components/article/ArticleDetails";
// import ConfirmDialog from "../auth/sign-up/Confirm";
// import { useDialog } from "../auth/sign-up/useDialog";

interface ArticleDetailsPageProps {
  params: { board_id: string };
}

export default function ArticleDetailsPage({ params: { board_id } }) {
  // TODO: 게시물 삭제 기능 추가(20241202 kwc)
  // TODO: 게시물 삭제 시 확인창 추가(20241202 kwc)
  // TODO: 게시물 수정 시 확인창 추가(20241202 kwc)
  // TODO: 게시물 삭제 버튼 권한에 따라 보이게 처리(20241202 kwc)

  //   const { user, clientIp } = useAuth();

  // const customModules = {
  //   toolbar: {
  //     container: [
  //       [{ size: ["small", false, "large", "huge"] }],
  //       [{ align: [] }],
  //       ["bold", "italic", "underline", "strike"],
  //       [{ list: "ordered" }, { list: "bullet" }],
  //       [
  //         {
  //           color: [],
  //         },
  //       ],
  //     ],
  //   },
  // };

  // const customStyle = { height: "150px" };
  // const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  return (
    <>
      {/* <Grid size={{ xs: 12, sm: 9 }}> */}
      <ArticleDetails board_id={board_id} />

      {/* 댓글 작성 기능 추가 예정 -> react-hook-form 도입 검토 필요(20250123 kwc) */}
      {/* <Box
          sx={{
            // mb: 2,
            pt: 3,
            pb: 2,
          }}
        >
          <Typography component="h2" variant="h6" sx={{ pb: 2 }}>
            댓글
          </Typography>
          <TextField
            // minRows={20}
            id="board-comment"
            variant="standard"
            sx={{
              "& .MuiInputBase-root": {
                border: "1px",
                borderTopRightRadius: "none",
                borderTopLeftRadius: "none",
                boxShadow: "none",
              },
            }}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Box>

        <Stack
          direction="row"
          justifyContent="flex-end"
          sx={{
            width: "100%",
            pt: 2,
            pb: 2,
            borderBottom: `1px solid #ccc`,
            // mt: 2,
            // mb: 2,
            // borderBottom: `1px solid #ccc`,
            // padding: "10px",
          }}
          spacing={2}
          // alignItems="center"
        >
          <Button onClick={handleCommentSubmitClick}>작성</Button>
        </Stack> */}
      {/* </Grid> */}
      {/* <Grid size={{ xs: 12, sm: 3 }}> */}
      <ArticleComments board_id={board_id} />
      {/* </Grid> */}
    </>
  );
}
