"use client";

import * as React from "react";
import ColorModeSelect from "@/components/shared-theme/ColorModeSelect";

import { Stack, styled } from "@mui/material";
import {
  Box,
  Button,
  Divider,
  FormLabel,
  Link,
  Typography,
} from "@mui/material";
import MuiCard from "@mui/material/Card";
import { SitemarkIcon } from "./CustomIcons";
import ConfirmDialog from "@/components/ConfirmDialog";
import { useDialog } from "@/hooks/useDialog";
import CustomizedTextField from "@/components/CustomizedTextField";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

interface ISignUpFormData {
  email: string;
  password: string;
  name: string;
  phone: string;
  addr1: string;
  addr2: string;
}

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default function SignUpForm() {
  const { isOpen, openDialog, handleConfirm, handleCancel } = useDialog();
  const [address, setAddress] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [addr1ReadOnly, setAddr1ReadOnly] = React.useState(false);

  const router = useRouter();

  const { control, handleSubmit, setValue } = useForm<ISignUpFormData>({
    defaultValues: {
      email: "",
      password: "",
      name: "",
      phone: "",
      addr1: "",
      addr2: "",
    },
  });

  //이메일 중복체크 요청 보내기
  const handleEmailCheck = async (email) => {
    try {
      const response = await axios.post(
        // authApi로 수정 예정(response의 형태 확인 필요)
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/emailDuplicated`,
        {
          email,
        }
      );

      if (response.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Network error:", error);
      return false;
    }
  };

  //주소검색
  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        setAddress(data.address);
        setValue("addr1", data.address);
        setAddr1ReadOnly(true);
      },
    }).open();
  };

  const onSubmit = async (data: ISignUpFormData) => {
    const confirm = await openDialog();
    if (confirm) {
      // 회원가입 로직

      //이메일 중복체크
      const isUniqueEmail = await handleEmailCheck(data.email);

      if (isUniqueEmail) {
        //confirm창 응답 받기
        const confirm = await openDialog();

        if (confirm) {
          const email = data.email;
          const password = data.password;
          const name = data.name;
          const phone = data.phone;
          const addr1 = data.addr1;
          const addr2 = data.addr2;
          //회원가입 진행
          try {
            const response = await axios.post(
              `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/signinUser`,
              {
                email,
                password,
                name,
                phone,
                addr1,
                addr2,
              }
            );

            if (response.ok) {
              alert("회원가입이 성공적으로 완료되었습니다.");
              router.push("/login");
            } else if (response.status === 401) {
              alert("회원가입에 실패했습니다. 이미 존재하는 이메일입니다.");
              setEmailError(true);
              setEmailErrorMessage("중복된 이메일입니다.");
            } else {
              // 기타 서버 오류 처리
              alert("회원가입에 실패했습니다. 잠시후 다시 시도해주세요.");
            }
          } catch (error) {
            console.error("Network error:", error);
            alert("네트워크 오류가 발생했습니다. 잠시후 다시 시도해주세요.");
          }
        }
      } else {
        setEmailError(true);
        setEmailErrorMessage("중복된 이메일 입니다.");
        return;
      }
      console.log(data);
    }
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
    <>
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
      <SignUpContainer direction="column" justifyContent="space-between">
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
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormLabel htmlFor="email">이메일</FormLabel>
            <CustomizedTextField
              name="email"
              control={control}
              rules={{
                required: "이메일을 입력해주세요",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "이메일 형식이 올바르지 않습니다",
                },
              }}
              textFieldProps={{
                id: "email",
                placeholder: "your@email.com",
                fullWidth: true,
                error: emailError,
                helperText: emailErrorMessage,
              }}
            />

            <FormLabel htmlFor="password">비밀번호</FormLabel>
            <CustomizedTextField
              name="password"
              control={control}
              rules={{
                required: "비밀번호를 입력해주세요",
                minLength: {
                  value: 6,
                  message: "비밀번호는 6자 이상이어야 합니다",
                },
              }}
              textFieldProps={{
                id: "password",
                type: "password",
                placeholder: "최소6자이상 설정해주세요",
                fullWidth: true,
              }}
            />

            <FormLabel htmlFor="name">이름</FormLabel>
            <CustomizedTextField
              name="name"
              control={control}
              rules={{
                required: "이름을 입력해주세요",
              }}
              textFieldProps={{
                id: "name",
                placeholder: "김철수",
                fullWidth: true,
              }}
            />

            <FormLabel htmlFor="phone">전화번호</FormLabel>
            <CustomizedTextField
              name="phone"
              control={control}
              rules={{
                required: "전화번호를 입력해주세요",
                pattern: {
                  value: /^\d{2,3}-\d{3,4}-\d{4}$/,
                  message: "올바른 전화번호 형식이 아닙니다",
                },
              }}
              textFieldProps={{
                id: "phone",
                placeholder: "010-1234-5678",
                fullWidth: true,
              }}
            />

            <FormLabel htmlFor="addr1">주소</FormLabel>
            <CustomizedTextField
              name="addr1"
              control={control}
              rules={{
                required: "주소를 입력해주세요",
              }}
              textFieldProps={{
                id: "addr1",
                placeholder: "주소검색하기",
                fullWidth: true,
                value: address,
                onClick: handleAddressSearch,
                InputProps: {
                  readOnly: addr1ReadOnly,
                },
              }}
            />

            <FormLabel htmlFor="addr2">상세주소</FormLabel>
            <CustomizedTextField
              name="addr2"
              control={control}
              rules={{
                required: "상세주소를 입력해주세요",
              }}
              textFieldProps={{
                id: "addr2",
                placeholder: "상세주소",
                fullWidth: true,
              }}
            />

            <Button type="submit" fullWidth variant="contained">
              회원가입
            </Button>
            <ConfirmDialog
              open={isOpen}
              title="입력하신 내용으로 가입하시겠어요?"
              onConfirm={handleConfirm}
              onCancel={handleCancel}
            />
            <Typography sx={{ textAlign: "center" }}>
              이미 계정이 있으신가요?{" "}
              <Link href="/login" variant="body2" sx={{ alignSelf: "center" }}>
                로그인
              </Link>
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
      </SignUpContainer>
    </>
  );
}
