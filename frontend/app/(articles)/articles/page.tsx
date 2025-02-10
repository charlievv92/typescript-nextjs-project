import * as React from "react";
// import Box from "@mui/material/Box";

// import Typography from "@mui/material/Typography";

import ArticleListHeader from "@/components/article/ArticleListHeader";
import ArticleListContents from "@/components/article/ArticleListContents";
// import { useAuth } from "../auth/AuthContext";
export const dynamic = "force-dynamic"; // 모든 요청마다 새로 렌더링(트래픽이 많은 경우 캐싱 전략을 고려할 필요가 있음)

export default async function ArticleListPage() {
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

  return (
    <>
      <ArticleListHeader />
      <ArticleListContents />
    </>
  );
}
