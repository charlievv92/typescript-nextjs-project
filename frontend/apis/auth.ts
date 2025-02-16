import axios from "axios";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

interface ISignUpData {
  email: string;
  password: string;
  user_name: string;
  tel_number: string;
  address: string;
  address_detail: string;
  auth_code: string;
  is_deleted: boolean;
}

interface ILoginResponse {
  code: number;
  data: {
    user: {
      email: string;
      name: string;
      // 기타 필요한 사용자 정보 타입 추가
    };
  };
  message?: string;
}

export const authApi = {
  // 이메일 중복 체크
  checkEmailDuplicated: async (email: string) => {
    try {
      const response = await axios.post(
        `${serverUrl}/api/auth/emailDuplicated`,
        { email }
      );
      return response.data;
    } catch (error) {
      console.error("이메일 중복 체크 실패:", error);
      throw error;
    }
  },

  // 로그인
  login: async (email: string, password: string) => {
    try {
      const response = await axios.post<ILoginResponse>(
        `${serverUrl}/api/auth/login`,
        { email, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("로그인 실패:", error);
      throw error;
    }
  },

  // 회원가입
  signUp: async (signUpData: ISignUpData) => {
    try {
      const response = await axios.post(
        `${serverUrl}/api/auth/signinUser`,
        signUpData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("회원가입 실패:", error);
      throw error;
    }
  },

  // 로그아웃
  logout: async () => {
    try {
      const response = await axios.post(
        `${serverUrl}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("로그아웃 실패:", error);
      throw error;
    }
  },
};
