import { ISessionUser } from '@src/models/passport-types'

//세션에 user전체가 아닌 email만 저장하기 위해서 Express의 User인터페이스 정의
declare global {
  namespace Express {
    export interface User extends ISessionUser{}
  }
}