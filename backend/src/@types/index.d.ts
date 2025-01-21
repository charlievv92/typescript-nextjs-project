export interface IUser {
  email: string;
}

declare global {
  namespace Express {
    export interface User extends IUser {}
  }
}
