import axios from "axios";

import ArticleDetailsHeader from "./ArticleDetailsHeader";
import ArticleDetailsContents from "./ArticleDetailsContents";

import ArticleDetailsFooter from "./ArticleDetailsFooter";
import Grid from "@mui/material/Grid2";
import ArticleCommentWrite from "./ArticleCommentWrite";

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

export default async function ArticleDetails({
  board_id,
}: {
  board_id: string;
}) {
  const articleDetails = await getArticleDetails(board_id);

  return (
    <>
      <ArticleDetailsHeader
        title={articleDetails.title}
        authorEmail={articleDetails.authorEmail}
      />

      <ArticleDetailsContents contents={articleDetails.contents} />

      <ArticleCommentWrite board_id={board_id} />

      <ArticleDetailsFooter board_id={board_id} />
    </>
  );
}
