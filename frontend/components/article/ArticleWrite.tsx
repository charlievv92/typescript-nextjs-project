"use client";

import { useForm } from "react-hook-form";
import { Button, Stack, Typography } from "@mui/material";
import QuillEditor from "../quill/QuillEditor";
import axios from "axios";
import { useRouter } from "next/navigation";
import CustomizedTextField from "../CustomizedTextField";
// import Grid from "@mui/material/Grid2";

interface ArticleFormData {
  title: string;
  contents: string;
}

export default function ArticleWrite() {
  const { control, handleSubmit } = useForm<ArticleFormData>();
  const router = useRouter();
  //   const loginCheck = () => {
  //     if (!isLoggedIn) {
  //       alert("로그인이 필요합니다.");
  //       return false;
  //     }
  //     return true;
  //   };

  //   const titleCheck = () => {
  //     if (title.trim() === "") {
  //       alert("제목을 입력해주세요.");
  //       return false;
  //     }
  //     return true;
  //   };

  //   const contentsCheck = () => {
  //     const parser = new DOMParser(); // HTML 문자열을 파싱하는 객체 생성 -> quill.js를 사용하면서 필요
  //     const doc = parser.parseFromString(contents, "text/html");
  //     const textContent = doc.body.textContent || "";
  //     if (textContent.trim() === "") {
  //       alert("내용을 입력해주세요.");
  //       return false;
  //     }
  //     return true;
  //   };

  const onSubmit = async (data: ArticleFormData) => {
    // if (!loginCheck) {
    //   return;
    // }

    // if (!titleCheck()) {
    //   return;
    // }

    const parser = new DOMParser(); // HTML 문자열을 파싱하는 객체 생성 -> quill.js를 사용하면서 필요
    const doc = parser.parseFromString(data.contents, "text/html");
    const textContent = doc.body.textContent || "";
    if (textContent.trim() === "") {
      alert("내용을 입력해주세요.");
      return;
    }

    try {
      //   if (isEditMode) {
      //     response = await axios.patch(
      //       `${process.env.REACT_APP_SERVER_URL}/api/board/posts`,
      //       {
      //         board_id: board_id,
      //         title: title,
      //         contents: contents,
      //       }
      //     );
      //   } else {
      // ip 및 기타 정보 추가
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/board/posts`,
        {
          title: data.title,
          contents: data.contents,
          //   writer: user.email,
          //   ip_location: clientIp,
          writer: "aaa@aaa.com",
          ip_location: "127.0.0.1",
        }
      );

      //   }

      console.log(data);

      router.push("/articles");
    } catch (error) {
      console.error("Error creating post!!! ", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography component="h2" variant="h6" sx={{ mt: 2, mb: 2 }}>
          제목
        </Typography>
        <CustomizedTextField
          // minRows={20}
          name="title"
          control={control}
          rules={{ required: "제목을 입력해주세요." }}
          textFieldProps={{
            variant: "standard",
            fullWidth: true,
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
        <Typography component="h2" variant="h6" sx={{ mt: 2, mb: 2 }}>
          내용
        </Typography>
        <QuillEditor
          // ref={quillRef}
          name="contents"
          control={control}
          rules={{ required: "내용을 입력해주세요." }}
          // modules={customModules}
          // setHtml={handleContentsChange}
          style={{ height: "500px" }}
        />

        <Stack
          direction="row"
          sx={{ width: "100%", mt: 6, justifyContent: "flex-end" }}
          spacing={2}
        >
          <Button type="submit">작성</Button>
          {/* <Button disabled>Disabled</Button> */}
          <Button type="button" href="/articles">
            리스트
          </Button>
        </Stack>
      </form>
    </>
  );
}
