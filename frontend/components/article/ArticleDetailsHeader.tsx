import { Stack, Typography } from "@mui/material";

export default function ArticleDetailsHeader({
  title,
  authorEmail,
}: {
  title: string;
  authorEmail: string;
}) {
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      sx={{
        borderBottom: `1px solid #ccc`,
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
  );
}
