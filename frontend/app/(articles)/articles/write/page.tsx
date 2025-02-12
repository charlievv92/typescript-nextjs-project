import * as React from "react";

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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await axios
  //       .get(`${process.env.REACT_APP_SERVER_URL}/api/board/posts/${board_id}`)
  //       .then((response) => {
  //         // data = response.data;
  //         console.log("data : ", response.data);
  //         setData(response.data.data[0]);
  //         //  setTitle(data.title);
  //         //  setContents(data.contents);
  //         //  setAuthorEmail(data.email);
  //         //  setIsEditMode(true);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching data!!! ", error);
  //         throw error;
  //       });
  //   };

  //   const setData = async (data) => {
  //     // const response = await fetchData();
  //     setTitle(data.title);
  //     setContents(data.contents);
  //     setAuthorEmail(data.email);
  //     setIsEditMode(true);
  //   };

  //   if (board_id !== undefined) {
  //     fetchData();
  //   }
  // }, [board_id]);

  // const handleContentsChange = (value) => {
  //   setContents(value);
  //   console.log("contents : ", contents);
  // };

  return <ArticleWrite />;
}
