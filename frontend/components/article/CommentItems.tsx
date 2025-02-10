"use client";

import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { Box, CircularProgress, IconButton } from "@mui/material";
import { GridDeleteIcon } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchComments, setInitialComments } from "@/stores/commentSlice";

// 인터페이스 정의
interface ICommentItem {
  comment_id: number;
  email: string;
  comment: string;
  ip_location: string;
  publish_date: string;
  is_deleted: number;
}

interface IUser {
  email: string;
}

interface IAlignItemsListProps {
  items: ICommentItem[];
  user?: IUser | null; // 테스트를 위해 옵셔널로 지정
}

export default function CommentItems({ board_id }: { board_id: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status, message } = useSelector(
    (state: RootState) => state.comments
  );

  // const filteredItems = items.filter((item) => item.is_deleted === 0);

  React.useEffect(() => {
    dispatch(fetchComments(board_id));
  }, [dispatch, board_id]);

  if (status === "loading") {
    return <CircularProgress />;
  }

  if (status === "failed") {
    return <div>Error: {message}</div>;
  }

  console.log("comments : ", items);
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 400,
        bgcolor: "background.paper",
        height: "90%",
      }}
    >
      {/* {items?.length === 0 && (
        <ListItem
          alignItems="center"
          sx={{
            mb: 2,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              textAlign: "center",
            }}
          >
            <Typography
              component="span"
              variant="body2"
              sx={{
                color: "text.primary",
                display: "inline",
              }}
            >
              댓글이 없습니다.
            </Typography>
          </Box>
        </ListItem>
      )} */}
      {items?.length > 0 ? (
        items.map((item) => (
          <React.Fragment key={item.comment_id}>
            <ListItem
              alignItems="flex-start"
              sx={{
                bgcolor: "white",
                mt: 2,
                mb: 2,
                borderRadius: 1,
                boxShadow: 1,
              }}
              // secondaryAction={ Icon을 불러올 때 type 에러가 발생
              //   // user &&
              //   // user.email === item.email && (
              //   <Stack flexDirection="column">
              //     <IconButton
              //       edge="end"
              //       aria-label="modify"
              //       onClick={() => {
              //         alert(`${item.comment_id} is clicked`);
              //       }}
              //     >
              //       <EditIcon />
              //     </IconButton>
              //     <IconButton
              //       edge="end"
              //       aria-label="delete"
              //       onClick={() => {
              //         alert(`${item.comment_id} is clicked`);
              //       }}
              //     >
              //       <GridDeleteIcon />
              //     </IconButton>
              //   </Stack>
              //   // )
              // }
            >
              <ListItemText
                secondary={
                  <React.Fragment>
                    {/* <Stack stack을 사용하면 하이드레이션 에러가 발생하여 span으로 변경
                      flexDirection="column"
                      sx={{ width: "90%", minHeight: "70px" }}
                    >
                      <Stack
                        flexDirection="row"
                        justifyContent="space-between"
                        sx={{ width: "100%" }}
                      > */}
                    <span
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "90%",
                        minHeight: "70px",
                      }}
                    >
                      <span
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                      >
                        <Typography
                          component="span"
                          variant="body1"
                          sx={{ color: "text.primary" }}
                        >
                          {item.email}
                        </Typography>
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{ color: "GrayText" }}
                        >
                          {item.ip_location}
                        </Typography>
                        {/* </Stack> */}
                      </span>
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: "GrayText", display: "block" }}
                      >
                        {format(
                          new Date(item.publish_date),
                          "yyyy-MM-dd HH:mm:ss"
                        )}
                      </Typography>
                      <Typography
                        component="span"
                        variant="body1"
                        sx={{ color: "text.primary", display: "block" }}
                      >
                        {item.comment}
                      </Typography>
                      {/* </Stack> */}
                    </span>
                  </React.Fragment>
                }
              />
            </ListItem>
          </React.Fragment>
        ))
      ) : (
        <ListItem
          alignItems="center"
          sx={{
            mb: 2,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              textAlign: "center",
            }}
          >
            <Typography
              component="span"
              variant="body2"
              sx={{
                color: "text.primary",
                display: "inline",
              }}
            >
              댓글이 없습니다.
            </Typography>
          </Box>
        </ListItem>
      )}
    </List>
  );
}
