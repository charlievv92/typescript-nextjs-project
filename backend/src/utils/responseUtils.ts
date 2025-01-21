interface ResponseObject<T> {
  code: number;
  data: T;
  message: string;
}

/**
 * response 객체 생성 함수
 * @param code - 응답 코드
 * @param data - 응답 데이터
 * @param message - 응답 메시지
 * @returns 응답 객체. 프론트에서 const {code, data, message} = response.data; 형태로 사용하면 됨
 */
const createResponse = <T>(code: number, data: T, message: string): ResponseObject<T> => {
  return {
    code,
    data,
    message,
  };
};

/**
 * 성공 응답 생성 함수
 * @param data - 응답 데이터
 * @param message - 응답 메시지
 * @returns 성공 응답 객체
 */
const successResponse = <T>(data: T, message = "Success"): ResponseObject<T> => {
  return createResponse(200, data, message);
};

/**
 * 클라이언트 오류 응답 생성 함수
 * @param message - 응답 메시지
 * @param data - 응답 데이터
 * @returns 클라이언트 오류 응답 객체
 */
const clientErrorResponse = <T = {}>(message = "Bad request", data: T = {} as T): ResponseObject<T> => {
  return createResponse(400, data, message);
};

/**
 * 데이터 중복 오류 응답 생성 함수
 * @param message - 응답 메시지
 * @param data - 응답 데이터
 * @returns 클라이언트 오류 응답 객체
 */
const dataAlreadyExistsErrorResponse = <T = {}>(
  message = "Data already exists",
  data: T = {} as T
): ResponseObject<T> => {
  return createResponse(401, data, message);
};

/**
 * 데이터 미발견 오류 응답 생성 함수
 * @param message - 응답 메시지
 * @param data - 응답 데이터
 * @returns 클라이언트 오류 응답 객체
 */
const dataNotFoundErrorResponse = <T = {}>(message = "Data not found", data: T = {} as T): ResponseObject<T> => {
  return createResponse(404, data, message);
};

/**
 * 서버 오류 응답 생성 함수
 * @param message - 응답 메시지
 * @param data - 응답 데이터
 * @returns 서버 오류 응답 객체
 */
const serverErrorResponse = <T = {}>(message = "Server error", data: T = {} as T): ResponseObject<T> => {
  return createResponse(500, data, message);
};

export {
  createResponse,
  successResponse,
  clientErrorResponse,
  dataAlreadyExistsErrorResponse,
  dataNotFoundErrorResponse,
  serverErrorResponse,
};