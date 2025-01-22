import React, { useEffect, useState, useRef } from "react";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
// import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
// import TextField from "@mui/material/TextField";
// import QuillEditor from "../components/QuillEditor";
import {
  Button,
  CircularProgress,
  Divider,
  List,
  Stack,
  TextField,
} from "@mui/material";
import axios from "axios";
// import {
//   Link,
//   useNavigate,
//   useOutletContext,
//   useParams,
// } from "react-router-dom";
// import { useAuth } from "../auth/AuthContext";
import AlignItemsList from "@components/AlignItemsList";
import { useRouter } from "next/navigation";
import { useDialog } from "@/hooks/useDialog";
import Link from "next/link";
import ConfirmDialog from "@/components/ConfirmDialog";
import ArticleComments from "@/components/article/ArticleComments";
import ArticleDetails from "@/components/article/ArticleDetails";
// import ConfirmDialog from "../auth/sign-up/Confirm";
// import { useDialog } from "../auth/sign-up/useDialog";

interface ArticleDetailsPageProps {
  params: { board_id: string };
}

export default function ArticleDetailsPage({
  params: { board_id },
}: ArticleDetailsPageProps) {
  // TODO: 게시물 삭제 기능 추가(20241202 kwc)
  // TODO: 게시물 삭제 시 확인창 추가(20241202 kwc)
  // TODO: 게시물 수정 시 확인창 추가(20241202 kwc)
  // TODO: 게시물 삭제 버튼 권한에 따라 보이게 처리(20241202 kwc)

  //   const { user, clientIp } = useAuth();

  // const router = useRouter();
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

  //   useEffect(() => {
  //     setPageTitle("Board Details");
  //   }, [setPageTitle]);

  const contentsRef = useRef(null);
  const { isOpen, openDialog, handleConfirm, handleCancel } = useDialog();

  const handleModifyClick = () => {
    // if (user.email !== authorEmail) {
    //   alert("작성자만 수정할 수 있습니다.");
    //   return;
    // }
    router.push(`/articles/modify/${board_id}`);
  };

  // const handleCommentChange = (value) => {
  //   setComment(value);
  //   console.log("comment : ", comment);
  // };

  const handleCommentSubmitClick = async () => {
    // if (!user) {
    //   alert("로그인 후 댓글을 작성할 수 있습니다.");
    //   router.push("/login");
    //   return;
    // }
    const response = await axios.post(`${serverUrl}/api/board/comments`, {
      board_id: board_id,
      writer: user.email,
      comment: comment,
      ip_location: clientIp,
    });

    console.log("comment : ", comment);
    console.log("Post created!!! ", response.data);
    getArticleComments();
    setComment("");
  };

  const handleDeleteClick = async () => {
    const confirm = await openDialog();

    if (confirm) {
      const response = await axios.delete(`${serverUrl}/api/board/posts`, {
        data: { board_ids: [board_id] },
      });
      console.log("Post deleted!!! ", response.data);
      alert(response.data.message);
      router.push("/articles");
    }
  };

  // useEffect(() => {
  //   getArticleDetails();
  //   // getArticleComments();
  // }, []);

  useEffect(() => {
    if (contentsRef.current) {
      contentsRef.current.innerHTML = ""; // 기존 내용을 초기화
      contentsRef.current.insertAdjacentHTML("beforeend", contents); // 새로운 내용을 삽입
    }
  }, [contents]);

  // if (loading) {
  //   return <CircularProgress />; // 로딩 중일 때 로딩 스피너 표시
  // }
  return (
    <>
      <Grid size={{ xs: 12, sm: 9 }}>
        <ArticleDetails board_id={board_id} />
        <ConfirmDialog
          open={isOpen}
          title="해당 게시물을 삭제하시겠어요?"
          confirmText="삭제"
          cancelText="취소"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
        <Box
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
          {/* <QuillEditor
            html={comment}
            modules={customModules}
            setHtml={handleCommentChange}
            style={customStyle}
          /> */}
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
        </Stack>
      </Grid>
      <Grid size={{ xs: 12, sm: 3 }}>
        <ArticleComments board_id={board_id} />
      </Grid>
    </>
  );
}
