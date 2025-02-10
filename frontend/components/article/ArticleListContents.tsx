import Grid from "@mui/material/Grid2";
import CustomizedDataGrid from "../CustomizedDataGrid";
import axios from "axios";
import { articleApi } from "@/apis/articles";

export default async function ArticleListContents() {
  const initialBoardList = await articleApi.getArticles();
  return (
    <Grid size={{ xs: 12, sm: 12 }}>
      <CustomizedDataGrid initialRows={initialBoardList} />
    </Grid>
  );
}
