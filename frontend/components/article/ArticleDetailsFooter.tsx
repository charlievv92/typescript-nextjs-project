"use client";

import { Button, Stack } from "@mui/material";
import Link from "next/link";
import ConfirmDialog from "../ConfirmDialog";
import { useDialog } from "@/hooks/useDialog";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ArticleDetailsFooter({
  board_id,
}: {
  board_id: string;
}) {
  const { isOpen, openDialog, handleConfirm, handleCancel } = useDialog();
  const router = useRouter();
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  function handleModifyClick() {
    // if (user.email !== authorEmail) {
    //   alert("작성자만 수정할 수 있습니다.");
    //   return;
    // }
    router.push(`/articles/modify/${board_id}`);
  }

  async function handleDeleteClick() {
    const confirm = await openDialog();

    if (confirm) {
      const response = await axios.delete(`${serverUrl}/api/board/posts`, {
        data: { board_ids: [board_id] },
      });
      console.log("Post deleted!!! ", response.data);
      alert(response.data.message);
      router.push("/articles");
    }
  }
  return (
    <Stack
      direction="row"
      justifyContent="flex-end"
      sx={{
        width: "100%",
        pt: 2,
        pb: 2,
        borderBottom: `1px solid #ccc`,
      }}
      spacing={2}
      // alignItems="center"
    >
      <Button component={Link} href={`http://localhost:3000/articles`}>
        리스트
      </Button>
      <Button onClick={handleModifyClick}>수정</Button>
      <Button onClick={handleDeleteClick}>삭제</Button>
      {/* {!user || 권한 체크 필요
            (user.email === authorEmail && (
              <Button onClick={handleModifyClick}>수정</Button>
            ))}
          {!user ||
            (user.email === authorEmail && (
              // || (user.auth_code === "T0")
              <Button onClick={handleDeleteClick}>삭제</Button>
            ))} */}
      <ConfirmDialog
        open={isOpen}
        title="해당 게시물을 삭제하시겠어요?"
        confirmText="삭제"
        cancelText="취소"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </Stack>
  );
}
