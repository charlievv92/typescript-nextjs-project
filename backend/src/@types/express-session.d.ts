import { Session } from "express-session";
import { User } from './user'; // 사용자의 User 타입을 임포트


declare module 'express-session' {
  interface SessionData {
    passport?: {
      user: User; // passport 속성에 user를 저장하는 구조
    };
  }
}