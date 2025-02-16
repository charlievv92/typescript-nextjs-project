import * as React from "react";
import Grid from "@mui/material/Grid2";
import ArticleWrite from "@/components/article/ArticleWrite";

export default function ArticleWritePage() {
  // const { setPageTitle } = useOutletContext();
  // const location = useLocation();
  // const { board_id } = useParams();
  // const [title, setTitle] = useState("");
  // const [contents, setContents] = useState("");
  // const [authorEmail, setAuthorEmail] = useState("");
  // const [isEditMode, setIsEditMode] = useState(false);
  // const { isLoggedIn, user, clientIp } = useAuth();

  // useEffect(() => { 테스트 필요
  //   if (!isLoggedIn) {
  //     alert("로그인이 필요합니다.");
  //     navigate("/login");
  //   }

  //   if (isEditMode && email !== authorEmail) {
  //     alert("작성자만 수정할 수 있습니다.");
  //     navigate(`/articles/${board_id}`);
  //   }
  // }, [isLoggedIn, isEditMode, email, authorEmail, navigate, board_id]);

  return (
    <Grid size={{ xs: 12, sm: 12 }}>
      <ArticleWrite />
    </Grid>
  );
}
