"use client";

import { Box } from "@mui/material";

export default function ArticleDetailsContents({
  contents,
}: {
  contents: string;
}) {
  return (
    <Box
      // ref={contentsRef}
      dangerouslySetInnerHTML={{ __html: contents }}
      sx={{
        borderBottom: `1px solid #ccc`,
        // borderRadius: "4px",
        minHeight: "350px",
        pb: 2,
      }}
    />
  );
}
