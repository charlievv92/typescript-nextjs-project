"use client";

import * as React from "react";
import {
  Box,
  Button,
  Card,
  Divider,
  FormLabel,
  Link,
  Typography,
} from "@mui/material";
import { SitemarkIcon } from "./CustomIcons";
import ConfirmDialog from "@/components/ConfirmDialog";
import { useDialog } from "@/hooks/useDialog";
import CustomizedTextField from "@/components/CustomizedTextField";
import { useForm } from "react-hook-form";

export default function SignUpCard() {
  const { isOpen, openDialog, handleConfirm, handleCancel } = useDialog();
  const [address, setAddress] = React.useState("");
  const [addr1ReadOnly, setAddr1ReadOnly] = React.useState(false);

  const { control, handleSubmit } = useForm<ArticleFormData>();

  //주소검색
  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        setAddress(data.address);
        setAddr1ReadOnly(true);
      },
    }).open();
  };

  //다음지도 API불러오기
  React.useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <Card
      variant="outlined"
      sx={{
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          display: "none", // 스크롤바 숨기기
        },
        "-ms-overflow-style": "none", // IE 및 Edge에서 스크롤바 숨기기
        "scrollbar-width": "none", // Firefox에서 스크롤바 숨기기
      }}
    >
      <SitemarkIcon />
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
      >
        회원가입
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <form>
          <FormLabel htmlFor="email">이메일</FormLabel>
          <CustomizedTextField
            name="email"
            control={control}
            required
            fullWidth
            id="email"
            placeholder="your@email.com"
            variant="outlined"
            error={emailError}
            helperText={emailErrorMessage}
            color={passwordError ? "error" : "primary"}
          />

          <FormLabel htmlFor="password">비밀번호</FormLabel>
          <TextField
            required
            fullWidth
            name="password"
            placeholder="최소6자이상 설정해주세요"
            type="password"
            id="password"
            variant="outlined"
            error={passwordError}
            helperText={passwordErrorMessage}
            color={passwordError ? "error" : "primary"}
          />

          <FormLabel htmlFor="name">이름</FormLabel>
          <TextField
            name="name"
            required
            fullWidth
            id="name"
            placeholder="김철수"
            error={nameError}
            helperText={nameErrorMessage}
            color={nameError ? "error" : "primary"}
          />

          <FormLabel htmlFor="phone">전화번호</FormLabel>
          <TextField
            name="phone"
            required
            fullWidth
            id="phone"
            placeholder="010-1234-5678"
            error={phoneError}
            helperText={phoneErrorMessage}
            color={phoneError ? "error" : "primary"}
          />

          <FormLabel htmlFor="addr1">주소</FormLabel>
          <TextField
            name="addr1"
            required
            fullWidth
            id="addr1"
            placeholder="주소검색하기"
            value={address}
            slotProps={{
              input: { readOnly: addr1ReadOnly },
            }}
            error={addr1Error}
            helperText={addr1ErrorMessage}
            color={addr1Error ? "error" : "primary"}
            onClick={handleAddressSearch}
          />

          <TextField
            name="addr2"
            required
            fullWidth
            id="addr2"
            placeholder="상세주소"
            error={addr2Error}
            helperText={addr2ErrorMessage}
            color={addr2Error ? "error" : "primary"}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={validateInputs}
          >
            회원가입
          </Button>
        </form>
        <ConfirmDialog
          open={isOpen}
          title="입력하신 내용으로 가입하시겠어요?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
        <Typography sx={{ textAlign: "center" }}>
          이미 계정이 있으신가요?{" "}
          <span>
            <Link
              component={RouterLink}
              to="/login"
              variant="body2"
              sx={{ alignSelf: "center" }}
            >
              로그인
            </Link>
          </span>
        </Typography>
      </Box>
      <Divider>
        <Typography sx={{ color: "text.secondary" }}>or</Typography>
      </Divider>

      {/* <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert("Sign up with Google")}
              startIcon={<GoogleIcon />}
            >
              구글아이디로 회원가입
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert("Sign up with Facebook")}
              startIcon={<FacebookIcon />}
            >
              페이스북으로 회원가입
            </Button>
          </Box> */}
    </Card>
  );
}
