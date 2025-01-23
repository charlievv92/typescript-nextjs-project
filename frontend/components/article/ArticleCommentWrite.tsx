"use client";
// import { Box, Button, TextField, Typography } from "@mui/material";

// 댓글 작성 컴포넌트 추후에 수정 필요
// export default function ArticleCommentWrite() {
//     const handleCommentSubmitClick = async () => {
//         // if (!user) {
//         //   alert("로그인 후 댓글을 작성할 수 있습니다.");
//         //   router.push("/login");
//         //   return;
//         // }
//         const response = await axios.post(`${serverUrl}/api/board/comments`, {
//           board_id: board_id,
//           writer: user.email,
//           comment: comment,
//           ip_location: clientIp,
//         });

//         console.log("comment : ", comment);
//         console.log("Post created!!! ", response.data);
//         getArticleComments();
//         setComment("");
//       };

//     return (
//     <>
//     <Box
//           sx={{
//             // mb: 2,
//             pt: 3,
//             pb: 2,
//           }}
//         >
//           <Typography component="h2" variant="h6" sx={{ pb: 2 }}>
//             댓글
//           </Typography>
//           <TextField
//             // minRows={20}
//             id="board-comment"
//             variant="standard"
//             sx={{
//               "& .MuiInputBase-root": {
//                 border: "1px",
//                 borderTopRightRadius: "none",
//                 borderTopLeftRadius: "none",
//                 boxShadow: "none",
//               },
//             }}
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//           />
//         </Box>

//         <Stack
//           direction="row"
//           justifyContent="flex-end"
//           sx={{
//             width: "100%",
//             pt: 2,
//             pb: 2,
//             borderBottom: `1px solid #ccc`,
//             // mt: 2,
//             // mb: 2,
//             // borderBottom: `1px solid #ccc`,
//             // padding: "10px",
//           }}
//           spacing={2}
//           // alignItems="center"
//         >
//           <Button onClick={handleCommentSubmitClick}>작성</Button>
//         </Stack>
//         </>
//   )
// }
