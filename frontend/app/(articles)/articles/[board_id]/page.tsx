import * as React from "react";
import Grid from "@mui/material/Grid2";

import ArticleComments from "@/components/article/ArticleComments";
import ArticleDetails from "@/components/article/ArticleDetails";
// import ConfirmDialog from "../auth/sign-up/Confirm";
// import { useDialog } from "../auth/sign-up/useDialog";

interface ArticleDetailsPageProps {
  params: { board_id: string };
}

export default function ArticleDetailsPage({
  params,
}: ArticleDetailsPageProps) {
  const { board_id } = params;
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
      <Grid size={{ xs: 12, sm: 9 }}>
        <React.Suspense fallback={<h1>Loading article details</h1>}>
          <ArticleDetails board_id={board_id} />
        </React.Suspense>
      </Grid>
      <Grid size={{ xs: 12, sm: 3 }}>
        <React.Suspense fallback={<h1>Loading article comments</h1>}>
          <ArticleComments board_id={board_id} />
        </React.Suspense>
      </Grid>
    </>
  );
}
