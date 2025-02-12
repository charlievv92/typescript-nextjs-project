import Grid from "@mui/material/Grid2";
import CustomizedDataGrid from "../CustomizedDataGrid";

export default async function ArticleListContents() {
  // const initialBoardList = await articleApi.getArticles();
  return (
    <Grid size={{ xs: 12, sm: 12 }}>
      <CustomizedDataGrid />
    </Grid>
  );
}
