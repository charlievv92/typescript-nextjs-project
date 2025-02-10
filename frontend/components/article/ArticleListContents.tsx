import Grid from "@mui/material/Grid2";
import CustomizedDataGrid from "../CustomizedDataGrid";
import axios from "axios";

export default async function ArticleListContents() {
  const getBoardList = async () => {
    const response = await axios.get("http://localhost:8000/api/board/posts"); // 2) 게시글 목록 데이터에 할당
    // setBoardList(response.data.data); // 3) boardList 변수에 할당
    console.log(response.data);
    return response.data.data;
  };

  const boardList = await getBoardList();
  return (
    <Grid size={{ xs: 12, sm: 12 }}>
      <CustomizedDataGrid rows={boardList} />
    </Grid>
  );
}
