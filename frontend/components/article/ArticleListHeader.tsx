import { Button, Stack } from "@mui/material";
import Link from "next/link";

export default function ArticleListHeader() {
  return (
    <Stack
      direction="column"
      sx={{
        width: "100%",
        mt: 4,
        justifyContent: "center",
        alignItems: "flex-end",
      }}
      spacing={2}
    >
      <Button component={Link} href={"/articles/write"}>
        게시물 작성
      </Button>
      {/* {user && user.auth_code === "A0" && <Button onClick={}>삭제</Button>} */}
      {/* <Button disabled>Disabled</Button> */}
    </Stack>
  );
}
