export interface AuthDataDto<TData = any> {
  user: TData;
  message?: string;
  token: string;
}
