type AxiosError = import("axios").AxiosError;

declare type ErrorResponse = AxiosError & {
  error: string;
  message: string;
  statusCode: number;
};
