"use client";

import { useForm, useController, UseControllerProps } from "react-hook-form";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import CustomizedTextField from "../CustomizedTextField";
import { commentApi } from "@/apis/comments";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { createComment, fetchComments } from "@/stores/commentSlice";
import { AppDispatch } from "@/redux/store";

// 댓글 작성 컴포넌트 추후에 수정 필요
export default function ArticleCommentWrite({
  board_id,
}: {
  board_id: string;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch<AppDispatch>();
  const [comment, setComment] = useState("");
  const handleCommentSubmitClick = async (data) => {
    // if (!user) {
    //   alert("로그인 후 댓글을 작성할 수 있습니다.");
    //   router.push("/login");
    //   return;
    // }
    // const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    // const response = await axios.post(`${serverUrl}/api/board/comments`, {
    //   board_id: board_id,
    //   // writer: user.email,
    //   comment: data.comment,
    //   // ip_location: clientIp,
    // });
    // const response = await commentApi.createComment({
    //   board_id: board_id,
    //   comment: data.comment,
    // });
    // console.log("comment : ", data.comment);
    // console.log("Post created!!! ", response.data);
    // commentApi.getComments(board_id); 댓글 목록 재조회하고 댓글 목록 컴포넌트 업데이트하도록 수정 필요
    // setComment("");
    try {
      await dispatch(createComment({ board_id, comment: data.comment }));
      await dispatch(fetchComments(board_id));
      setComment("");
    } catch (error) {
      console.error("댓글 작성 실패: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleCommentSubmitClick)}>
      <Box
        sx={{
          pt: 3,
          pb: 2,
        }}
      >
        <Typography component="h2" variant="h6" sx={{ pb: 2 }}>
          댓글
        </Typography>
        <CustomizedTextField
          // minRows={20}
          name="comment"
          control={control}
          rules={{
            required: "댓글을 입력해주세요.",
            maxLength: {
              value: 500,
              message: "댓글은 500자 이내로 입력해주세요",
            },
          }}
          textFieldProps={{
            id: "board-comment",
            variant: "standard",
            value: comment,
            sx: {
              "& .MuiInputBase-root": {
                border: "1px",
                borderTopRightRadius: "none",
                borderTopLeftRadius: "none",
                boxShadow: "none",
              },
            },
          }}
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
        <Button type="submit">작성</Button>
      </Stack>
    </form>
  );
}
