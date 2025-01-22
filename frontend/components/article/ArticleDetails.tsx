import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import ConfirmDialog from "../ConfirmDialog";
import { useRouter } from "next/navigation";

interface IArticleDetails {
  title: string;
  contents: string;
  authorEmail: string;
}

async function getArticleDetails(board_id: string) {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  try {
    console.log(serverUrl);

    const response = await axios.get(
      `${serverUrl}/api/board/posts/${board_id}`
    );
    console.log("Article details : ", response.data);

    // const articleDetails: IArticleDetails = response.data.data;
    return response.data.data;
  } catch (error) {
    console.error("Error getting article details!!! ", error);
    throw error;
  }
}

const router = useRouter();

export default async function ArticleDetails({
  board_id,
}: {
  board_id: string;
}) {
  const articleDetails = await getArticleDetails(board_id);

  function handleModifyClick(board_id: string) {
    // if (user.email !== authorEmail) {
    //   alert("작성자만 수정할 수 있습니다.");
    //   return;
    // }
    router.push(`/articles/modify/${board_id}`);
  }
  return (
    <div>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        sx={{
          borderBottom: `1px solid #ccc`,
          // mb: 2,
          pt: 3,
          pb: 2,
        }}
      >
        <Stack direction={"row"}>
          <Typography component="h2" variant="h6" sx={{ pr: 1 }}>
            제목 :
          </Typography>
          <Typography component="h2" variant="h5">
            {title}
          </Typography>
        </Stack>
        <Stack direction={"row"}>
          <Typography component="h2" variant="h6" sx={{ pr: 1 }}>
            작성자 :
          </Typography>
          <Typography component="h2" variant="h6">
            {authorEmail}
          </Typography>
        </Stack>
      </Stack>

      <Box
        ref={contentsRef}
        sx={{
          borderBottom: `1px solid #ccc`,
          // borderRadius: "4px",
          minHeight: "350px",
          pb: 2,
        }}
      />

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
        <Button component={Link} href={`http://localhost:3000/articles`}>
          리스트
        </Button>
        {/* {!user || 권한 체크 필요
            (user.email === authorEmail && (
              <Button onClick={handleModifyClick}>수정</Button>
            ))}
          {!user ||
            (user.email === authorEmail && (
              // || (user.auth_code === "T0")
              <Button onClick={handleDeleteClick}>삭제</Button>
            ))} */}
      </Stack>
    </div>
  );
}
