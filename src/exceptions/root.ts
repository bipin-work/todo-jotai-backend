class HttpException extends Error {
  message: string;
  errorCode: ErrorCode;
  statusCode: number;
  errors: any;

  constructor(
    message: string,
    errorCode: ErrorCode,
    statusCode: number,
    errors: any
  ) {
    super(message);
    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export default HttpException;

export enum ErrorCode {
  USER_NOT_FOUND = 1001,
  USER_ALREADY_EXISTS = 1002,
  USERNAME_TAKEN = 1003,
  INCORRECT_PASSWORD = 1005,

  TASK_NOT_FOUND = 2001,
  TASK_ALREADY_EXISTS = 2002,

  UNPROCESSABLE_ENTITY = 3001,

  INTERNAL_EXCEPTION = 4001,
}
