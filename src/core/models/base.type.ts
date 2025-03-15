export interface BaseResponse<T> {
  meta: {
    code: number;
    message?: string;
  };
  data: T;
}
