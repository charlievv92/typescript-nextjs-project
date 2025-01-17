// HTTP 상태 코드
export const StatusCode = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
} as const;

export type StatusCodeType = (typeof StatusCode)[keyof typeof StatusCode];

// 기본 응답 인터페이스
export interface IApiResponse<T> {
  readonly code: StatusCodeType;
  readonly data: T;
  readonly message: string;
}

// 페이지네이션 메타 정보
export interface IPaginationMeta {
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly hasNext: boolean;
}

// 페이지네이션 응답
export interface IPaginatedResponse<T> extends IApiResponse<T[]> {
  readonly meta: IPaginationMeta;
}

export namespace Entity {
  // 사용자 관련 타입
  export interface IUser {
    readonly email: string;
    readonly password: string;
    readonly name: string;
    readonly tel_number: string;
    readonly address: string;
    readonly address_detail: string;
    readonly date_of_joining: Date;
    readonly auth_code: string;
    readonly is_deleted: boolean;
  }

  // 게시글 관련 타입
  export interface IPost {
    readonly board_id: number;
    readonly title: string;
    readonly contents: string;
    readonly views: number;
    readonly weather: string;
    readonly is_deleted: boolean;
    readonly publish_date: Date;
    readonly email: string;
    readonly update_date: Date;
    readonly ip_location: string;
    readonly original_post: number;
    readonly is_notice: boolean;
  }

  // 게시글 댓글 관련 타입
  export interface IComment {
    readonly comment_id: number;
    readonly board_id: number;
    readonly comment: string;
    readonly publish_date: Date;
    readonly update_date: Date;
    readonly email: string;
    readonly ip_location: string;
    readonly is_deleted: boolean;
  }

  // 계정 권한 관련 타입
  export interface IAuth {
    readonly auth_code: string;
    readonly auth_name: string;
  }

  // 첨부파일 관련 타입
  export interface IFile {
    readonly file_id: number;
    readonly board_id: number;
    readonly file_name: string;
    readonly file_path: string;
    readonly file_type: string;
    readonly is_deleted: boolean;
  }

  // 권한별 라우팅 경로 관련 타입
  export interface IRoute {
    readonly route_id: number;
    readonly auth_code: string;
    readonly route_name: string;
    readonly is_deleted: boolean;
  }

  // 일정 관리 관련 타입
  export interface ITodo {
    readonly todo_id: number;
    readonly todo_title: string;
    readonly todo_contents: string;
    readonly todo_date: Date;
    readonly email: string;
    readonly is_deleted: boolean;
  }
}
// API 요청/응답 타입 네임스페이스
export namespace DTO {
  export namespace Auth {
    export interface SignUpRequest {
      readonly email: string;
      readonly password: string;
      readonly name: string;
      readonly tel_number: string;
      readonly;
    }

    export interface LoginRequest {
      email: string;
      password: string;
    }

    export interface LoginResponse {
      user: {
        email: string;
        name: string;
        tel_number: string;

        token: string;
      };
    }

    export namespace Post {
      export interface CreateRequest {
        title: string;
        content: string;
      }
    }
    // export type CreateResponse = IPost;
    // export type GetPostResponse = IPost;
    // export type GetPostsResponse = IPaginatedResponse<IPost>;
  }
}
