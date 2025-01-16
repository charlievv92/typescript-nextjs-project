import * as React from "react";
import axios from "axios";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";

import CustomizedDataGrid from "@components/CustomizedDataGrid";
import { Button, Stack } from "@mui/material";
import Link from "next/link";
// import { useAuth } from "../auth/AuthContext";

export default async function BoardList() {
  // TODO: 게시물 검색 기능 및 페이지네이션 관련 기능 추가(20241121 kwc)
  // TODO: 공지사항 기능 추가 -> 1페이지에 게시물 총 15개 + @ 게시일 최신순으로 보이게(20241202 kwc)
  // TODO: 공지 게시물로 전환 버튼 추가(20241202 kwc)
  // TODO: 공지 게시물은 공지 배열에 날짜 순으로 추가(20241202 kwc)
  //   const { setPageTitle } = useOutletContext();
  //   const [boardList, setBoardList] = useState([]);
  //   const { user, clientIp } = useAuth();

  //   useEffect(() => {
  //     setPageTitle("Board List");
  //   }, [setPageTitle]);

  const getBoardList = async () => {
    const response = await axios.get("http://localhost:8000/api/board/posts"); // 2) 게시글 목록 데이터에 할당
    // setBoardList(response.data.data); // 3) boardList 변수에 할당
    console.log(response.data);
    return response.data.data;
  };

  const boardList = await getBoardList();
  //   useEffect(() => {
  //     getBoardList(); // 1) 게시글 목록 조회 함수 호출
  //   }, []);

  // useEffect(() => {
  //   console.log(boardList); // 상태가 변경될 때마다 로그 출력
  // }, [boardList]);

  return (
    <>
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
      <Grid size={{ xs: 12, sm: 12 }}>
        <CustomizedDataGrid rows={boardList} />
      </Grid>
    </>
  );
}
