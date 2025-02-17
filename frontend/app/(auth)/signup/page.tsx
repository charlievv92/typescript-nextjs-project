import * as React from "react";

import SignUpForm from "@/components/auth/signup/SignUpForm";

export default function SignUp(props: any) {
  // const [emailError, setEmailError] = React.useState(false);
  // const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  // const [passwordError, setPasswordError] = React.useState(false);
  // const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  // const [nameError, setNameError] = React.useState(false);
  // const [nameErrorMessage, setNameErrorMessage] = React.useState("");
  // const [phoneError, setPhoneError] = React.useState(false);
  // const [phoneErrorMessage, setPhoneErrorMessage] = React.useState("");
  // const [addr1Error, setAddr1Error] = React.useState(false);
  // const [addr1ErrorMessage, setAddr1ErrorMessage] = React.useState("");
  // const [addr2Error, setAddr2Error] = React.useState(false);
  // const [addr2ErrorMessage, setAddr2ErrorMessage] = React.useState("");
  // const [address, setAddress] = React.useState("");
  // const [addr1ReadOnly, setAddr1ReadOnly] = React.useState(false);

  // const { isOpen, openDialog, handleConfirm, handleCancel } = useDialog();
  // // const navigate = useNavigate();
  // const router = useRouter();

  // //다음지도 API불러오기
  // React.useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src =
  //     "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
  //   script.async = true;
  //   document.body.appendChild(script);

  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);

  // //주소검색
  // const handleAddressSearch = () => {
  //   new window.daum.Postcode({
  //     oncomplete: function (data) {
  //       setAddress(data.address);
  //       setAddr1ReadOnly(true);
  //     },
  //   }).open();
  // };

  // //각 항목 작성했는지 검증
  // const validateInputs = () => {
  //   const email = document.getElementById("email");
  //   const password = document.getElementById("password");
  //   const name = document.getElementById("name");
  //   const phone = document.getElementById("phone");
  //   const addr2 = document.getElementById("addr2");
  //   let isValid = true;

  //   if (!email?.value || !/\S+@\S+\.\S+/.test(email.value)) {
  //     setEmailError(true);
  //     setEmailErrorMessage("이메일 형식이 올바르지 않습니다.");
  //     isValid = false;
  //   } else {
  //     setEmailError(false);
  //     setEmailErrorMessage("");
  //   }

  //   if (!password.value || password.value.length < 6) {
  //     setPasswordError(true);
  //     setPasswordErrorMessage("비밀번호는 6자 이상으로 설정하세요");
  //     isValid = false;
  //   } else {
  //     setPasswordError(false);
  //     setPasswordErrorMessage("");
  //   }

  //   if (!name.value || name.length < 1) {
  //     setNameError(true);
  //     setNameErrorMessage("이름을 입력해주세요");
  //     isValid = false;
  //   } else {
  //     setNameError(false);
  //     setNameErrorMessage("");
  //   }

  //   if (!phone.value || phone.value.length < 1) {
  //     setPhoneError(true);
  //     setPhoneErrorMessage("전화번호를 입력해주세요");
  //     isValid = false;
  //   } else {
  //     setPhoneError(false);
  //     setPhoneErrorMessage("");
  //   }

  //   if (!address || address.length < 1) {
  //     setAddr1Error(true);
  //     setAddr1ErrorMessage("주소를 입력해주세요");
  //     isValid = false;
  //   } else {
  //     setAddr1Error(false);
  //     setAddr1ErrorMessage("");
  //   }

  //   if (!addr2.value || addr2.value.length < 1) {
  //     setAddr2Error(true);
  //     setAddr2ErrorMessage("상세주소를 입력해주세요");
  //     isValid = false;
  //   } else {
  //     setAddr2Error(false);
  //     setAddr2ErrorMessage("");
  //   }

  //   return isValid;
  // };

  // //이메일 중복체크 요청 보내기
  // const handleEmailCheck = async (email) => {
  //   try {
  //     const response = await axios.post(
  //       // authApi로 수정 예정(response의 형태 확인 필요)
  //       `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/emailDuplicated`,
  //       {
  //         email,
  //       }
  //     );

  //     if (response.ok) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   } catch (error) {
  //     console.error("Network error:", error);
  //     return false;
  //   }
  // };

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   if (
  //     emailError ||
  //     passwordError ||
  //     nameError ||
  //     phoneError ||
  //     addr1Error ||
  //     addr2Error
  //   ) {
  //     return;
  //   }

  //   const data = new FormData(event.currentTarget);

  //   //이메일 중복체크
  //   const isUniqueEmail = await handleEmailCheck(data.get("email"));

  //   if (isUniqueEmail) {
  //     //confirm창 응답 받기
  //     const confirm = await openDialog();

  //     if (confirm) {
  //       const email = data.get("email");
  //       const password = data.get("password");
  //       const name = data.get("name");
  //       const phone = data.get("phone");
  //       const addr1 = data.get("addr1");
  //       const addr2 = data.get("addr2");
  //       //회원가입 진행
  //       try {
  //         const response = await fetch(
  //           `${process.env.REACT_APP_SERVER_URL}/api/auth/signinUser`,
  //           {
  //             method: "POST",
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify({
  //               email,
  //               password,
  //               name,
  //               phone,
  //               addr1,
  //               addr2,
  //             }),
  //           }
  //         );

  //         if (response.ok) {
  //           alert("회원가입이 성공적으로 완료되었습니다.");
  //           router.push("/login");
  //         } else if (response.status === 401) {
  //           alert("회원가입에 실패했습니다. 이미 존재하는 이메일입니다.");
  //           setEmailError(true);
  //           setEmailErrorMessage("중복된 이메일입니다.");
  //         } else {
  //           // 기타 서버 오류 처리
  //           alert("회원가입에 실패했습니다. 잠시후 다시 시도해주세요.");
  //         }
  //       } catch (error) {
  //         console.error("Network error:", error);
  //         alert("네트워크 오류가 발생했습니다. 잠시후 다시 시도해주세요.");
  //       }
  //     }
  //   } else {
  //     setEmailError(true);
  //     setEmailErrorMessage("중복된 이메일 입니다.");
  //     return;
  //   }
  // };

  return (
    <>
      <SignUpForm />
    </>
  );
}
